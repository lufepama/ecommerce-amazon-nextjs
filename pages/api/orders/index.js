import { putCustomer } from "../../../helper/database/customer"
import { isCustomerSaved } from "../../../helper/database/customer"

export default async function handler(req, res) {

    if (req.method == 'PUT') {
        const body = JSON.parse(req.body)
        const isAlreadyCustomer = await isCustomerSaved(body.email)

        if (!isAlreadyCustomer) {
            const response = await putCustomer(body)
            res.status(200).send({ response })
        }

        return res.status(200).send({ success: 'El usuario ya esta registrado... puedes continuar' })

    }

    return res.status(200).json({ error: 'Ha habido un problema' })
}
