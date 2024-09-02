import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../provider/AuthProvider";

const ChackOutFrom = ({ donation }) => {
    const { user } = useContext(AuthContext)
    console.log(donation);


    const stripe = useStripe()
    const elements = useElements()
    const axiosPublic = useAxios()
    const [amount, setAmount] = useState('')
    const [clientSecret, setClientSecret] = useState("")
    useEffect(() => {
        if (amount && parseFloat(amount) >= 0.5) { // Ensure minimum amount is met
            const amountInCents = Math.round(parseFloat(amount) * 100); // Convert to cents
            axiosPublic.post('/create-payment-intent', { price: amountInCents })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Error creating payment intent:", err);
                    setErrorMessage("Failed to initiate payment. Please try again.");
                });
        }
    }, [amount, axiosPublic]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        })
        if (error) {
            console.log('payment error', error);

        }
        if (paymentMethod) {
            console.log('payment error', paymentMethod);

        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');

        } else {
            console.log('payment intent', paymentIntent);

        }
        if (paymentIntent && paymentIntent.status === 'succeeded') {
            axiosPublic.post(`/update/donation/${donation._id}`, { amount: parseFloat(amount) })
                .then(res => {
                    // console.log(res.data);

                })
            const donater_name = user.name;
            const donater_email = user.email;
            const get_donater_email = donation.email
            const data = { donater_name, donater_email, amount, get_donater_email }
            axiosPublic.post('/how/donated', data)
                .then(res => {
                    console.log(res.data);

                })
        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setAmount(e.target.value)} className="input input-bordered" required />
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-center">
                    <button className="btn btn-primary items-center w-36 my-8" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChackOutFrom;