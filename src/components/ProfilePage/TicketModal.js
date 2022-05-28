import React from "react";
import * as Realm from "realm-web";
import { Carousel, Modal, Spinner } from "react-bootstrap";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import QRCode from "react-qr-code";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Graphql query to get order tickets by its ID
const GET_ORDER_TICKETS = gql`
	query GetOrderTickets($orderID: ObjectId!) {
		order(query: { _id: $orderID, status: "On Going" }) {
			_id
			tickets {
				_id
				status
				timestamp
				section {
					_id
					currency
					description
					name
					price
				}
			}
			event {
				_id
				dates {
					end
					entry
					span
					start
				}
				name
				venue {
					_id
					name
					city
				}
			}
		}
	}
`;

const TicketModal = ({ showModal, handleModal, orderId }) => {
	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_ORDER_TICKETS, {
		variables: { orderID: Realm.BSON.ObjectID(orderId) },
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

	//Else when data is fetched show data
	return (
		<Modal
			show={showModal}
			onHide={handleModal}
			dialogClassName="modal-90w"
			centered={true}
			size="xl"
		>
			<Modal.Header closeButton>
				<Modal.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>
					Your Tickets
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="modalWrapCarousel">
				<Carousel
					wrap={false}
					interval={null}
					prevIcon={
						<FontAwesomeIcon icon={faChevronLeft} color="darkcyan" size="5x" />
					}
					nextIcon={
						<FontAwesomeIcon icon={faChevronRight} color="darkcyan" size="5x" />
					}
				>
					{data.order.tickets.map((ticket) => (
						<Carousel.Item key={ticket._id}>
							<div className="itemData">
								<div className="mainInfo">
									<p id="eventName">{data.order.event.name}</p>
									<div className="eventVenueInfo">
										<p>
											{data.order.event.venue.name},{" "}
											{data.order.event.venue.city}
										</p>
										<p>
											{moment(data.order.event.dates.start).format(
												"DD.MM.YYYY"
											)}
											{" @ "}
											{
												data.order.event.dates.start
													.split("T")[1]
													.split(":00Z")[0]
											}
										</p>
										<p>
											Please note that doors open at{" "}
											{
												data.order.event.dates.entry
													.split("T")[1]
													.split(":00Z")[0]
											}
										</p>
									</div>
									<p id="ticketDesc">{ticket.section.description}</p>
									<p id="ticketNote">
										Do not fold the QR code. Keep your ticket until the end of
										the event.
									</p>
								</div>
								<div className="additionInfo">
									<p>
										<b>ID:</b> {ticket._id}
									</p>
									<p>
										<b>Order ID:</b>
										{data.order._id}
									</p>
									<p>{ticket.section.name}</p>
									<div className="qrCode">
										<QRCode value={ticket._id} />
									</div>
								</div>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</Modal.Body>
		</Modal>
	);
};

export default TicketModal;
