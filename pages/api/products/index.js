import { getProducts } from "../../../helper/database/product"

export default async function handler(req, res) {

    const response = await getProducts()

    res.status(200).json({ response })
}
