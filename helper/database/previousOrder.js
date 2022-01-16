import { connectToDatabase } from "../../lib/mongodb"

export const getPreviousOrder = async (email) => {

    try {

        const { db } = await connectToDatabase();
        const previousOrder = await db.collection('orders').find({ email: email, isCompleted: true }).toArray()

        return {
            success: 'Ahi te va...',
            order: previousOrder
        }

    } catch (error) {

    }

}