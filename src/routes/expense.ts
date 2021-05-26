import express from 'express'
import { createExpense, getExpenses } from '../controllers/expense';
const router = express.Router();

router.get("/:year/:month", getExpenses)
router.post("/", createExpense)

export default router

