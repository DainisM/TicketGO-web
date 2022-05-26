import React from "react";
import * as Realm from "realm-web";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDays,
	faDungeon,
	faCoins,
} from "@fortawesome/free-solid-svg-icons";

import { Spinner } from "react-bootstrap";

import "./styles.scss";

// Graphql mutation to get event by its ID
const GET_EVENT = gql`
	query GetEvent($eventID: ObjectId!) {
		event(query: { _id: $eventID }) {
			_id
			age_restriction
			info
			name
			url
			images
			dates {
				entry
				start
			}
			price {
				currency
				max
				min
			}
			note
			tickets_limit
			url
			venue {
				_id
				address
				details {
					accessibility_details
					general_details
					parking_details
				}
				city
				country
				name
				url
				zip_code
			}
		}
	}
`;

const EventInfo = ({ eventId }) => {
	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_EVENT, {
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

	//Else when data is fetched show data
	return (
		<div className="eventWrap">
			<div className="eventMain">
				<div className="mainInfo">
					<div className="imageWrap">
						<img src={data.event.images[1]} alt={data.event.name} />
					</div>
					<div className="infoWrap">
						<h1>{data.event.name}</h1>
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
						{data.event.url && (
							<div className="eventUrl">
								<p>
									<b>See more:</b>{" "}
									<a href={data.event.url} target="_blank" rel="noreferrer">
										{data.event.url}
									</a>
								</p>
							</div>
						)}
						<button>Buy tickets</button>
					</div>
				</div>
				<div className="eventDescription">
					{data.event.info.split("/n").map((info, index) => (
						<p key={index}>
							{info}
							<br />
						</p>
					))}
				</div>
			</div>
			<div className="eventInfo">
				<div className="note">
					<h3>Note</h3>
					<p>{data.event.note}</p>
				</div>

				<div className="info">
					<h3>Info</h3>
					<p>
						<b>Age restrictions: </b>
						{data.event.age_restriction}
					</p>
					<p>
						<b>Ticket limit: </b>
						Max {data.event.tickets_limit} per. customer
					</p>
					<p>
						<b>Accessibility: </b>
						{data.event.venue.details.accessibility_details}
					</p>
					<p>
						<b>Doors open: </b>
						{moment(data.event.dates.entry).format("DD.MM.YYYY")} @{" "}
						{data.event.dates.entry.split("T")[1].split(":00Z")[0]}
					</p>
					<p>
						<b>Parking: </b>
						{data.event.venue.details.parking_details}
					</p>
					<p>
						<b>General: </b>
						{data.event.venue.details.general_details}
					</p>
				</div>

				<div className="venue">
					<h3>Venue</h3>
					<Link className="venueLink" to={`/venue/${data.event.venue._id}`}>
						{data.event.venue.name}
					</Link>

					<div className="venueAddress">
						<p>{data.event.venue.address}</p>
						<p>
							{data.event.venue.zip_code} {data.event.venue.city}
						</p>
						<p>{data.event.venue.country}</p>
					</div>

					<a href={data.event.venue.url} target="_blank" rel="noreferrer">
						{data.event.venue.url}
					</a>
				</div>
			</div>
		</div>
	);
};

export default EventInfo;
