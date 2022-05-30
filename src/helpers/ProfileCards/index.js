import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

// Graphql mutation to update user information by its ID
const UPDATE_USER_INFO = gql`
	mutation UpdateUserMobile($userID: ObjectId!, $updates: UserUpdateInput!) {
		updateOneUser(query: { _id: $userID }, set: $updates) {
			_id
			first_name
			last_name
			mobile
			address
			zip_code
			city
			country
		}
	}
`;

const ProfileCards = ({ header, data, userId, query, isEmail }) => {
	//State hooks
	const [userData, setUserData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);

	// Use useMutation hook to manage data update
	const [updateUserMobile] = useMutation(UPDATE_USER_INFO);

	//On render set userData to be data getting from props
	useEffect(() => {
		setUserData(data);
	}, [data]);

	//HandleChange method used to update user input data to state
	const handleChange = (e, i) => {
		//Clone data array
		const clonedData = [...data];
		//Update value by name in array where we find item by index
		clonedData[i][e.target.name] = e.target.value;
		//Set cloned and updated array into the state
		setUserData(clonedData);
	};

	//Method to handle save button click
	const handleSave = () => {
		//Switch statement to update object data by passed query String
		switch (query) {
			case "UPDATE_USER_INFO":
				return (
					//Call for update mutation and pass on variables
					updateUserMobile({
						variables: {
							userID: userId,
							updates: {
								first_name: userData[0].value,
								last_name: userData[1].value,
							},
						},
					}),
					//Then set isEditing back to false
					setIsEditing(false)
				);

			case "UPDATE_USER_MOBILE":
				return (
					//Call for update mutation and pass on variables
					updateUserMobile({
						variables: {
							userID: userId,
							updates: {
								mobile: userData[0].value,
							},
						},
					}),
					//Then set isEditing back to false
					setIsEditing(false)
				);

			case "UPDATE_USER_ADDRESS":
				return (
					//Call for update mutation and pass on variables
					updateUserMobile({
						variables: {
							userID: userId,
							updates: {
								address: userData[0].value,
								zip_code: userData[1].value,
								city: userData[2].value,
								country: userData[3].value,
							},
						},
					}),
					//Then set isEditing back to false
					setIsEditing(false)
				);

			default:
				return (
					//Then set isEditing back to false
					setIsEditing(false)
				);
		}
	};

	return (
		<div>
			{isEmail ? (
				<div className="profileCard">
					<div className="cardHeader">
						<h3>Email Address</h3>
					</div>
					<div className="cardBody">
						<p id="cardEmailNote">
							Your email address is your account username, use it to log in,
							manage your account, receive offers and ticket updates.
						</p>
						<div className="cardItem">
							<label>{data[0].label}</label>
							<input value={data[0].value} readOnly disabled />
						</div>
					</div>
				</div>
			) : (
				<div className="profileCard">
					<div className="cardHeader">
						<h3>{header}</h3>
						{!isEditing && (
							<button onClick={() => setIsEditing(true)}>
								<FontAwesomeIcon icon={faPencil} /> Edit
							</button>
						)}
					</div>
					<div className="cardBody">
						{userData.map((item, index) => (
							<div className="cardItem" key={index}>
								<label>{item.label}</label>
								<input
									value={item.value}
									name="value"
									disabled={!isEditing}
									onChange={(e) => handleChange(e, index)}
								/>
							</div>
						))}
					</div>
					{isEditing && (
						<div className="cardButtons">
							<button id="cancelBtn" onClick={() => setIsEditing(false)}>
								Cancel
							</button>
							<button id="saveBtn" onClick={handleSave}>
								Save
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileCards;
