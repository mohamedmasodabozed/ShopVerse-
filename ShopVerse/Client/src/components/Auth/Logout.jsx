import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  }, [setIsLoggedIn, navigate]);
  return null;
}
