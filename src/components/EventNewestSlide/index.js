import React from "react";

import { Spinner } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Card } from "../SliderItems/Card";
import { LeftArrow, RightArrow } from "../SliderItems/Arrows";

import "./styles.scss";

// Graphql query to get 5 events sorted by timestamp (newest created) where status is "On Going" and rank is false
const NEWEST_EVENTS = gql`
	query NewestEvents {
		events(
			query: { status: "On Going", rank: false }
			limit: 5
			sortBy: TIMESTAMP_DESC
		) {
			_id
			name
			images
			classifications {
				segments {
					_id
					name
				}
				genres {
					_id
					name
					segment
				}
			}
			timestamp
		}
	}
`;

const EventNewestSlide = () => {
	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(NEWEST_EVENTS);

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

	//Else when data is fetched show data inside scrollmenu (vertical scrollbar with items) where we map fetched data
	return (
		<div className="wrapNewest">
			<h2>Newest</h2>
			<ScrollMenu
				LeftArrow={LeftArrow}
				RightArrow={RightArrow}
				options={{
					ratio: 0.9,
					rootMargin: "5px",
					threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
				}}
			>
				{data.events.map((event) => (
					<Card itemId={event._id} event={event} key={event._id} />
				))}
			</ScrollMenu>
		</div>
	);
};

export default EventNewestSlide;
