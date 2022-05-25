import React from "react";
import { useParams } from "react-router-dom";

import EventInfo from "../components/EventInfo";

const Event = () => {
	//Ger event ID from params using useParams hook
	let { eventId } = useParams();
	return (
		<>
			<EventInfo eventId={eventId} />
		</>
	);
};

export default Event;
