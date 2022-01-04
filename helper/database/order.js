import { connectToDatabase } from '../../lib/mongodb'

export const getOrder = async (email) => {

    try {
        const { db } = await connectToDatabase();
        const order = await db.collection('orders').find({ email: email, isCompleted: false }).toArray()

        if (order.length === 0) { return { error: 'Ha habido un problema...' } }

        return {
            success: 'Ahi lo tienes',
            data: order
        }
    } catch (error) {
        console.log(error)
    }
}

export const putOrder = async (user) => {

    try {

        const { db } = await connectToDatabase();
        const query = await db.collection('orders').insertOne({
            name: user.given_name,
            lastName: user.family_name,
            email: user.email,
            createdAt: new Date(),
            productList: [],
            isCompleted: false
        })

        if (!query) return {
            error: 'There is a problem with the order...'
        };

        return {
            success: 'Order has been added succesfully',
            order: query
        }

    } catch (err) {
        console.log(err)
    }
}

export const addItemOrder = async (email, product) => {

    try {
        // const product = { name: 'pruebdas', description: 'descriptioon', imagen: './images/tv.png', quantity: 2 }
        const { db } = await connectToDatabase();

        const query = await db.collection('orders').updateOne(
            {
                email: email,
                isCompleted: false
            },

            { $addToSet: { productList: product } }
        )
        console.log('query', query)
        return {
            success: 'Ahi te va...'
        }

    } catch (error) {
        console.log(error)
    }

}

export const deleteItemOrder = async (email, productId) => {
    try {

        const { db } = await connectToDatabase();
        const query = await db.collection('orders').updateOne(
            { email: email, isCompleted: false },
            { $pull: { productList: { _id: productId } } }
        )

        if (!query) return {
            error: 'There is a problem with the order...'
        };

        return {
            success: 'Order has been added succesfully',
            order: query
        }

    } catch (err) {
        console.log(err)
    }
}