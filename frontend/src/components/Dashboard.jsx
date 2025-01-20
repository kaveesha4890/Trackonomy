import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const income = 5000;
    const expenses = 3000;
    const savings = 2000;

    const recentTransactions = [
        { id: 1, description: "Salary", amount: 4000, type: "Income", date: "2025-01-01" },
        { id: 2, description: "Groceries", amount: -200, type: "Expense", date: "2025-01-02" },
        { id: 3, description: "Utilities", amount: -150, type: "Expense", date: "2025-01-03" },
    ];

    const chartData = {
        labels: ["Income", "Expenses", "Savings"],
        datasets: [
            {
                label: "Amount",
                data: [income, expenses, savings],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Income</h2>
                    <p className="text-2xl font-semibold">${income}</p>
                </div>
                <div className="bg-red-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Expenses</h2>
                    <p className="text-2xl font-semibold">${expenses}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Savings</h2>
                    <p className="text-2xl font-semibold">${savings}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
                <Bar data={chartData} />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <ul className="divide-y divide-gray-200">
                    {recentTransactions.map((transaction) => (
                        <li
                            key={transaction.id}
                            className="py-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{transaction.description}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>
                            <p
                                className={`text-lg font-semibold ${
                                    transaction.type === "Income"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {transaction.type === "Income" ? "+" : "-"}${Math.abs(
                                    transaction.amount
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 flex gap-4 justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700">
                    Add Income
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700">
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
