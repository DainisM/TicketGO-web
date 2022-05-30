import { Link } from "react-router-dom";
import moment from "moment";

import "./styles.scss";

//Card element to show event. Depending on event props values it shows 2 different layouts
export const Card = ({ event, itemId }) => {
	return (
		<Link className="eventCardLink" to={`/event/${itemId}`}>
			<div role="button" tabIndex={0} className="cardWrapper">
				{event.dates ? (
					<div className="cardDiv">
						<div className="imgWrap">
							<img src={event.images[0]} alt={event.name} />
						</div>
						<div className="infoWrapAll">
							<h3>{event.name}</h3>
							<div>
								<div className="eventDateTime">
									<p>{moment(event.dates.start).format("DD.MM.YYYY")}</p>
									<p>{event.dates.start.split("T")[1].split(":00Z")[0]}</p>
								</div>
								<p>
									{event.venue.name} - {event.venue.city}
								</p>
								<p>
									{event.price.currency} {event.price.min} - {event.price.max}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="cardDiv2">
						<div className="imgWrap">
							<img src={event.images[0]} alt={event.name} />
						</div>
						<div className="infoWrap">
							<p>{event.classifications.segments.name}</p>
							<h3>{event.name}</h3>
						</div>
					</div>
				)}
			</div>
		</Link>
	);
};
