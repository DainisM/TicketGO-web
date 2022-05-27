import React, { useEffect, useState } from "react";
import { Form, ProgressBar, Spinner } from "react-bootstrap";

import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp";

import { isAnon } from "../../utils";

import UserInfo from "./UserInfo";
import AddressInfo from "./AddressInfo";
import TermsInfo from "./TermsInfo";

import "./styles.scss";
import { useNavigate } from "react-router-dom";

// Initial state for registration form
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

//Initial state for form errors
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
	//Accessing Realm App
	const app = useRealmApp();

	//Check when current user changed and if new user is not anonymous user then call for funtion to update user data
	useEffect(() => {
		!isAnon(app.currentUser) && updateUserData();
	}, [app.currentUser]);

	//State hooks
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState(INITIAL_ERRORS);
	const [loading, setLoading] = useState(false);

	//Get hook for navigating
	const history = useNavigate();

	//Array with titles for form steps
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

	//Method used to update user data
	const updateUserData = () => {
		//Initialize the db and collection in which we update user data
		const usersDB = app.currentUser
			.mongoClient("mongodb-atlas")
			.db("TicketGO")
			.collection("Users");

		//Update user data collection with this data
		usersDB
			//Update user where user._id is currently logged in user id
			.updateOne(
				{ _id: Realm.BSON.ObjectID(app.currentUser.id) },
				{
					$set: {
						first_name: formData.firstName,
						last_name: formData.lastName,
						mobile: formData.phone,
						zip_code: formData.post,
						city: formData.city,
						address: formData.address,
						country: formData.country,
					},
				},
				{ upsert: true }
			)
			//If success then set loading to false and redirect to homepage and also set back state to initial
			.then(() => {
				setLoading(false);
				history("/");
				setErrors(INITIAL_ERRORS);
				setFormData(INITIAL_STATE);
			})
			//Or of error show alert and set loading to false
			.catch((err) => {
				alert(err);
				setLoading(false);
			});
	};

	//method to handle user registration
	const handleUserRegister = async () => {
		//Set loading to try to show spinner
		setLoading(true);

		try {
			//If there is a logged user then log it out from realm
			await app.currentUser.logOut();

			//Create new user with email and password in realm app
			await app.emailPasswordAuth.registerUser(
				formData.email,
				formData.password
			);

			//Log in with created user account into app to get logged user data
			await app.logIn(
				Realm.Credentials.emailPassword(formData.email, formData.password)
			);
		} catch (error) {
			setLoading(false);
			throw new Error(error);
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
				handleUserRegister();
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

			{loading ? (
				<Spinner
					animation="border"
					variant="info"
					style={{ width: "4rem", height: "4rem" }}
				/>
			) : (
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
			)}
		</div>
	);
};

export default SignUp;
