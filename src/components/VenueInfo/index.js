import React from "react";
import * as Realm from "realm-web";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import { Spinner } from "react-bootstrap";

import VenueEvents from "./VenueEvents";

import "./styles.scss";

// Graphql mutation to get event by its ID
const GET_VENUE = gql`
	query GetVenue($venueID: ObjectId!) {
		venue(query: { _id: $venueID }) {
			_id
			name
			images
			url
			note
			office_info {
				phone
				email
			}
			address
			zip_code
			city
			country
		}
	}
`;

const VenueInfo = ({ venueId }) => {
	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(GET_VENUE, {
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

	return (
		<div style={{ margin: 0, padding: 0 }}>
			<div className="venueWrap">
				<h1>{data.venue.name}</h1>
				<div className="flexDiv">
					<div className="venueInfoWrap">
						<div className="venueImg">
							<img src={data.venue.images[1]} alt={data.venue.name} />
						</div>
						<div className="venueInfoData">
							<div className="venueAddress">
								<p>{data.venue.address}</p>
								<p>
									{data.venue.zip_code} {data.venue.city}
								</p>
								<p>{data.venue.country}</p>
							</div>
							<p className="venueLink">
								<a href={data.venue.url} target="_blank" rel="noreferrer">
									{data.venue.url}
								</a>
							</p>
							<div className="venueContact">
								<p>
									<b>Email:</b> {data.venue.office_info.email}
								</p>
								<p>
									<b>Phone:</b> {data.venue.office_info.phone}
								</p>
							</div>
						</div>
					</div>
					<div className="venueDescriptionWrap">
						{data.venue.note.split("/n").map((note, index) => (
							<p key={index}>
								{note}
								<br />
							</p>
						))}
					</div>
				</div>
			</div>
			<div className="venueEventsWrap">
				<h3>Events</h3>
				<VenueEvents venueId={venueId} />
			</div>
		</div>
	);
};

export default VenueInfo;
