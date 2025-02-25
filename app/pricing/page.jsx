"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/context/authContext/auth";
import { toast } from "sonner";

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
    price: "£4.99",
    period: "/mo",
    features: [
      "Enhanced profile visibility for more opportunities",
      "Access and apply to job listings",
      "Priority support from our team",
      "Exclusive tools to manage your jobs",
    ],
    buttonText: "Select Pro",
  },
  {
    title: "Pro Annual",
    price: "£49.99",
    period: "/yr",
    features: [
      "Enhanced profile visibility for more opportunities",
      "Access and apply to job listings",
      "Priority support from our team",
      "Exclusive tools to manage jobs more efficiently",
      "Save money with an annual subscription",
    ],
    buttonText: "Select Pro Annual",
  },
];

const PricingPage = () => {
  const { currentUser, isProUser, planType, updateProStatus } = useAuth();

  const getCurrentPlanTitle = (isProUser, planType) => {
    if (!isProUser) return "Basic";
    return planType === "annual" ? "Pro Annual" : "Pro";
  };

  const selectedPlanTitle = currentUser
    ? getCurrentPlanTitle(isProUser, planType)
    : "";

  const handlePlanSelect = async (planTitle) => {
    if (!currentUser) {
      toast.error("Please login to select a plan");
      return;
    }

    try {
      if (planTitle === "Pro") {
        const success = await updateProStatus(currentUser.uid, "monthly");
        if (success) {
          toast.success(
            `Successfully ${
              isProUser ? "switched to" : "upgraded to"
            } Pro Monthly!`
          );
        }
      } else if (planTitle === "Pro Annual") {
        const success = await updateProStatus(currentUser.uid, "annual");
        if (success) {
          toast.success(
            `Successfully ${
              isProUser ? "switched to" : "upgraded to"
            } Pro Annual!`
          );
        }
      } else if (planTitle === "Basic" && isProUser) {
        const success = await updateProStatus(currentUser.uid);
        if (success) {
          toast.success("Successfully downgraded to Basic plan");
        }
      }
    } catch (error) {
      toast.error("Failed to update plan");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-12">Pricing</h1>
        <div className="grid gap-14 grid-cols-1 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`bg-white border ${
                plan.title === selectedPlanTitle
                  ? "lg:scale-110 shadow-lg"
                  : "border-blue-200 shadow-md"
              } rounded-lg p-6 flex flex-col relative transition transform duration-300`}
            >
              {plan.title === "Pro" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 text-xs font-bold uppercase rounded-tr-md rounded-bl-lg">
                  Best Seller
                </div>
              )}
              {plan.title === "Pro Annual" && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-2 text-xs font-bold uppercase rounded-tr-md rounded-bl-lg">
                  Best Value
                </div>
              )}
              <h2 className="text-2xl font-medium mb-1">{plan.title}</h2>
              <div className="mb-8">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-xl">{plan.period}</span>
              </div>
              <ul className="mb-6 space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect(plan.title)}
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  plan.title === selectedPlanTitle
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {plan.title === selectedPlanTitle
                  ? "Current Plan"
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
