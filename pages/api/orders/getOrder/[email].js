import { getOrder } from "../../../../helper/database/order"


export default async function handler(req, res) {

    if (req.method == 'GET') {

        const { email } = req.query

        const response = await getOrder(email)

        const { success, error, data } = response

        if (error) {
            return res.status(200).json({ error: error })
        }

        return res.status(200).json({ success: success, data: data })

    }

    return res.status(404).json({ error: 'Ha habido un problema' })
}