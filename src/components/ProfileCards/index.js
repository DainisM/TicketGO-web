import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";

const ProfileCards = ({ header, data, query, isEmail }) => {
	//State hooks
	const [userData, setUserData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);

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
							<button id="saveBtn">Save</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileCards;
