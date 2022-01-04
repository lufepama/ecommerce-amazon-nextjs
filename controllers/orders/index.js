export const getOrderController = async (user) => {

    try {

        const resGet = await fetch(`http://localhost:3000/api/orders/getOrder/${user.email}`, {
            method: 'GET',
        })

        const responseGet = await resGet.json()
        const { error, success } = responseGet

        if (success) {
            return { success: success, order: responseGet.data[0].productList, error: null }
        }
        return { error: error }

    } catch (error) {
        console.log(error)
    }
}



export const putOrderController = async (user) => {

    try {

        const resPost = await fetch('http://localhost:3000/api/orders/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-javascript'
            },
            body: JSON.stringify(user)
        })
        const response = await resPost.json()

        return { success: response.success, data: response.data }

    } catch (error) {
        console.log(error)
    }

}

export const putCompleteOrderController = async (user) => {
    try {
        const resPUT = await fetch('http://localhost:3000/api/checkout/putCompleteOrder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-javascript'
            },
            body: JSON.stringify({ user })
        })
        return { success: resPUT.success }

    } catch (error) {
        console.log(error)
    }
}


export const addItemOrderController = async (email, product) => {

    try {
        const data = { email, product }

        const response = await fetch('http://localhost:3000/api/orders/addItemOrder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-javascript'
            },
            body: JSON.stringify(data)
        })

        return {
            response
        }

    } catch (error) {
        console.log(error)
    }

}

export const deleteItemOrderController = async (email, productId) => {

    try {

        const data = { email, productId }

        const response = await fetch('http://localhost:3000/api/orders/deleteItemOrder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-javascript'
            },
            body: JSON.stringify(data)
        })
        return {
            response
        }

    } catch (error) {
        console.log(error)
    }

}