import React from "react";
import gql from "graphql-tag";
import { useRealmApp } from "../../RealmApp";

import ProfileCards from "../ProfileCards";

// Graphql mutation to get event by its ID
const GET_USER_DATA = gql`
	query GetUserData($userID: ObjectId!) {
		user(query: { _id: $userID }) {
			_id
			address
			city
			country
			email
			first_name
			last_name
			mobile
			zip_code
		}
	}
`;

const UserInfo = () => {
	//Accessing Realm App
	const app = useRealmApp;

	return (
		<div>
			<ProfileCards
				header={"Email Address"}
				data={[{ label: "Email Address", value: "dainis@email.com" }]}
				isEmail
			/>
			<ProfileCards
				header={"Personal Information"}
				data={[
					{ label: "First name", value: "Dainis" },
					{ label: "Last name", value: "Moisejenko" },
				]}
			/>
			<ProfileCards
				header={"Contact Information"}
				data={[{ label: "Mobile nummber", value: "+4525253777" }]}
			/>
			<ProfileCards
				header={"Address Information"}
				data={[
					{ label: "Address", value: "Almegård Alle" },
					{ label: "Post code", value: "2770" },
					{ label: "City", value: "Kastrup" },
					{ label: "Country", value: "Denmark" },
				]}
			/>
		</div>
	);
};

export default UserInfo;
