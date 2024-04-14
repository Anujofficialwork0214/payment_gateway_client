import { useState } from "react";
import "./App.css";

function App() {
  const handelPayment = async (e) => {
    e.preventDefault();

    const amount = 500000;// in paisa
    const currency = "INR";
    const receiptId = "1234567890";

    const res = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await res.json();
    console.log(order);
    if (order) {
      var options = {
        key: "",
        amount: amount, // amount in the smallest currency unit (e.g., paise for INR)
        currency: currency,
        name: "OWR",
        description: "Purchase Description",
        image: "https://example.com/your_logo.png",
        order_id: order.id, // Replace with actual order ID
        handler: async function (response) {
          const body = { ...response };
          const validateResponse = await fetch(
            "http://localhost:5000/validate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          const validResponse = await validateResponse.json();
          console.log(validResponse);
        },
        prefill: {
          name: "Anuj",
          email: "anuj0214@gmail.com",
          contact: "8228048174",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      var rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(response.error.description);
      });
      rzp.open();
      e.preventDefault();
    }
  };

  return (
    <>
      <div>
        <h1 className="product">Razorpay payment gateway</h1>
        <button className="button" onClick={handelPayment}>
          Pay now
        </button>
      </div>
    </>
  );
}

export default App;
