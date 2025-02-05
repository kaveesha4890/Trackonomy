const express = require("express");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/income",auth,async(req,res)=>{
    const {description, amount, category} = req.body;

    if(!description || !amount  || !category){
        return res.status(400).json({msg:"All fields are required for income"});
    }
    try{
        const income = new Income({
            description,
            amount,
            category,
            userId:  req.user.id,
        });

        await income.save();
        res.status(201).json(income);
    }catch(err){
        console.error(err);
        res.status(500).json({msg:"Server error"});
    }
});

router.post("/expense",auth,async(req,res)=>{
    const {description, amount, category} = req.body;

    if(!description || !amount  || !category){
        return res.status(400).json({msg:"All fields are required for income"});
    }
    try{
        const expense = new Expense({
            description,
            amount,
            category,
            userId:  req.user.id,
        });

        await expense.save();
        res.status(201).json(expense);
    }catch(err){
        console.error(err);
        res.status(500).json({msg:"Server error"});
    }
    
});
router.get("/income", auth, async (req, res) => {
    try {
        const income = await Income.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


router.get("/expense", auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;