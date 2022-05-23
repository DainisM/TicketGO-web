import { useEffect, useState } from "react";

//Router
import { Routes, Route } from "react-router-dom";

//Realm
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

//Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from "./pages/Event";

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
						path="/event/:eventId"
						element={
							<AuthLayout>
								<Event />
							</AuthLayout>
						}
					/>
				</Routes>
			</RealmApolloProvider>
		</RealmAppProvider>
	);
}

export default App;
