import { useEffect } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actPaymentReturn } from "@/store/actions/ticketBooking";
import "./style.scss";

const PaymentStatus = () => {
  const dispatch = useDispatch();

  const { paymentData, loading, error } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(actPaymentReturn());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="row justify-center">
        <div className="md:w-1/2">
          <div className={`message-box ${paymentData?.responseCode === "00" ? "_success" : "_failed"}`}>
            {/* {paymentData?.responseCode === "00" ? (
              <FaCheckCircle className="icon-success" />
            ) : (
              <FaTimesCircle className="icon-failed" />
            )} */}
            <h2>{paymentData?.responseCode === "00" ? "Your payment was successful" : "Your payment failed"}</h2>
            <p>{paymentData?.message}</p>
            <ul>
              <li>Booking ID: {paymentData?.bookingId}</li>
              <li>Transaction ID: {paymentData?.vnPayTranId}</li>
              <li>Amount: {paymentData?.amount}</li>
              <li>Bank Code: {paymentData?.bankCode}</li>
              <li>Pay Date: {paymentData?.payDate}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
