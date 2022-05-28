import React from "react";
import { useParams } from "react-router-dom";

import VenueInfo from "../components/VenueInfo";

const Venue = () => {
	let { venueId } = useParams();

	return <VenueInfo venueId={venueId} />;
};

export default Venue;
