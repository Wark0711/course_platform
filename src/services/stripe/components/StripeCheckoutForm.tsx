'use client'

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { getClientSessionSecret } from "../actions/stripe";
import { stripeClientPromise } from "../stripeClient";

export function StripeCheckoutForm({ product, user }:
    {
        product: {
            priceInDollars: number
            name: string
            id: string
            imageUrl: string
            description: string
        },
        user: {
            email: string
            id: string
        }
    }) {
    return (
        <EmbeddedCheckoutProvider stripe={stripeClientPromise} options={{fetchClientSecret: getClientSessionSecret.bind(null, product, user)}}>
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    )
}