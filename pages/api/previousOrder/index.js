import { getPreviousOrder } from "../../../helper/database/previousOrder"

export default async function handler(req, res) {

    if (req.method == 'GET') {

        const { email } = req.query

        const previousOrder = await getPreviousOrder(email)

        res.status(200).send({ response: previousOrder })

    }

    res.status(400).send({ error: 'Ha habido un error...' })
}