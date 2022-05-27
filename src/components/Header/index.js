import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

import { useRealmApp } from "../../RealmApp";

import "./styles.scss";
import Logo from "../../assets/TicketGO_Logo.png";

function Header() {
	//Accessing Realm App
	const app = useRealmApp();

	//Get hook for navigating
	const history = useNavigate();

	//Method to handle user signout
	const handleSignOut = async () => {
		//Logout current user
		await app.currentUser.logOut();

		//Check if current page is homepage
		if (window.location.pathname === "/") {
			//If it is then refresh page
			window.location.reload();
		} else {
			//Navigate to homepage
			history("/");
			window.location.reload();
		}
	};

	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src={Logo} alt="TicketGO Logo" />
					</Link>
				</div>

				<div className="searchBar">
					<input placeholder="Search" />
				</div>

				{app.currentUser === null ||
				app.currentUser.providerType === "anon-user" ? (
					<div className="actions">
						<ul>
							<li key="1">
								<Link to="/register">Register</Link>
							</li>

							<li key="2">
								<Link to="/login">Login</Link>
							</li>
						</ul>
					</div>
				) : (
					<div className="actions">
						<ul className="loggedUl">
							<li>
								<Link to="/profile">
									{" "}
									<FontAwesomeIcon icon={faUserCircle} size="xl" /> My Account
								</Link>
							</li>
							<li>
								<button className="signOutBtn" onClick={handleSignOut}>
									Sign out
								</button>
							</li>
						</ul>
					</div>
				)}
			</div>
			<div className="navBar">
				<ul>
					<li>Music</li>
					<li>Sports</li>
					<li>Arts & Theatre</li>
					<li>Festivals</li>
					<li>Family</li>
					<li>Comedy</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;
