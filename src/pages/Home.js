import React from "react";

import { useRealmApp } from "../RealmApp";

import EventCarousel from "../components/EventCarousel";
import EventNewestSlide from "../components/EventNewestSlide";
import EventBestsellersSlide from "../components/EventBestsellersSlide";

const Home = () => {
	//Accessing Realm App
	const app = useRealmApp();

	return (
		<div style={{ minHeight: `calc(100% - 10rem - 20rem)` }}>
			{app.currentUser && (
				<div>
					<EventCarousel />
					<EventBestsellersSlide />
					<EventNewestSlide />
				</div>
			)}
		</div>
	);
};

export default Home;
