import React, { useState } from "react";
import { Form, ProgressBar, Spinner } from "react-bootstrap";

import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp";

import UserInfo from "./UserInfo";
import AddressInfo from "./AddressInfo";
import TermsInfo from "./TermsInfo";

import "./styles.scss";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

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

const UpdateUserMutation = gql`
	mutation updateUser($userId: ObjectId!, $updates: String!) {
		updateOneUser(query: { _id: $userId }, set: { first_name: $updates }) {
			_id
			first_name
		}
	}
`;

// updateOneUser(
//     query: {_id: "6285feedc2826f63cc56d52b"}
//     set: {first_name: "Tester", last_name: "leTest"}
//   ) {
//     _id
//     first_name
//     last_name
//   }

const SignUp = () => {
	//Accessing Realm App
	const app = useRealmApp();
	const client = useRealmApp();

	const [updateUserInfo] = useMutation(UpdateUserMutation);

	//State hooks
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState(INITIAL_ERRORS);
	const [loading, setLoading] = useState(false);

	//Get hook for navigating
	const history = useNavigate();

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

	const handleUserRegister = async () => {
		const usersDB = app.currentUser
			.mongoClient("mongodb-atlas")
			.db("TicketGO")
			.collection("Users");

		setLoading(true);

		try {
			// await app.currentUser.logOut();

			// await app.emailPasswordAuth.registerUser(
			// 	formData.email,
			// 	formData.password
			// );

			// await app.logIn(
			// 	Realm.Credentials.emailPassword(formData.email, formData.password)
			// );

			console.log(app.currentUser.id);

			usersDB
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
				.then(() => {
					setLoading(true);
					// history("/");
				})
				.catch((err) => {
					alert(err);
					setLoading(false);
				});
		} catch (error) {
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
			console.log(app.currentUser.id);

			//handleUserRegister();

			updateUserInfo({
				variables: {
					userId: Realm.BSON.ObjectID(app.currentUser.id),
					updates: {
						first_name: JSON.stringify(formData.firstName),
						last_name: JSON.stringify(formData.lastName),
						mobile: JSON.stringify(formData.phone),
						zip_code: JSON.stringify(formData.post),
						city: JSON.stringify(formData.city),
						address: JSON.stringify(formData.address),
						country: JSON.stringify(formData.country),
					},
				},
			});

			if (validateLastStep()) {
				// handleUserRegister();
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
