import React, { useEffect, useState } from "react";

const Transactions = () => {
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [newIncome, setNewIncome] = useState({
        description: "",
        amount: "",
        category: "Income",
        date: new Date().toISOString().split("T")[0],
    });
    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        category: "Expenses",
        date: new Date().toISOString().split("T")[0],
    });

    const [editMode, setEditMode] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const savedIncomeTransactions = JSON.parse(localStorage.getItem("incomeTransactions")) || [];
        const savedExpenseTransactions = JSON.parse(localStorage.getItem("expenseTransactions")) || [];
        setIncomeTransactions(savedIncomeTransactions);
        setExpenseTransactions(savedExpenseTransactions);
    }, []);

    const handleAddIncome = (e) => {
        e.preventDefault();
        if (!newIncome.description || !newIncome.amount) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedIncome = {
            id: incomeTransactions.length + 1,
            ...newIncome,
            amount: parseFloat(newIncome.amount),
            date: new Date(selectedYear, selectedMonth, new Date().getDate()).toISOString().split("T")[0],
        };

        const updatedIncomeTransactions = [...incomeTransactions, updatedIncome];
        setIncomeTransactions(updatedIncomeTransactions);
        localStorage.setItem("incomeTransactions", JSON.stringify(updatedIncomeTransactions));
        setNewIncome({ description: "", amount: "", category: "Income", date: new Date().toISOString().split("T")[0] });
    };

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!newExpense.description || !newExpense.amount) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedExpense = {
            id: expenseTransactions.length + 1,
            ...newExpense,
            amount: parseFloat(newExpense.amount),
            date: new Date(selectedYear, selectedMonth, new Date().getDate()).toISOString().split("T")[0],
        };

        const updatedExpenseTransactions = [...expenseTransactions, updatedExpense];
        setExpenseTransactions(updatedExpenseTransactions);
        localStorage.setItem("expenseTransactions", JSON.stringify(updatedExpenseTransactions));
        setNewExpense({ description: "", amount: "", category: "Expenses", date: new Date().toISOString().split("T")[0] });
    };

    const handleDeleteTransaction = (id, type) => {
        if (type === "Income") {
            const updatedIncomeTransactions = incomeTransactions.filter(transaction => transaction.id !== id);
            setIncomeTransactions(updatedIncomeTransactions);
            localStorage.setItem("incomeTransactions", JSON.stringify(updatedIncomeTransactions));
        } else {
            const updatedExpenseTransactions = expenseTransactions.filter(transaction => transaction.id !== id);
            setExpenseTransactions(updatedExpenseTransactions);
            localStorage.setItem("expenseTransactions", JSON.stringify(updatedExpenseTransactions));
        }
    };

    const handleEditTransaction = (transaction) => {
        setCurrentTransaction(transaction);
        setEditMode(true);
        if (transaction.type === "Income") {
            setNewIncome({ description: transaction.description, amount: transaction.amount, category: transaction.category, date: transaction.date });
        } else {
            setNewExpense({ description: transaction.description, amount: transaction.amount, category: transaction.category, date: transaction.date });
        }
    };

    const handleUpdateTransaction = (e) => {
        e.preventDefault();
        if (editMode) {
            if (currentTransaction.type === "Income") {
                const updatedIncomeTransactions = incomeTransactions.map(transaction =>
                    transaction.id === currentTransaction.id ? { ...transaction, ...newIncome, date: new Date(selectedYear, selectedMonth, new Date().getDate()).toISOString().split("T")[0] } : transaction
                );
                setIncomeTransactions(updatedIncomeTransactions);
                localStorage.setItem("incomeTransactions", JSON.stringify(updatedIncomeTransactions));
            } else {
                const updatedExpenseTransactions = expenseTransactions.map(transaction =>
                    transaction.id === currentTransaction.id ? { ...transaction, ...newExpense, date: new Date(selectedYear, selectedMonth, new Date().getDate()).toISOString().split("T")[0] } : transaction
                );
                setExpenseTransactions(updatedExpenseTransactions);
                localStorage.setItem("expenseTransactions", JSON.stringify(updatedExpenseTransactions));
            }
            setEditMode(false);
            setCurrentTransaction(null);
            setNewIncome({ description: "", amount: "", category: "Income", date: new Date().toISOString().split("T")[0] });
            setNewExpense({ description: "", amount: "", category: "Expenses", date: new Date().toISOString().split("T")[0] });
        }
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const filteredIncomeTransactions = incomeTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === parseInt(selectedMonth) && transactionDate.getFullYear() === parseInt(selectedYear);
    });
    
    const filteredExpenseTransactions = expenseTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === parseInt(selectedMonth) && transactionDate.getFullYear() === parseInt(selectedYear);
    });

    return (
        <div className="min-h-screen bg-gray-100 py-10 transactions-background"> {/* Apply the background class here */}
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold mb-6">Transactions</h1>

                {/* Month and Year Selection */}
                <h2 className="text-lg font-semibold mb-2">Select Month and Year to Add and View Transactions:</h2>
                <div className="flex space-x-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Month:</label>
                        <select value={selectedMonth} onChange={handleMonthChange} className="p-2 border rounded-lg">
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Year:</label>
                        <input
                            type="number"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="p-2 border rounded-lg"
                            placeholder="Enter Year"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Add Income</h2>
                <form onSubmit={handleAddIncome} className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={newIncome.description}
                            onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newIncome.amount}
                            onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="date"
                            value={newIncome.date}
                            onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <select
                            value={newIncome.category}
                            onChange={(e) => setNewIncome({...newIncome, category: e.target.value})}
                            className="p-2 border rounded-lg"
                        >
                            <option value="Income">Income</option>
                            <option value="Salary">Salary</option>
                            <option value="Bonus">Bonus</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Add Income
                    </button>
                </form>

                <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
                <form onSubmit={handleAddExpense} className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="date"
                            value={newExpense.date}
                            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                            className="p-2 border rounded-lg"
                        >
                            <option value="Expenses">Expenses</option>
                            <option value="Food">Food</option>
                            <option value="Bills">Bills</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Add Expense
                    </button>
                </form>

                <h2 className="text-2xl font-semibold mb-4">Income Transactions</h2>
                <ul className="space-y-4 mb-6">
                    {filteredIncomeTransactions.map((transaction) => (
                        <li key={transaction.id} className="p-4 rounded-lg shadow-md bg-green-100 flex justify-between items-center">
                            <div>
                                <span className="font-bold">{transaction.description}</span>
                                <p className="text-sm text-gray-600">{transaction.category}</p>
                                <p className="text-sm text-gray-400">{transaction.date}</p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-lg font-semibold">${transaction.amount}</span>
                                <button onClick={() => handleEditTransaction(transaction)} className="ml-4 text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDeleteTransaction(transaction.id, "Income")} className="ml-2 text-red-500 hover:underline">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Expense Transactions</h2>
                <ul className="space-y-4 mb-6">
                    {filteredExpenseTransactions.map((transaction) => (
                        <li key={transaction.id} className="p-4 rounded-lg shadow-md bg-red-200 flex justify-between items-center">
                            <div>
                                <span className="font-bold">{transaction.description}</span>
                                <p className="text-sm text-gray-600">{transaction.category}</p>
                                <p className="text-sm text-gray-400">{transaction.date}</p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-lg font-semibold">${transaction.amount}</span>
                                <button onClick={() => handleEditTransaction(transaction)} className="ml-4 text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDeleteTransaction(transaction.id, "Expense")} className="ml-2 text-red-500 hover:underline">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

                {editMode && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
                            <form onSubmit={handleUpdateTransaction}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={currentTransaction.type === "Income" ? newIncome.description : newExpense.description}
                                        onChange={(e) => currentTransaction.type === "Income" ? setNewIncome({...newIncome, description: e.target.value}) : setNewExpense({...newExpense, description: e.target.value})}
                                        className="p-2 border rounded-lg"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={currentTransaction.type === "Income" ? newIncome.amount : newExpense.amount}
                                        onChange={(e) => currentTransaction.type === "Income" ? setNewIncome({...newIncome, amount: e.target.value}) : setNewExpense({...newExpense, amount: e.target.value})}
                                        className="p-2 border rounded-lg"
                                    />
                                    <input
                                        type="date"
                                        value={currentTransaction.type === "Income" ? newIncome.date : newExpense.date}
                                        onChange={(e) => currentTransaction.type === "Income" ? setNewIncome({...newIncome, date: e.target.value}) : setNewExpense({...newExpense, date: e.target.value})}
                                        className="p-2 border rounded-lg"
                                    />
                                    <select
                                        value={currentTransaction.type === "Income" ? newIncome.category : newExpense.category}
                                        onChange={(e) => currentTransaction.type === "Income" ? setNewIncome({...newIncome, category: e.target.value}) : setNewExpense({...newExpense, category: e.target.value})}
                                        className="p-2 border rounded-lg"
                                    >
                                        {currentTransaction.type === "Income" ? (
                                            <>
                                                <option value="Income">Income</option>
                                                <option value="Salary">Salary</option>
                                                <option value="Bonus">Bonus</option>
                                                <option value="Other">Other</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Expenses">Expenses</option>
                                                <option value="Food">Food</option>
                                                <option value="Bills">Bills</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Other">Other</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;