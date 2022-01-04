import { updateCompleteOrder } from '../../../helper/database/checkout'

export default async function handler(req, res) {

    if (req.method === 'PUT') {
        try {
            const { user } = JSON.parse(req.body);
            const response = await updateCompleteOrder(user.email)

            const { success, error } = response

            if (success) {
                return res.status(200).json({ sucess: 'Todo ha ido bien', success: response })
            }

            return res.status(200).json({ error: 'Ha habido un problema' })

        } catch (error) {
            console.log(error)
        }
    }

    return res.status(500).json({})

}