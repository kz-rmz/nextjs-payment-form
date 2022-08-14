import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../middleware/mongodb";

export default async function addPayment(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Только POST метод для этого API запроса!' })
        return
    }
    const newPaymentFormData = req.body;
    const { db } = await connectToDatabase();
    // @ts-ignore
    const collection = db.collection('payment_info');
    collection.insertOne(newPaymentFormData);
    return res.status(200).end('Success!');
  }
