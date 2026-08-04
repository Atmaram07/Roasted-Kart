import { createContext, useContext, useMemo, useState } from "react";

const PaymentStatusContext = createContext(null);

export function PaymentStatusProvider({ children }) {
  const [status, setStatus] = useState({
    paymentState: "idle",
    orderId: "",
    paymentId: "",
    amount: 0,
    currency: "INR",
    message: "",
  });

  const value = useMemo(
    () => ({
      status,
      setStatus,
      clearStatus: () =>
        setStatus({
          paymentState: "idle",
          orderId: "",
          paymentId: "",
          amount: 0,
          currency: "INR",
          message: "",
        }),
    }),
    [status],
  );

  return <PaymentStatusContext.Provider value={value}>{children}</PaymentStatusContext.Provider>;
}

export function usePaymentStatus() {
  const context = useContext(PaymentStatusContext);
  if (!context) {
    throw new Error("usePaymentStatus must be used inside PaymentStatusProvider");
  }
  return context;
}
