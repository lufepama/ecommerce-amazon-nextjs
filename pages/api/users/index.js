import { putCustomer } from "../../../helper/database/customer"
import { isCustomerSaved } from "../../../helper/database/customer"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        const body = JSON.parse(req.body)
        console.log('bodye', body)
        const isAlreadyCustomer = await isCustomerSaved(body.email)
        if (!isAlreadyCustomer) {

            const response = await putCustomer(body)
            res.status(200).send({ response })
        }

        return res.status(200).send({ success: 'El usuario ya esta registrado... puedes continuar' })

    }

    res.status(200).json({ error: 'Ha habido un problema' })
}