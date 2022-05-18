import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Logo from "../../assets/TicketGO_Logo.png";

function Header() {
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
