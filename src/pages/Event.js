import React from "react";
import { useParams } from "react-router-dom";

const Event = () => {
	let { eventId } = useParams();
	return (
		<div>
			<h1>Event</h1>
			<h4>{eventId}</h4>
		</div>
	);
};

export default Event;
