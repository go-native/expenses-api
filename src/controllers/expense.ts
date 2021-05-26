import { Request, Response } from 'express';
import {
    StatusCodes
} from 'http-status-codes';
import { Expense } from '../models/types';
import moment from 'moment';
import * as expenseService from '../services/expense';

export const getExpenses = async (req: Request, res: Response) => {
    const year = req.params["year"]
    const month = req.params["month"]
    try {
        const expenses = await expenseService.getExpenses(year, month)
        res.status(StatusCodes.OK).send(expenses)
    } catch(er) {
        if (er.code = 'NoSuchKey') {
            res.status(StatusCodes.NOT_FOUND).send()
        }
    }
}

export const createExpense = async (req: Request, res: Response) => {
    const expense = req.body as Expense
    expense.createdAt = moment().toISOString()
    await expenseService.createExpense(expense)
    res.status(StatusCodes.CREATED).send(expense)
}