import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { Carousel, Spinner } from "react-bootstrap";

import gql from "graphql-tag";

import "./styles.scss";

// Graphql mutation to get event ids, images and names where event rank is true
const ALL_EVENTS = gql`
	query AllEvents {
		events(query: { status: "On Going", rank: true }, limit: 5) {
			_id
			images
			name
		}
	}
`;

const EventCarousel = () => {
	// Use useQuery hook to manage data fetching
	const { loading, error, data } = useQuery(ALL_EVENTS);

	//Get hook for navigating
	const history = useNavigate();

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

	//Else when data is fetched show data inside carousel where we map fetched data to displey each carousel item
	return (
		<div className="wrapCarousel">
			<Carousel fade wrap={true}>
				{data.events.map((event) => (
					<Carousel.Item
						key={event._id}
						onClick={() => history(`/event/${event._id}`)}
					>
						<img
							className="carouselImage"
							src={event.images[1]}
							alt={event.name}
						/>
						<Carousel.Caption>
							<h3>{event.name}</h3>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
};

export default EventCarousel;
