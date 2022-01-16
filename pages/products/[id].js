
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

const Index = ({ product }) => {


    return (
        <div>
            <h1>{product.name}</h1>
        </div>
    )
}


export const getStaticProps = async (context) => {

    const productId = context.params.id

    const res = await fetch(`http://localhost:3000/api/products/${productId}`)
    const data = await res.json()

    const { response } = data

    return {
        props: {
            product: response[0],
            productId
        }
    }
}


export default Index
