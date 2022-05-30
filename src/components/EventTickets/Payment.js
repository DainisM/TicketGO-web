import React from "react";

const Payment = ({ handleStep }) => {
	return (
		<div className="paymentWrap">
			<h1>Payment</h1>
			<div>
				<p>
					Here we would had a Stripe payment, if we had enough time to implement
					it. :)
				</p>
			</div>
			<div>
				<button onClick={() => handleStep()}>Back</button>
				<button>Pay</button>
			</div>
		</div>
	);
};

export default Payment;
