const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
    {
        description: {
            type:  String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
    }
);

module.exports = mongoose.model("Income",  incomeSchema);