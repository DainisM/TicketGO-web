import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRealmApp } from "../RealmApp";

const useAuth = (props) => {
	//Accessing Realm App
	const app = useRealmApp();

	const history = useNavigate();

	useEffect(() => {
		if (app.currentUser.providerType !== "local-userpass") {
			history("/login");
		}
	}, [app]);

	return app.currentUser;
};

export default useAuth;
