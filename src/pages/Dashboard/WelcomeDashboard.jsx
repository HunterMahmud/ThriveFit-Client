import React from "react";
import useAuthProvider from "./../../hooks/useAuthProvider";

const WelcomeDashboard = () => {
  const { user } = useAuthProvider();
  return (
    <div className="flex items-center justify-center h-full max-w-lg mx-auto text-center">
      <h1 className="text-4xl text-blue-600 font-bold">
        Welcome "{user?.displayName}" to dashboard
      </h1>
    </div>
  );
};

export default WelcomeDashboard;
