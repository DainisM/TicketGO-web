import React from "react";
import gql from "graphql-tag";

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
	return (
		<div>
			<h1>UserInfo</h1>
		</div>
	);
};

export default UserInfo;
