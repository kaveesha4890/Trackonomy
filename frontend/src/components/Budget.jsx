import React, { useState } from "react";

const Budget = () => {
    const [budget, setBudget] = useState(2000);
    const [spent, setSpent] = useState(500);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Budget</h1>
            <div className="bg-blue-100 p-4 rounded shadow">
                <h2 className="text-lg font-bold">Monthly Budget</h2>
                <p className="text-xl">${budget}</p>
                <p className="text-sm text-gray-700">Spent: ${spent}</p>
            </div>
        </div>
    );
};

export default Budget;