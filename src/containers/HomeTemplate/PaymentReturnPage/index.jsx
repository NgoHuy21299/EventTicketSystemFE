import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actPaymentReturn } from "@/store/actions/ticketBooking";
import "./style.scss";
import checkLogo from "@/assets/images/check.png";
import cancelLogo from "@/assets/images/cancel.png";
import Loader from "@/components/Loader";

const handleBack = () => {
  window.location.href = "/";
};
const PaymentStatus = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.processPayment.data);
  const loading = useSelector((state) => state.processPayment.loading);

  useEffect(() => {
    dispatch(actPaymentReturn());
  }, [dispatch]);

  const renderLoader = () => {
    if (loading) return <Loader />;
  };
  return (
    <>
      {renderLoader()}
      {data && (
        <div className="payment-page">
          <div className="container">
            {data?.responseCode === "00" ? (
              <>
                <img src={checkLogo} alt="Success" className="success-image" />
                <div className="payment-success">
                  <h1>Thanh Toán Thành Công</h1>
                  <div className="transaction-info">
                    <h4>THÔNG TIN GIAO DỊCH</h4>
                    <p>
                      <strong>Hình thức thanh toán:</strong> {data?.bankCode}
                    </p>
                    <p>
                      <strong>Nội dung:</strong> thanh toán cho đơn hàng {data?.bookingId}
                    </p>
                    <p>
                      <strong>Số tiền thanh toán:</strong> {data?.amount} VND
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img src={cancelLogo} alt="Failed" className="success-image" />
                <div className="payment-fail">
                  <h1>Thanh Toán Thất Bại</h1>
                  <div className="transaction-info">
                    <h4>LỖI THANH TOÁN</h4>
                    <p>
                      <strong>Mã lỗi:</strong> {data?.responseCode}
                    </p>
                    <p>
                      <strong>Vui lòng thử lại hoặc liên hệ hỗ trợ.</strong>
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="button-container">
              <button onClick={handleBack} className="back-button">
                Quay lại
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentStatus;
