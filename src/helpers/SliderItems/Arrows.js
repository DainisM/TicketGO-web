import React, { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

import "./styles.scss";

//Component for arrows with styling and other props
const Arrow = ({ children, disabled, onClick }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className="arrowBtn"
			style={{ opacity: disabled ? "0" : "1", userSelect: "none" }}
		>
			{children}
		</button>
	);
};

//Component for left arrow for scrolling to previous item in scrollbar
export const LeftArrow = () => {
	const {
		getPrevItem,
		isFirstItemVisible,
		scrollToItem,
		visibleItemsWithoutSeparators,
		initComplete,
	} = useContext(VisibilityContext);

	//Check for initializing completed and firstItem is visible if false then set component unvisible
	const [disabled, setDisabled] = useState(
		!initComplete || (initComplete && isFirstItemVisible)
	);

	useEffect(() => {
		// detect if whole component visible
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isFirstItemVisible);
		}
	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

	// scroll 1 item on click
	const clickHandler = () => {
		const prevItem = getPrevItem();
		scrollToItem(prevItem?.entry?.target, "smooth", "start");
	};

	return (
		<Arrow disabled={disabled} onClick={clickHandler}>
			<FontAwesomeIcon icon={faChevronLeft} size="3x" color="darkcyan" />
		</Arrow>
	);
};

//Component for left arrow for scrolling to next item in scrollbar
export const RightArrow = () => {
	const {
		getNextItem,
		isLastItemVisible,
		scrollToItem,
		visibleItemsWithoutSeparators,
	} = useContext(VisibilityContext);

	//Check for last item and if it is visible inside scrollview then disable and hide buton
	const [disabled, setDisabled] = useState(
		!visibleItemsWithoutSeparators.length && isLastItemVisible
	);

	useEffect(() => {
		// detect if whole component visible
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isLastItemVisible);
		}
	}, [isLastItemVisible, visibleItemsWithoutSeparators]);

	// scroll 1 item
	const clickHandler = () => {
		const nextItem = getNextItem();
		scrollToItem(nextItem?.entry?.target, "smooth", "end");
	};

	return (
		<Arrow disabled={disabled} onClick={clickHandler}>
			<FontAwesomeIcon icon={faChevronRight} size="3x" color="darkcyan" />
		</Arrow>
	);
};
