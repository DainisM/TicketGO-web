import React, { useState } from "react";
import * as Realm from "realm-web";

import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDays,
	faDungeon,
	faCoins,
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Payment from "./Payment";
import Sections from "./Sections";

import "./styles.scss";

// Graphql mutation to get event by its ID
const GET_EVENT_DATA = gql`
	query GetEvent($eventID: ObjectId!) {
		event(query: { _id: $eventID }) {
			_id
			name
			images
			dates {
				start
			}
			price {
				currency
				max
				min
			}
			venue {
				_id
				city
				name
			}
		}
	}
`;

const EventTickets = () => {
	const { eventId } = useParams();

	//State hooks
	const [step, setStep] = useState(true);
	const [tickets, setTickets] = useState([]);

	//Method to check step state and display appropriate component
	const StepDisplay = () => {
		//If step state is true then return Sections component
		if (step) {
			return (
				<Sections
					eventId={eventId}
					handleStep={handleStep}
					handleSetTickets={setTickets}
				/>
			);
		}
		//If step state is other in our case false then return Payment component
		else {
			return <Payment tickets={tickets} handleStep={handleStep} />;
		}
	};

	const handleStep = () => {
		setStep(!step);
	};

	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_EVENT_DATA, {
		variables: { eventID: Realm.BSON.ObjectID(eventId) },
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

	return (
		<>
			<div
				className="eventInfoWrap"
				style={{ backgroundImage: `url(${data.event.images[1]})` }}
			>
				<div className="eventTicketsBackground">
					<div className="eventTicketImageWrap">
						<img src={data.event.images[0]} alt={data.event.name} />
					</div>
					<div className="eventTicketInfoWrap">
						<h3>{data.event.name}</h3>
						<p>
							<FontAwesomeIcon
								icon={faCalendarDays}
								color="darkcyan"
								size="1x"
								style={{ marginRight: "1rem" }}
							/>
							{moment(data.event.dates.start).format("dddd DD.MM.YYYY")} @{" "}
							{data.event.dates.start.split("T")[1].split(":00Z")[0]}
						</p>

						<p>
							<FontAwesomeIcon
								icon={faDungeon}
								color="darkcyan"
								size="1x"
								style={{ marginRight: "1rem" }}
							/>
							{data.event.venue.name}, {data.event.venue.city}
						</p>
						<p>
							<FontAwesomeIcon
								icon={faCoins}
								color="darkcyan"
								size="1x"
								style={{ marginRight: "1rem" }}
							/>
							{data.event.price.min === data.event.price.max ? (
								<span>{data.event.price.min} </span>
							) : (
								<span>
									{data.event.price.min} - {data.event.price.max}{" "}
								</span>
							)}

							{data.event.price.currency}
						</p>
					</div>
				</div>
			</div>
			<div>{StepDisplay()}</div>
		</>
	);
};

export default EventTickets;
