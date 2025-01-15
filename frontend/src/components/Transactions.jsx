import React, { useState } from "react";

const Transactions = () => {
    const [transactions, setTransactions] = useState([
        {
            id: 1, description: "Grocery", amount: -50, category: "Food", date: "2025-01-05"
        },
        {
            id: 2, description: "Salary", amount: 1000, category: "Income", date: "2025-01-04"
        },
        {
            id: 3, description: "Utilities", amount: -100, category: "Bill", date: "2025-01-03"
        },
    ]);

    const [filter, setFilter] = useState("All");
    const [sortOption, setSortOption] = useState("date");
    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        description: "",
        amount: "",
        category: "",
    });

    //add new transaction
    const handleAddTransaction = () => {
        const updatedTransaction = {
            ...newTransaction,
            id: transactions.length + 1,
            date: new Date().toISOString().split("T")[0],
        };
        setTransactions([...transactions, updatedTransaction]);
        setNewTransaction({ description: "", amount: "", category: "",});
        setShowModal(false);
    };

    //Filter transactions
    const filteredTransactions = 
    filter === "All"
        ? transactions
        : transactions.filter((transaction) => transaction.category === filter);
    
    //Sort transactions
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortOption === "amount") {
            return b.amount - a.amount;
        }
        if (sortOption === "date") {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>

            {/* Filter and Sort Options */}
            <div className="flex justify-between items-center mb-6">
                <select
                    className="p-2 rounded-lg border"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Income">Income</option>
                    <option value="Bills">Bills</option>
                </select>
                <select
                    className="p-2 rounded-lg border"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                </select>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Add Transaction
                </button>
            </div>

            {/*Transaction List*/}
            <ul className="space-y-4">
                {sortedTransactions.map((transaction) => (
                    <li
                    key={transaction.id}
                    className={`p-4 rounded-lg shadow-md ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                    }`}
                    >
                        <div className="flex justify-between">
                            <div>
                                <span className="font-bold">{transaction.description}</span>
                                <p className="text-sm text-gray-600">{transaction.category}</p>
                                <p className="text-sm text-gray-400">{transaction.date}</p>
                            </div>
                                <span className="text-lg font-semibold">${transaction.amount}</span>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Add Transaction Modal */}
            {showModal && (
                <div className="fixed insert-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Description"
                                value={newTransaction.description}
                                onChange={(e) => 
                                    setNewTransaction({
                                        ...newTransaction,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={newTransaction.amount}
                                onChange={(e) => 
                                    setNewTransaction({
                                        ...newTransaction,
                                        amount: parseFloat (e.target.value),
                                    })
                                }
                                className="w-full p-2 border rounded-lg"
                            />
                            <select
                                value={newTransaction.category}
                                onChange={(e) =>
                                    setNewTransaction({
                                        ...newTransaction,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="">Select Categories</option>
                                <option value="Food">Food</option>
                                <option value="Income">Income</option>
                                <option value="Bills">Bills</option>
                            </select>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 mr-2 bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTransaction}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Add
                            </button>
                        </div>
                        </div>
                        </div>
            )}
        </div>
        </div>
    );
};

export default Transactions;