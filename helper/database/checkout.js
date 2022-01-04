import { connectToDatabase } from '../../lib/mongodb'



export const updateCompleteOrder = async (email) => {

    try {
        const { db } = await connectToDatabase();

        const query = await db.collection('orders').updateOne(
            {
                email: email,
                isCompleted: false,
            },
            { $set: { isCompleted: true } }
        )

        if (query) {
            return {
                success: 'Ahi te va...'
            }
        }

        return {
            error: 'Ha habido un problema...'
        }

    } catch (error) {
        console.log(error)
    }


}