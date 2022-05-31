import React from "react";
import * as Realm from "realm-web";
import gql from "graphql-tag";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { useRealmApp } from "../../RealmApp";

import ProfileCards from "../../helpers/ProfileCards";

// Graphql query to get event by its ID
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
	const app = useRealmApp();

	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_USER_DATA, {
		variables: { userID: Realm.BSON.ObjectID(app.currentUser.id) },
	});

	// If loading is true then show spinner animation
	if (loading) {
		return (
			<div className="loadingDiv">
				<Spinner
					animation="border"
					variant="info"
					style={{ width: "10rem", height: "10rem" }}
				/>
			</div>
		);
	}

	//When there is error show error message
	if (error) {
		return <div>encountered an error: {error.message}</div>;
	}

	//Call helper component and pass nessecery data
	return (
		<div>
			<ProfileCards
				header={"Email Address"}
				data={[{ label: "Email Address", value: data.user.email }]}
				userId={data.user._id}
				isEmail
			/>
			<ProfileCards
				header={"Personal Information"}
				data={[
					{ label: "First name", value: data.user.first_name },
					{ label: "Last name", value: data.user.last_name },
				]}
				userId={data.user._id}
				query={"UPDATE_USER_INFO"}
			/>
			<ProfileCards
				header={"Contact Information"}
				data={[{ label: "Mobile nummber", value: data.user.mobile }]}
				userId={data.user._id}
				query={"UPDATE_USER_MOBILE"}
			/>
			<ProfileCards
				header={"Address Information"}
				data={[
					{ label: "Address", value: data.user.address },
					{ label: "Post code", value: data.user.zip_code },
					{ label: "City", value: data.user.city },
					{ label: "Country", value: data.user.country },
				]}
				userId={data.user._id}
				query={"UPDATE_USER_ADDRESS"}
			/>
		</div>
	);
};

export default UserInfo;
