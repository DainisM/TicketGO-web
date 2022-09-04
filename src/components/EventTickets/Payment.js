import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm";
import { Spinner } from "react-bootstrap";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const Payment = ({ handleStep, tickets }) => {
	const [clientSecret, setClientSecret] = useState("");
	const [amount, setAmount] = useState(null);

	useEffect(() => {
		fetch("http://localhost:4000/payments/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: tickets,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.clientSecret);
				setAmount(data.amount);
			});
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="paymentWrap">
			{clientSecret ? (
				<>
					<p>Total amount to pay: {amount} DKK</p>
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				</>
			) : (
				<div className="loadingDiv">
					<Spinner
						animation="border"
						variant="info"
						style={{ width: "10rem", height: "10rem" }}
					/>
				</div>
			)}
		</div>
	);
};

export default Payment;
