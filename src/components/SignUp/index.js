import React, { useState } from "react";
import UserInfo from "./UserInfo";
import AddressInfo from "./AddressInfo";
import TermsInfo from "./TermsInfo";
import { Form, ProgressBar } from "react-bootstrap";

import "./styles.scss";

const INITIAL_STATE = {
	email: "",
	password: "",
	confirmPassword: "",
	firstName: "",
	lastName: "",
	phone: "",
	address: "",
	post: "",
	city: "",
	country: "",
	terms: false,
};

const INITIAL_ERRORS = {
	emailError: "",
	passwordError: "",
	confirmPasswordError: "",
	firstNameError: "",
	lastNameError: "",
	phoneError: "",
	addressError: "",
	postError: "",
	cityError: "",
	countryError: "",
	termsError: "",
};

const SignUp = () => {
	//State hooks
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState(INITIAL_ERRORS);

	//Array with titles for form
	const FormTitles = [
		"Personal Info",
		"Address & Phone Info",
		"Terms & Conditions",
	];

	//Method to check step state and display appropriate component
	const StepDisplay = () => {
		//If step state is 0 then return UserInfo component
		if (step === 0) {
			return (
				<UserInfo
					formData={formData}
					setFormData={setFormData}
					errors={errors}
					setErrors={setErrors}
				/>
			);
		}
		//If step state is 1 then return UserInfo component
		else if (step === 1) {
			return (
				<AddressInfo
					formData={formData}
					setFormData={setFormData}
					errors={errors}
					setErrors={setErrors}
				/>
			);
		}
		//If step state is other in our case 2 then return UserInfo component
		else {
			return (
				<TermsInfo
					formData={formData}
					setFormData={setFormData}
					errors={errors}
					setErrors={setErrors}
				/>
			);
		}
	};

	//Method to handle "next" button clicks
	const handleFormBtn = () => {
		//If current step is 0 when btn is clicked then invoke first step validation and if true then add 1 to step (go to next step)
		if (step === 0) {
			if (validateFirstStep()) {
				setStep((currStep) => currStep + 1);
			}
		}
		//If current step is 1 when btn is clicked then invoke second step validation and if true then add 1 to step (go to next step)
		else if (step === 1) {
			if (validateSecondStep()) {
				setStep((currStep) => currStep + 1);
			}
		}
		//Else in our situation when step is 2 when btn is clicked then invoke last step validation and if true then submit
		else {
			if (validateLastStep()) {
				alert("FORM SUBMITTED");
				console.log(formData);
			}
		}
	};

	//Method for validating first step
	const validateFirstStep = () => {
		let emailError = "";
		let passwordError = "";
		let confirmPasswordError = "";
		let firstNameError = "";
		let lastNameError = "";

		//If email doesnt match regex for email then add email error msg
		if (!formData.email.match(/\S+@\S+\.\S+/)) {
			emailError = "Valid email required";
		}

		//If password doesnt match regex for password then add password error msg
		if (
			!formData.password.match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
			)
		) {
			passwordError = "Valid password required";
		}

		//If password doesnt match confrimPassword then add confrimPassword error msg
		if (
			!formData.confirmPassword ||
			!formData.password.match(formData.confirmPassword)
		) {
			confirmPasswordError = "Password does not match";
		}

		//First name shoudn´t be empty if not then add error msg
		if (!formData.firstName) {
			firstNameError = "Valid first name required";
		}

		//Last name shoudn´t be empty if not then add error msg
		if (!formData.lastName) {
			lastNameError = "Valid last name required";
		}

		//If there is errors set them to state and return false
		if (
			emailError ||
			passwordError ||
			confirmPasswordError ||
			firstNameError ||
			lastNameError
		) {
			setErrors({
				emailError,
				passwordError,
				confirmPasswordError,
				firstNameError,
				lastNameError,
			});
			return false;
		}

		//Else return true
		return true;
	};

	//Method for validating second step
	const validateSecondStep = () => {
		let phoneError = "";
		let addressError = "";
		let postError = "";
		let cityError = "";
		let countryError = "";

		//If phone doesnt match regex for phone nr with country codes - +45 or 0045 then add error msg
		if (
			!formData.phone.match(
				/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}/
			)
		) {
			phoneError = "Valid phone number required";
		}

		//Address should be min 2 chars long, if not then add error msg
		if (formData.address.length < 2) {
			addressError = "Valid address required";
		}

		//Post should be min 3 chars long, if not then add error msg
		if (formData.post.length < 3) {
			postError = "Valid post number required";
		}

		//City should be min 2 chars long, if not then add error msg
		if (formData.city.length < 2) {
			cityError = "Valid city name required";
		}

		//Country should be min 2 chars long, if not then add error msg
		if (formData.country.length < 2) {
			countryError = "Valid country required";
		}

		//If there is errors set them to state and return false
		if (phoneError || addressError || postError || cityError || countryError) {
			setErrors({
				phoneError,
				addressError,
				postError,
				cityError,
				countryError,
			});
			return false;
		}

		//Else return true
		return true;
	};

	//Method for validating terms
	const validateLastStep = () => {
		let termsError = "";

		//Terms should be checked (true) if not then add term error message
		if (!formData.terms === true) {
			termsError = "Please read and agree to our Terms and Conditions of Use";
		}

		//If there is errors set them to state and return false
		if (termsError) {
			setErrors({
				termsError,
			});
			return false;
		}

		//Else return true
		return true;
	};

	return (
		<div className="registerWrap">
			<h1>Create a TicketGO Account</h1>
			<div className="progressBar">
				<ProgressBar max={3} min={0} now={step} />
				<p>Step {step + 1} of 3</p>
			</div>

			<div className="form-container">
				<Form.Group className="mb-3 form-header">
					<h2>{FormTitles[step]}</h2>
				</Form.Group>
				<Form.Group className="mb-5 form-body">{StepDisplay()}</Form.Group>
				<Form.Group className="mb-5 form-actions">
					<button
						disabled={step === 0}
						onClick={() => {
							setStep((currStep) => currStep - 1);
						}}
					>
						Previous
					</button>
					<button onClick={handleFormBtn}>
						{step === 2 ? "Register" : "Next"}
					</button>
				</Form.Group>
			</div>
		</div>
	);
};

export default SignUp;
