
export const getProductsController = async () => {

    const res = await fetch('http://localhost:3000/api/products', { method: 'GET' })

    const response = await res.json()

    return response.response

}