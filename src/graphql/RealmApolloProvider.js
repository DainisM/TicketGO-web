import React, { useEffect, useState } from "react";
import { useRealmApp } from "../RealmApp";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";

const createRealmApolloClient = (app) => {
	const link = new HttpLink({
		// Realm apps GraphQL endpoint using App ID
		uri: `https://realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
		// A fetch handler adds the logged user's access token to GraphQL requests
		fetch: async (uri, options) => {
			if (!app.currentUser) {
				throw new Error(`Must be logged in to use the GraphQL API`);
			}
			// Refreshing a users data and also access token
			await app.currentUser.refreshCustomData();
			// Adding a bearer token Authorization header to request
			options.headers.Authorization = `Bearer ${app.currentUser.accessToken}`;
			return fetch(uri, options);
		},
	});
	const cache = new InMemoryCache();
	return new ApolloClient({ link, cache });
};

export default function RealmApolloProvider({ children }) {
	//Get Realm App
	const app = useRealmApp();
	//Set client by using method from above and app object
	const [client, setClient] = useState(createRealmApolloClient(app));

	useEffect(() => {
		setClient(createRealmApolloClient(app));
	}, [app]);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
