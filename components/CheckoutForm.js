import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import styles from '../styles.module.css'
import { useCheckout } from "../hooks/useCheckout";
import { useAuth0 } from "@auth0/auth0-react";
import { useOrder } from "../hooks/useOrder";

export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth0()
    const { setCompletedOrder, createOrder } = useOrder()
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { deleteMyCartandLocalStorage, updateSuccessMessage } = useCheckout()

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'

            // confirmParams: {
            //     // Make sure to change this to your payment completion page
            //     return_url: "http://localhost:3000",
            // },
        });

        if (!error) {
            deleteMyCartandLocalStorage()
            updateSuccessMessage(true)
            setIsLoading(false)
            createOrder(user)
            setCompletedOrder(user)
            return;
        }


        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }
        setIsLoading(false);
    };

    return (
        <div>
            <form className={styles.paymentForm} id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement className={styles.paymentElement} id="payment-element" />
                <button className={styles.submitBtn} disabled={isLoading || !stripe || !elements} id="submit-btn">
                    <span id="button-text">
                        {isLoading ? <div className={styles.spinner} id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div className={styles.paymentMessage} id="payment-message">{message}</div>}
            </form>
        </div>

    );
}