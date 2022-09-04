import React, { useState } from "react";
import * as Realm from "realm-web";
import { Spinner, Table } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTicket } from "@fortawesome/free-solid-svg-icons";

// Graphql mutation to get event by its ID
const GET_EVENT_SECTIONS = gql`
	query GetEventSections($eventID: ObjectId!) {
		sections(query: { event: { _id: $eventID } }, sortBy: PRICE_ASC) {
			_id
			capacity
			currency
			description
			name
			price
			remaining
			sold
		}
	}
`;

const Sections = ({ eventId, handleStep, handleSetTickets }) => {
	const [tickets, setTickets] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0.0);

	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_EVENT_SECTIONS, {
		variables: { eventID: Realm.BSON.ObjectID(eventId) },
	});

	const handleClick = () => {
		handleSetTickets(tickets);
		handleStep();
	};

	//Method to handle click for adding ticket
	const handleAddTicket = (sectionId, sectionPrice) => {
		//Check if we can find the item in stat by ID (if item exists)
		if (tickets.find((ticket) => ticket.section === sectionId)) {
			//Then update item quantity
			setTickets(
				//Map array objects of all array and when on right item (section is equal passed section id) then increase quantity by 1
				tickets.map((ticket) => {
					return ticket.section === sectionId
						? { section: sectionId, quantity: ticket.quantity + 1 }
						: ticket;
				})
			);
		}
		//If Item with passed ID doesnt exists then create new item (object) in array with id and quantity 1
		else {
			setTickets([
				...tickets,
				{
					section: sectionId,
					quantity: 1,
				},
			]);
		}

		//Also increase total price
		setTotalPrice(totalPrice + sectionPrice);
	};

	const handleRemoveTicket = (sectionId, sectionPrice) => {
		//Check if we can find item in the array of items
		const existingTicket = tickets.find(
			(ticket) => ticket.section === sectionId
		);

		//If quantity is 1 then remove(filter out) it from array
		if (existingTicket.quantity === 1) {
			setTickets(tickets.filter((ticket) => ticket.section !== sectionId));
		}
		//Map array of all object items -> when on right item (found by section ID) then reduce quantity by 1
		else {
			setTickets(
				tickets.map((ticket) => {
					return ticket.section === sectionId
						? { section: sectionId, quantity: ticket.quantity - 1 }
						: ticket;
				})
			);
		}

		//Also increase total price
		setTotalPrice(totalPrice - sectionPrice);
	};

	//Method to check remaining tickets and show appropriate string
	const checkAvailability = (remaining) => {
		if (remaining === 0) {
			return "Sold out";
		} else if (remaining <= 50) {
			return "Few left";
		} else if (remaining >= 50 && remaining <= 100) {
			return "50+";
		} else {
			return "100+";
		}
	};

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

	return (
		<div className="sectionWrap">
			<h1>Choose your tickets</h1>
			<div className="sectionTableWrap">
				<Table>
					<thead>
						<tr>
							<th>Ticket Type</th>
							<th>Price</th>
							<th>Available</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.sections.map((section) => (
							<tr key={section._id}>
								<td>{section.name}</td>
								<td>{section.price}</td>
								<td>{checkAvailability(section.remaining)}</td>
								<td>
									<button
										onClick={() =>
											handleRemoveTicket(section._id, section.price)
										}
										disabled={
											!tickets.find((ticket) => ticket.section === section._id)
										}
									>
										<FontAwesomeIcon icon={faMinus} color="darkcyan" />
									</button>
									<span>
										{tickets.find((ticket) => ticket.section === section._id)
											? tickets.find((ticket) => ticket.section === section._id)
													.quantity
											: 0}
									</span>
									<button
										onClick={() => handleAddTicket(section._id, section.price)}
										disabled={section.remaining === 0}
									>
										<FontAwesomeIcon icon={faPlus} color="darkcyan" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{tickets.length !== 0 && (
				<div className="ticketQuantity">
					<span>
						<FontAwesomeIcon icon={faTicket} color="darkcyan" /> x
						{tickets.reduce(
							(total, currentTicket) =>
								(total = total + currentTicket.quantity),
							0
						)}
					</span>
				</div>
			)}

			<div className="ticketControls">
				<button disabled={!tickets.length} onClick={() => handleClick()}>
					Buy Tickets
				</button>
				{totalPrice !== 0.0 && (
					<span>
						<b>Total price:</b> {totalPrice} {data.sections[0].currency}
					</span>
				)}
			</div>
		</div>
	);
};

export default Sections;
