import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component will scroll the window to the top whenever the pathname changes
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
}
