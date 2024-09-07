import { useInView } from "react-intersection-observer";
import useDonation from "../../Hooks/useDonation";
import { Link } from "react-router-dom";

const Donation = () => {
    const { donations} = useDonation();
    
    return (
        <div>
            <div>
                <h1 className="text-center text-4xl font-extrabold">Donation Campaigns</h1>
            </div>
           <div className="flex justify-center">
           <div className="grid grid-cols-1 lg:grid-cols-3 my-10 gap-4">
                {donations.map(donation => (
                    <div key={donation._id} className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={donation.image}
                                alt={donation.name}
                                className="h-96 rounded-xl"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{donation.name}</h2>
                            <div>
                                <div className="flex gap-5">
                                    <p className="font-extrabold">Max Donation:</p>
                                    <p>{donation.maxDonation}</p>
                                </div>
                                <div className="flex gap-5">
                                    <p className="font-extrabold">Donated Amount:</p>
                                    <p>{donation.donatedAmount}</p>
                                </div>
                            </div>
                            <div className="card-actions">
                               <Link to={`/view/details/${donation._id}`}> <button className="btn btn-primary">View Details</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
           </div>
        </div>
    );
};

export default Donation;
