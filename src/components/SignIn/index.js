import React, { useState } from "react";
import * as Realm from "realm-web";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRealmApp } from "../../RealmApp";
import "./styles.scss";

const SignIn = () => {
	//Accessing Realm App
	const app = useRealmApp();

	//State variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	//Get hook for navigating
	const history = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoggingIn(true);

		//Try to login into Realm app with email and password as credentials and if success then navigate to homepage
		try {
			await app.logIn(Realm.Credentials.emailPassword(email, password));
			history("/");
		} catch (error) {
			setIsLoggingIn(false);
			//If Error occured then thor new error
			throw new Error(error);
		}
	};

	return (
		<div className="loginWrap">
			<div className="loginHeader">
				<h1>Login</h1>
				<h2>Let´s GO and find tickets for your next best experience!</h2>
			</div>

			{isLoggingIn ? (
				<Spinner
					animation="border"
					variant="info"
					style={{ width: "4rem", height: "4rem" }}
				/>
			) : (
				<div className="form">
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-5" controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-5" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" className="formBtn">
							Login
						</Button>
					</Form>
				</div>
			)}

			<div className="links">
				<h3>New to TicketGO?</h3>
				<Link to="/register">Create an account</Link>
			</div>
		</div>
	);
};

export default SignIn;
