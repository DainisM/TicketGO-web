import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../../assets/TicketGO_Logo.png";
import "./styles.scss";

function Footer() {
	const getYear = () => {
		return new Date().getFullYear();
	};

	return (
		<footer className="footer">
			<div className="wrap">
				<div className="socials">
					<img src={Logo} alt="TicketGO Logo" />
					<div className="socialsLinks">
						<a href="https://www.facebook.com/" target="blank">
							<FontAwesomeIcon icon={faFacebook} size="xl" color="white" />
						</a>
						<a href="https://twitter.com/" target="blank">
							<FontAwesomeIcon icon={faTwitter} size="xl" color="white" />
						</a>
						<a href="https://www.instagram.com/" target="blank">
							<FontAwesomeIcon icon={faInstagram} size="xl" color="white" />
						</a>
					</div>
					<p>© {getYear()} TicketGO. All rights reserved.</p>
				</div>

				<div className="help">
					<h3>Looking for help</h3>
					<ul>
						<li>Help</li>
						<li>Fees</li>
						<li>Ticket onsales</li>
						<li>Sell Tickets</li>
					</ul>
				</div>

				<div className="about">
					<h3>About Us</h3>
					<ul>
						<li>About Us</li>
						<li>Contact Us</li>
					</ul>
				</div>

				<div className="terms">
					<ul>
						<li>Privacy Policy</li>
						<li>Terms of Purchase</li>
						<li>Terms of Use</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
