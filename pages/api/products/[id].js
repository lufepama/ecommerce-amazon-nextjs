
import { getDetailProduct } from '../../../helper/database/product'

export default async function handler(req, res) {

  const { id } = req.query
  console.log('id', id)
  const detailProduct = await getDetailProduct(id)


  res.status(200).json({ response: detailProduct })
}
