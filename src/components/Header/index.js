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
							<Link to="/registration">Register</Link>
						</li>

						<li key="2">
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
