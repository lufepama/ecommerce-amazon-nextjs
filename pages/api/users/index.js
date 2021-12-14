import { putCustomer } from "../../../helper/database/customer"


export default async function handler(req, res) {

    if (req.method == 'POST') {
        const body = JSON.parse(req.body)
        console.log('body', body)
        const response = await putCustomer(body)
        res.status(200).send({ response })

    }

    res.status(200).json({ error: 'Ha habido un problema' })
}
