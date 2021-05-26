import AWS from 'aws-sdk'
import csv from "csvtojson";
import { BUCKET_NAME } from '../config/s3';
const s3 = new AWS.S3()


export const getCategories = async () => {
    const getObjectParam = {
        Bucket: BUCKET_NAME,
        Key: "categories.csv",
    }
    return await csv().fromStream(s3.getObject(getObjectParam).createReadStream())
}

export const createCategory = () => {

}