import { connectToDatabase } from '../../lib/mongodb'

export const putCustomer = async (userInfo) => {

    try {

        const { db } = await connectToDatabase();
        console.log('userinfo', userInfo)
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