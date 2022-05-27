import React from "react";
import * as Realm from "realm-web";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import moment from "moment";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

// Graphql mutation to get event by its ID
const GET_VENUE_EVENTS = gql`
	query GetVenueEvents($venueID: ObjectId!) {
		events(query: { venue: { _id: $venueID } }) {
			_id
			name
			dates {
				end
				entry
				span
				start
			}
		}
	}
`;

const VenueEvents = ({ venueId }) => {
	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_VENUE_EVENTS, {
		variables: { venueID: Realm.BSON.ObjectID(venueId) },
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
	let eventItems = [];

	return (
		<div className="itemsWrap">
			{/* Merge data from db into empty array for sorting by event dates start and map then over and show */}
			{eventItems
				.concat(data.events)
				.sort((a, b) => a.dates.start - b.dates.start)
				.map((event) => (
					<div className="items" key={event._id}>
						<div className="singleItem">
							<div className="itemDate">
								<p>
									{
										moment(event.dates.start.split("T")[0])
											.format("ll")
											.split(" ")[0]
									}
								</p>
								<p>
									{
										moment(event.dates.start.split("T")[0])
											.format("ll")
											.split(" ")[1]
											.split(",")[0]
									}
								</p>
							</div>
							<div className="itemName">
								<p>
									{moment(event.dates.start.split("T")[0]).format("dddd")}{" "}
									{event.dates.start.split("T")[1].split(":00Z")[0]}
								</p>
								<p id="name">{event.name}</p>
							</div>
							<div className="itemLink">
								<Link to={`/event/${event._id}`}>See More</Link>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default VenueEvents;
