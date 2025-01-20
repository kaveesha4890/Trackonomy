import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-6">Welcome to Trackonomy!</h1>
            <p className="mb-8 text-lg">
                Manage your finances with ease. Track your income, expenses, and set budgets to achieve your financial goals.
            </p>
            <div className="flex gap-6">
                <Link 
                    to="/dashboard" 
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
                    >
                        Go to Dashboard
                </Link>
                <Link 
                    to="/transactions" 
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
                    >
                        View Transactions
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Home;