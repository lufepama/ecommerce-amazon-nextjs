import { putOrder, getOrder } from '../../../helper/database/order'

export default async function handler(req, res) {

    if (req.method == 'POST') {

        const body = JSON.parse(req.body)
        const response = await putOrder(body)

        const { success, error, order } = response

        if (success) {
            const userEmail = body.email
            const resGet = await getOrder(userEmail)
            const { success, data } = resGet

            if (success) {
                return res.status(201).send({ success: success, data: data[0].productList })
            }

            return res.status(201).send({ success: success, order: order })

        }
        return res.status(403).send({ error: error })
    }

    return res.status(404).json({ error: 'Ha habido un problema' })
}