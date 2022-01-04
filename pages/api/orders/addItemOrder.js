import { addItemOrder } from '../../../helper/database/order'

export default async function handler(req, res) {

    if (req.method == 'PUT') {

        const body = JSON.parse(req.body)

        const { email, product } = body
        const response = await addItemOrder(email, product)

        const { success, error } = response

        if (success) {
            return res.status(201).send({ success: success })
        }

        return res.status(403).send({ error: error })
    }

    return res.status(404).json({ error: 'Ha habido un problema' })
}
