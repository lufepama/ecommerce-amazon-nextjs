import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb';

export const getProducts = async () => {

    try {
        const { db } = await connectToDatabase();

        const products = await db
            .collection('products')
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        return products

    }
    catch (err) {
        console.log(err)
    }
}

export const getDetailProduct = async (id) => {

    try {
        const { db } = await connectToDatabase();
        const product_id = new ObjectId(id)
        const product = await db.collection('products').find({ _id: product_id }).toArray()

        return product

    } catch (err) {
        console.log(err)
    }

}