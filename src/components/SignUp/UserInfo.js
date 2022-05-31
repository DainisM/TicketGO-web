import React from "react";
import { Form } from "react-bootstrap";

const UserInfo = ({ formData, setFormData, errors, setErrors }) => {
	return (
		<>
			<Form.Group className="mb-5" controlId="email">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={formData.email}
					onChange={(e) => {
						setFormData({ ...formData, email: e.target.value });
						setErrors({ ...errors, emailError: "" });
					}}
					isInvalid={errors.emailError}
				/>
				{errors.emailError && (
					<Form.Control.Feedback type="invalid">
						{errors.emailError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5" controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter password"
					value={formData.password}
					onChange={(e) => {
						setFormData({ ...formData, password: e.target.value });
						setErrors({ ...errors, passwordError: "" });
					}}
					isInvalid={errors.passwordError}
				/>
				{errors.passwordError && (
					<Form.Control.Feedback type="invalid">
						{errors.passwordError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-3" controlId="confirmPassword">
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Confirm password"
					value={formData.confirmPassword}
					onChange={(e) => {
						setFormData({ ...formData, confirmPassword: e.target.value });
						setErrors({ ...errors, confirmPasswordError: "" });
					}}
					isInvalid={errors.confirmPasswordError}
				/>
				{errors.confirmPasswordError && (
					<Form.Control.Feedback type="invalid">
						{errors.confirmPasswordError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5 passInfo" controlId="passInfo">
				<h3>Your password must:</h3>
				<p>Be at least 8 characters long</p>
				<p>A mixture of letters and numbers.</p>
				<p>A mixture of both uppercase and lowercase letters.</p>
			</Form.Group>

			<Form.Group className="mb-5" controlId="firstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter first name"
					value={formData.firstName}
					onChange={(e) => {
						setFormData({ ...formData, firstName: e.target.value });
						setErrors({ ...errors, firstNameError: "" });
					}}
					isInvalid={errors.firstNameError}
				/>
				{errors.firstNameError && (
					<Form.Control.Feedback type="invalid">
						{errors.firstNameError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5" controlId="lastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter last name"
					value={formData.lastName}
					onChange={(e) => {
						setFormData({ ...formData, lastName: e.target.value });
						setErrors({ ...errors, lastNameError: "" });
					}}
					isInvalid={errors.lastNameError}
				/>
				{errors.lastNameError && (
					<Form.Control.Feedback type="invalid">
						{errors.lastNameError}
					</Form.Control.Feedback>
				)}
			</Form.Group>
		</>
	);
};

export default UserInfo;
