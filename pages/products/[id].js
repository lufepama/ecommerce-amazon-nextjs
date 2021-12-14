
export const getStaticPaths = async () => {

    const response = await fetch('http://localhost:3000/api/products/')
    const data = await response.json()


    const paths = data.response.map(product => {
        return {
            params: { id: product._id }
        }
    })

    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async (context) => {

    const productId = context.params.id

    const res = await fetch('http://localhost:3000/api/products/' + productId)
    const data = await res.json()

    const { response } = data

    return {
        props: {
            product: response[0],
            productId
        }
    }

}

const detailProduct = ({ product, productId }) => {

    return (
        <div>
            <h1>Detail</h1>
            <h1>{productId}</h1>

            <h1>{product.name}</h1>
        </div>
    )
}

export default detailProduct
