"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/context/authContext/auth";

const pricingPlans = [
  {
    title: "Basic",
    price: "Free",
    period: "",
    features: ["Browse available job listings", "Save jobs for later review"],
    buttonText: "Select Basic",
  },
  {
    title: "Pro",
    price: "$4.99",
    period: "/mo",
    features: [
      "Enhanced profile visibility for more opportunities",
      "Access and apply to job listings not available to free users",
      "Priority support from our team",
      "Exclusive tools to manage jobs more efficiently",
    ],
    buttonText: "Select Pro",
  },
  {
    title: "Pro Annual",
    price: "$49.99",
    period: "/yr",
    features: [
      "Enhanced profile visibility for more opportunities",
      "Access and apply to job listings not available to free users",
      "Priority support from our team",
      "Exclusive tools to manage jobs more efficiently",
      "Save money with an annual subscription",
    ],
    buttonText: "Select Pro Annual",
  },
];

const PricingPage = () => {
  const { currentUser, isProUser } = useAuth();
  // Determine the selected plan based on the user's subscription status
  const selectedPlanTitle = currentUser ? (isProUser ? "Pro" : "Basic") : ""; 

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`bg-white border ${
                plan.title === selectedPlanTitle
                  ? "scale-105 shadow-lg border-blue-500"
                  : "border-blue-200 shadow-md"
              } rounded-lg p-8 flex flex-col relative transition transform duration-300`}
            >
              {plan.title === "Pro" && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
                  Best Seller
                </div>
              )}
              <h2 className="text-2xl font-medium mb-4">
                {plan.title}
              </h2>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">
                  {plan.price}
                </span>
                <span className="text-xl">{plan.period}</span>
              </div>
              <ul className="mb-6 space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  plan.title === selectedPlanTitle
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-700 opacity-50 cursor-not-allowed"
                }`}
                disabled={plan.title !== selectedPlanTitle} // Disable button if not selected
              >
                {plan.title === selectedPlanTitle
                  ? "Selected Plan"
                  : plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
