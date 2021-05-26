import {
    StatusCodes
} from 'http-status-codes';
import { Request, Response } from 'express';
import AWS from 'aws-sdk'
import * as categoryService from '../services/category';

export const getCategories = async (req: Request, res: Response) => {
    const categories = await categoryService.getCategories()
    res.status(StatusCodes.OK).send(categories)
}