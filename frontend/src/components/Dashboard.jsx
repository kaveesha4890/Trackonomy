import React, { useState, useEffect } from "react";
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
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [savings, setSavings] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState("All Months");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchTransactions = () => {
            const savedIncomeTransactions = JSON.parse(localStorage.getItem("incomeTransactions")) || [];
            const savedExpenseTransactions = JSON.parse(localStorage.getItem("expenseTransactions")) || [];
        
            setIncomeTransactions(savedIncomeTransactions);
            setExpenseTransactions(savedExpenseTransactions);
            calculateTotals(savedIncomeTransactions, savedExpenseTransactions);
        };

        fetchTransactions();

        // Listen for storage changes
        const handleStorageChange = () => {
            fetchTransactions();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [selectedMonth, selectedYear]);

    const calculateTotals = (incomeData, expenseData) => {
        let income = 0;
        let expenses = 0;

        if (selectedMonth === "All Months") {
            income = incomeData.reduce((acc, transaction) => acc + transaction.amount, 0);
            expenses = expenseData.reduce((acc, transaction) => acc + transaction.amount, 0);
        } else {
            const monthIndex = parseInt(selectedMonth);
            income = incomeData.reduce((acc, transaction) => {
                const transactionDate = new Date(transaction.date);
                return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === selectedYear
                    ? acc + transaction.amount
                    : acc;
            }, 0);
            expenses = expenseData.reduce((acc, transaction) => {
                const transactionDate = new Date(transaction.date);
                return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === selectedYear
                    ? acc + transaction.amount
                    : acc;
            }, 0);
        }

        const savings = income - expenses;
        
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setSavings(savings);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const chartData = {
        labels: ["Income", "Expenses", "Savings"],
        datasets: [
            {
                label: "Amount",
                data: [totalIncome, totalExpenses, savings],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen dashboard-background"> {/* Apply the background class here */}
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Year Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Year:</label>
                <input
                    type="number"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="p-2 border rounded-lg"
                    placeholder="Enter Year"
                />
            </div>

            {/* Month Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Month:</label>
                <select value={selectedMonth} onChange={handleMonthChange} className="p-2 border rounded-lg">
                    <option value="All Months">All Months</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Income</h2>
                    <p className="text-2xl font-semibold">${totalIncome}</p>
                </div>
                <div className="bg-red-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Expenses</h2>
                    <p className="text-2xl font-semibold">${totalExpenses}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Savings</h2>
                    <p className="text-2xl font-semibold">${savings}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="p-6 rounded shadow mb-8"> {/* Removed bg-white class */}
                <h2 className="text-xl font-bold mb-4 text-left">Financial Overview</h2> {/* Left-aligned title */}
                <div className="flex justify-center"> {/* Center the chart */}
                    <div style={{ width: '800px', height: '600px' }}> {/* Increased chart size */}
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false, // Allow the chart to resize based on container
                                plugins: {
                                    legend: {
                                        position: 'top', // Legend at the top
                                        labels: {
                                            font: {
                                                size: 14, // Slightly larger legend font
                                            },
                                            color: '#4A5568', // Default legend text color
                                            generateLabels: (chart) => {
                                                const datasetColors = ["#4caf50", "#f44336", "#2196f3"]; // Income, Expenses, Savings
                                                return chart.data.labels.map((label, i) => ({
                                                    text: label,
                                                    fillStyle: datasetColors[i],
                                                    fontColor: datasetColors[i], // Match label text color to dataset color
                                                }));
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            font: {
                                                size: 16, // Make x-axis labels larger
                                            },
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            font: {
                                                size: 16, // Make y-axis labels larger
                                            },
                                            beginAtZero: true, // Ensure y-axis starts at 0
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="p-6 rounded shadow"> {/* Removed bg-white class */}
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <ul className="divide-y divide-gray-200">
                    {[...incomeTransactions, ...expenseTransactions].filter(transaction => {
                        const transactionDate = new Date(transaction.date);
                        if (selectedMonth === "All Months") {
                            return transactionDate.getFullYear() === selectedYear;
                        }
                        return transactionDate.getMonth() === parseInt(selectedMonth) && transactionDate.getFullYear() === parseInt(selectedYear);
                    }).map((transaction) => (
                        <li
                            key={transaction.id}
                            className="py-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{transaction.description}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                <p className="text-sm text-gray-500">Category: {transaction.category}</p>
                            </div>
                            <p className={`text-lg font-semibold ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}>
                                {transaction.type === "Income" ? "+" : "-"}${Math.abs(transaction.amount)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;