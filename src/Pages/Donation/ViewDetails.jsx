import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Elements } from "@stripe/react-stripe-js";
import ChackOutFrom from "./ChackOutFrom";
import { loadStripe } from "@stripe/stripe-js"
import useDonation from "../../Hooks/useDonation";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_Pk)

const ViewDetails = () => {
    const [donation, setDonation] = useState();
    const { donations } = useDonation();

    const { id } = useParams();
    const axiosPublic = useAxios();

    useEffect(() => {
        axiosPublic.get(`/donation/${id}`)
            .then(res => setDonation(res.data))
            .catch(error => console.error("Failed to fetch donation details:", error));
    }, [id, axiosPublic]);

    const racomand = donations.filter(item => item.campaign_type === 'recommended')
    console.log(racomand);


    if (!donation) {
        return <div>Loading...</div>;
    }

    const { name, image, donatedAmount, maxDonation, description } = donation;

    return (
        <div>
            <div className="mx-16 my-20">
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src={image}
                            className="h-96"
                            alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p>Max-Donation: {maxDonation}</p>
                        <p>Donation: {donatedAmount}</p>
                        <p>Description: {description}</p>
                        <div className="card-actions justify-end">
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Donated Now</button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Amount</span>
                                        </label>
                                        <div>
                                            <Elements stripe={stripePromise}>
                                                <ChackOutFrom donation={donation}></ChackOutFrom>
                                            </Elements>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl text-center font-extrabold my-10">Recommended Donation </h1>
                <div className="grid grid-cols-3 gap-5">
                    {
                        racomand.map(rec =>
                            <div className="card bg-base-100 w-96 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={rec.image}
                                        alt="Shoes"
                                        className="h-96 rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{rec.name}</h2>
                                    <p>MaxDonation : {rec.maxDonation}</p>
                                    <p>DonationAmount : {rec.donatedAmount}</p>
                                    <div className="card-actions">
                                        <Link to={`/view/details/${rec._id}`}> <button className="btn btn-primary">View Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
