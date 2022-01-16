
export const getPreviousOrderController = async (email) => {

    try {
        const res = await fetch(`http://localhost:3000/api/previousOrder/${email}`, { method: 'GET' })

        const response = await res.json()

        return { previousOrder: response.response.order }

    } catch (error) {
        console.log(error)
    }

}