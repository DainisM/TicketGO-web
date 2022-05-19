import React from "react";
import { Form } from "react-bootstrap";

const AddressInfo = ({ formData, setFormData, errors, setErrors }) => {
	return (
		<>
			<Form.Group className="mb-5" controlId="phone">
				<Form.Label>Phone number</Form.Label>
				<Form.Control
					type="text"
					placeholder="Like: +4525659878"
					value={formData.phone}
					onChange={(e) => {
						setFormData({ ...formData, phone: e.target.value });
						setErrors({ ...errors, phoneError: "" });
					}}
					isInvalid={errors.phoneError}
				/>
				{errors.phoneError && (
					<Form.Control.Feedback type="invalid">
						{errors.phoneError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5" controlId="address">
				<Form.Label>Address</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter address"
					value={formData.address}
					onChange={(e) => {
						setFormData({ ...formData, address: e.target.value });
						setErrors({ ...errors, addressError: "" });
					}}
					isInvalid={errors.addressError}
				/>
				{errors.addressError && (
					<Form.Control.Feedback type="invalid">
						{errors.addressError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5" controlId="post">
				<Form.Label>Post code</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter post code"
					value={formData.post}
					onChange={(e) => {
						setFormData({ ...formData, post: e.target.value });
						setErrors({ ...errors, postError: "" });
					}}
					isInvalid={errors.postError}
				/>
				{errors.postError && (
					<Form.Control.Feedback type="invalid">
						{errors.postError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5" controlId="city">
				<Form.Label>City</Form.Label>
				<Form.Control
					type="text"
					placeholder="City"
					value={formData.city}
					onChange={(e) => {
						setFormData({ ...formData, city: e.target.value });
						setErrors({ ...errors, cityError: "" });
					}}
					isInvalid={errors.cityError}
				/>
				{errors.cityError && (
					<Form.Control.Feedback type="invalid">
						{errors.cityError}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-5" controlId="country">
				<Form.Label>Country</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter country"
					value={formData.country}
					onChange={(e) => {
						setFormData({ ...formData, country: e.target.value });
						setErrors({ ...errors, countryError: "" });
					}}
					isInvalid={errors.countryError}
				/>
				{errors.countryError && (
					<Form.Control.Feedback type="invalid">
						{errors.countryError}
					</Form.Control.Feedback>
				)}
			</Form.Group>
		</>
	);
};

export default AddressInfo;
