import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal";
import * as signalR from "@microsoft/signalr";
import { useAuth } from "@/hooks";

// Redux actions
import { actCloseModal, actNotification } from "@/store/actions/ticketBooking";

const SignalRNotification = () => {
  const auth = useAuth();
  const modalProps = useSelector((rootReducer) => rootReducer.ticketBooking.modal);
  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user)?.email;

  const dispatch = useDispatch();

  // Use useCallback to prevent function recreation
  const startConnection = useCallback(() => {
    // Kiểm tra nếu không có userEmail thì return null
    if (!userEmail) {
      return null;
    }

    const baseURL = process.env.REACT_APP_BASE_URL;
    const signalRUrl = new URL(baseURL).origin;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(signalRUrl + "/notificationHub", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        // Kiểm tra lại một lần nữa trước khi invoke
        if (userEmail) {
          connection.invoke("RegisterUser", userEmail).catch((err) => {
            console.error("Error registering user: ", err);
          });
        }
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
      });

    connection.on("ReceiveMessage", (message, email) => {
      if (email === userEmail) {
        console.log("Notification received for user:", message);
        dispatch(actNotification(message));
        // Dọn dẹp connection trước khi logout
        connection.stop().then(() => {
          auth.logout();
        });
      }
    });

    connection.onclose((error) => {
      console.log("Connection closed:", error);
    });

    return connection;
  }, [userEmail, dispatch, auth]);

  useEffect(() => {
    let connection = null;
    
    if (userEmail) {
      connection = startConnection();
    }

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [startConnection, userEmail]);

  return <Modal actCloseModal={actCloseModal} modalProps={modalProps} />;
};

export default SignalRNotification;
