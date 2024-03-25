import { useState } from "react";
import toast from "react-hot-toast";
import { userAuthContext } from "./AuthContext";
// import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
	// const [loading, setLoading] = useState(false);
	const { setAuthUser } = userAuthContext();


	const login = async (username, password) => {
        console.log("in login hook")
		const success = handleInputErrors(username, password);
		if (!success) return;
		// setLoading(true);
		try {
            console.log("in login hook 1")
			const res = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
                console.log(data.error)
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
            console.log(error.message   )
			toast.error(error.message);
		} finally {
			// setLoading(false);
		}
	};

	return {login};
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
        console.log("Please fill in all fields")
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}