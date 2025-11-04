import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center px-6 w-full">
      <div className="text-7xl mb-6 animate-bounce">🧭</div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
        It seems like you drifted away from your path!
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Let me take you back to your path!
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-transform active:scale-95"
        >
           Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold shadow-md hover:bg-gray-300 hover:scale-105 transition-transform active:scale-95"
        >
          Back
        </button>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-200 opacity-30 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
    </div>
  );
};

export default ErrorPage;
