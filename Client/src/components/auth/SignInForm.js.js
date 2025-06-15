import React from "react";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-4 bg-light shadow rounded d-flex justify-content-center align-items-center bg-transparent my-5"
      >
        <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
      </motion.div>
    </div>
  );
}
