import React from "react";

//Router
import { Routes, Route } from "react-router-dom";

//Realm
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { RealmAppProvider } from "./RealmApp";

//HOC
import WithAuth from "./HOC/withAuth";

//Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from "./pages/Event";
import Profile from "./pages/Profile";
import Venue from "./pages/Venue";
import Tickets from "./pages/Tickets";

import "./default.scss";

export const APP_ID = process.env.REACT_APP_REALM_ID;

function App() {
	return (
		<RealmAppProvider appId={APP_ID}>
			<RealmApolloProvider>
				<Routes>
					<Route
						path="/"
						element={
							<MainLayout>
								<Home />
							</MainLayout>
						}
						exact
					/>

					<Route
						path="/login"
						element={
							<AuthLayout>
								<Login />
							</AuthLayout>
						}
					/>

					<Route
						path="/register"
						element={
							<AuthLayout>
								<Register />
							</AuthLayout>
						}
					/>

					<Route
						path="/profile"
						element={
							<WithAuth>
								<AuthLayout>
									<Profile />
								</AuthLayout>
							</WithAuth>
						}
					/>

					<Route
						path="/event/:eventId"
						element={
							<AuthLayout>
								<Event />
							</AuthLayout>
						}
					/>
					<Route
						path="/event/:eventId/tickets"
						element={
							<WithAuth>
								<AuthLayout>
									<Tickets />
								</AuthLayout>
							</WithAuth>
						}
						exact
					/>

					<Route
						path="/venue/:venueId"
						element={
							<AuthLayout>
								<Venue />
							</AuthLayout>
						}
					/>
				</Routes>
			</RealmApolloProvider>
		</RealmAppProvider>
	);
}

export default App;
