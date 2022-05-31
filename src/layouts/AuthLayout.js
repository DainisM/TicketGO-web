import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthLayout = (props) => {
	return (
		<div className="fullHeight">
			<Header {...props} />
			<section className="authLayout">{props.children}</section>
			<Footer />
		</div>
	);
};

export default AuthLayout;
