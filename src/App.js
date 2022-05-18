import { Routes, Route } from "react-router-dom";

//Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

//Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./default.scss";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<MainLayout>
							<Homepage />
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
			</Routes>
		</div>
	);
}

export default App;
