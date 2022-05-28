import React, { useState } from "react";
import gql from "graphql-tag";
import * as Realm from "realm-web";
import { Spinner } from "react-bootstrap";

import TicketModal from "./TicketModal";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useRealmApp } from "../../RealmApp";
import { useQuery } from "@apollo/client";

// Graphql query to get all user orders by its ID
const GET_USER_ORDERS = gql`
	query GetUserOrders($userID: ObjectId!) {
		orders(query: { user: $userID, status: "On Going" }) {
			_id
			status
			user
			event {
				_id
				images
				name
				dates {
					end
					entry
					span
					start
				}
				venue {
					_id
					name
					city
				}
			}
		}
	}
`;

const UserOrders = () => {
	//Accessing Realm App
	const app = useRealmApp();

	const [showModal, setShowModal] = useState(false);
	const [orderID, setOrderID] = useState("");

	const handleModal = () => {
		setShowModal(!showModal);
	};

	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_USER_ORDERS, {
		variables: { userID: Realm.BSON.ObjectID(app.currentUser.id) },
	});

	// If loading is true then show spinner animation
	if (loading) {
		return (
			<div className="loadingDiv">
				<Spinner
					animation="border"
					variant="info"
					style={{ width: "10rem", height: "10rem" }}
				/>
			</div>
		);
	}

	//When there is error show error message
	if (error) {
		return <div>encountered an error: {error.message}</div>;
	}

	//Create new empty array
	const orderItems = [];

	return (
		<>
			<div className="ordersWrap">
				{orderItems
					.concat(data.orders)
					.sort(
						(a, b) =>
							new Date(a.event.dates.start) - new Date(b.event.dates.start)
					)
					.map((order) => (
						<div
							className="orderItem"
							key={order._id}
							style={{ backgroundImage: `url(${order.event.images[1]})` }}
						>
							<div className="orderBackground">
								<p id="orderId">Order #{order._id}</p>
								<div className="orderData">
									<div className="orderImg">
										<img src={order.event.images[0]} alt={order.event.name} />
									</div>
									<div className="orderDate">
										<p>
											{
												moment(order.event.dates.start.split("T")[0])
													.format("ll")
													.split(" ")[0]
											}
										</p>
										<p>
											{
												moment(order.event.dates.start.split("T")[0])
													.format("ll")
													.split(" ")[1]
													.split(",")[0]
											}
										</p>
									</div>
									<div className="orderInfo">
										<p>
											{moment(order.event.dates.start.split("T")[0]).format(
												"ddd"
											)}{" "}
											{order.event.dates.start.split("T")[1].split(":00Z")[0]}
										</p>
										<p id="orderName">{order.event.name}</p>
										<p>
											{order.event.venue.name}, {order.event.venue.city}
										</p>
									</div>
									<div className="orderLink">
										<button
											onClick={() => {
												setOrderID(order._id);
												setShowModal(true);
											}}
										>
											<FontAwesomeIcon
												icon={faChevronRight}
												size="7x"
												color="cyan"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			{orderID && (
				<TicketModal
					showModal={showModal}
					handleModal={handleModal}
					orderId={orderID}
				/>
			)}
		</>
	);
};

export default UserOrders;
