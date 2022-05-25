import React from "react";
import { useParams } from "react-router-dom";

const Venue = () => {
	let { venueId } = useParams();

	return (
		<div>
			<h1>Venue</h1>
			<p>{venueId}</p>
		</div>
	);
};

export default Venue;
