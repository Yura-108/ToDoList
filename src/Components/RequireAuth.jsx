import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../redux/slices/userSlice.js";

export default function RequireAuth({children}) {
	const location = useLocation()
	const isAuth = useSelector(isAuthSelector);

	if (!isAuth) {
		return <Navigate to={'/login'} state={{from: location}} />
	}
	return children

}