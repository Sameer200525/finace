"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  // The SessionContextProvider now handles redirects based on authentication status.
  // This page can serve as a simple landing or loading page before the redirect.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">Welcome!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Loading your finance tracker...
        </p>
      </div>
    </div>
  );
};

export default Index;