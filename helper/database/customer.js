import { connectToDatabase } from '../../lib/mongodb'

export const isCustomerSaved = async (email) => {

    const { db } = await connectToDatabase()
    const query = await db.collection('customers').find({ email: email }).toArray()


    if (query.length !== 0) { return true }

    return false

}

export const putCustomer = async (userInfo) => {

    try {

        const { db } = await connectToDatabase();
        const query = await db.collection('customers').insertOne({
            name: userInfo.given_name,
            lastName: userInfo.family_name,
            email: userInfo.email,
            profileImg: userInfo.picture,
        })

        if (!query) return;

        return {
            success: 'Customer has been added succesfully'
        }

    } catch (err) {
        console.log(err)
    }

}