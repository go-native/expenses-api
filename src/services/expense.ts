import { Expense } from "../models/types"
import AWS from 'aws-sdk'
import csv from "csvtojson";
import { BUCKET_NAME } from '../config/s3';
import moment from 'moment';
import * as json2CSV from 'json-2-csv';

const s3 = new AWS.S3()
export const getExpenses = async (year: string, month: string) => {
    return new Promise(async (resolve, reject) => {
        const stream = s3.getObject({
            Bucket: BUCKET_NAME,
            Key: `${year}/${month}.csv`,
        }).createReadStream()
        stream.on('error', (error) => reject(error))
        resolve(await csv().fromStream(stream))
    })
}

export const createExpense = async (expense: Expense) => {
    const year = moment(expense.createdAt).year();
    const month = moment(expense.createdAt).month() + 1;
    const exist = await s3.headObject({
        Bucket: BUCKET_NAME,
        Key: `${year}/${month}.csv`
    }).promise()
    .then(
        () => true,
        err => {
          if (err.code === 'NotFound') {
            return false;
          }
          throw err;
        }
      );
    if (!exist) {
        const csvData = await json2CSV.json2csvAsync([expense])
        if (csvData) {
            await s3.putObject({
                Bucket: BUCKET_NAME,
                Key: `${year}/${month}.csv`,
                Body: csvData as string,
                ContentType: 'text/csv'
            }).promise()
        }
    } else {

        let expenses = await csv().fromStream(s3.getObject({
            Bucket: BUCKET_NAME,
            Key: `${year}/${month}.csv`
        }).createReadStream())
        expenses.push(expense)
        const csvData = await json2CSV.json2csvAsync(expenses)
        if (csvData) {
            await s3.putObject({
                Bucket: BUCKET_NAME,
                Key: `${year}/${month}.csv`,
                Body: csvData as string,
                ContentType: 'text/csv'
            }).promise()
        }
    }
}