
export const saveTokenLocalStorage = (tokenToSave) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', tokenToSave)
    }
}

export const deleteTokenLocalStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
    }
}

export const saveInitialCartLocalStorage = (myCart) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(myCart))
    }
}

export const saveItemLocalStorage = (product) => {

    if (typeof window !== 'undefined') {

        const cart = localStorage.getItem('cart')

        let existing = cart ? JSON.parse(cart) : []

        existing.push(product)
        localStorage.setItem('cart', JSON.stringify(existing))
    }
}

export const deleteItemLocalStorage = (productIdToDelete) => {
    if (typeof window != 'undefined') {
        const cart = localStorage.getItem('cart')
        let existing = cart ? JSON.parse(cart) : []

        const newCartList = existing.filter(item => item._id != productIdToDelete)
        localStorage.setItem('cart', JSON.stringify(newCartList))

    }
}

export const resetCartLocalStorage = () => {
    if (typeof window != 'undefined') {
        localStorage.setItem('cart', JSON.stringify([]))
    }
}

export const getCartLocalStorage = () => {

    if (typeof window !== 'undefined') {
        const query = localStorage.getItem('cart')

        return query ? JSON.parse(query) : []

    }

}