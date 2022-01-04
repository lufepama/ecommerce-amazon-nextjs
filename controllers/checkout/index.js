
export const putCreateCheckoutController = async (myCart) => {

    try {
        console.log('myCart', myCart)
        const response = await fetch('http://localhost:3000/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-javascript'
            },
            body: JSON.stringify({ myCart })
        })

        return {
            response
        }
    } catch (error) {
        console.log(error)
    }


}