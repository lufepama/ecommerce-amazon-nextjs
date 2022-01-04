
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const calculateOrderAmount = (items) => {
    let subTotal = 0
    items.map(item => {
        subTotal += parseFloat(item.price)
    })
    return Math.round(subTotal * 100) / 100
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
            const { myCart } = JSON.parse(req.body);
            const subtotal = calculateOrderAmount(myCart)
            console.log('subtotal', subtotal)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: subtotal * 10,
                currency: 'eur',
                automatic_payment_methods: {
                    enabled: true
                }
            })
            return res.status(200).json({ sucess: 'Todo ha ido bien', clientSecret: paymentIntent.client_secret })

        } catch (error) {
            console.log(error)
        }
    }

    return res.status(500).json({})

}