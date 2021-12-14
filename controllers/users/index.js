
export const putCustomerController = async (userInfo) => {

    const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-javascript'
        },
        body: JSON.stringify(userInfo)
    })
}