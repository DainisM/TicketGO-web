import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const TermsInfo = ({ formData, setFormData, errors, setErrors }) => {
	return (
		<>
			<Form.Group className="mb-5" controlId="terms">
				<p>
					We use your information to provide you with our services, which we
					personalise based on information we hold about you and how you
					interact with us. Please see our <a href="/">Privacy Policy</a> for
					full details. As a registered user of TicketGO, you are also subjected
					to the <a href="/">Terms of Use</a>.
				</p>
			</Form.Group>

			<Form.Group className="mb-5" controlId="checkTerms">
				<div className="checkDiv">
					<Form.Check
						type="checkbox"
						defaultChecked={formData.terms}
						onChange={(e) => {
							setFormData({ ...formData, terms: e.target.checked });
							setErrors({ ...errors, termsError: "" });
						}}
						isInvalid={errors.termsError}
						label={
							<span>
								I agree to all the above and{" "}
								<Link to={"/"}>Terms of purhase</Link>
							</span>
						}
					/>
				</div>
			</Form.Group>
		</>
	);
};

export default TermsInfo;
