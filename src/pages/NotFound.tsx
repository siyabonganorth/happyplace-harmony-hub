
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vybe/5 to-slate-50 p-6">
      <div className="glass-panel max-w-md w-full p-10 text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">This page doesn't exist</p>
        <Button 
          onClick={() => navigate("/dashboard")}
          className="bg-vybe hover:bg-vybe/90"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
