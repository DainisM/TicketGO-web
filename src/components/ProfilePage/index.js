import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faIdCard } from "@fortawesome/free-solid-svg-icons";

import UserInfo from "./UserInfo";
import UserOrders from "./UserOrders";

import "./styles.scss";

const ProfilePage = () => {
	//State hook used for toggling between 2 components
	const [showInfo, setShowInfo] = useState(true);

	return (
		<div>
			<div className="profileHeaderWrap">
				<h1>My Accounnt</h1>
				<div className="btnWrap">
					<button
						style={{ borderBottom: showInfo ? "3px solid cyan" : "none" }}
						onClick={() => setShowInfo(true)}
					>
						<FontAwesomeIcon
							icon={faIdCard}
							style={{ marginRight: "1rem" }}
							color="darkcyan"
						/>{" "}
						Profile
					</button>
					<button
						style={{ borderBottom: !showInfo ? "3px solid cyan" : "none" }}
						onClick={() => setShowInfo(false)}
					>
						<FontAwesomeIcon
							icon={faTicket}
							style={{ marginRight: "1rem" }}
							color="darkcyan"
						/>
						Tickets
					</button>
				</div>
			</div>
			{/* If showInfo is true then show user info component otherwise show user tickets */}
			<div>{showInfo ? <UserInfo /> : <UserOrders />}</div>
		</div>
	);
};

export default ProfilePage;
