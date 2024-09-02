

const PetsCard = ({ item }) => {
    const {pet_image,pet_name,pet_age,pet_location}=item

    return (
        <div className="">
            <div className="card bg-base-100 w-96 shadow-xl border-2">
                <figure className="px-10 pt-10">
                    <img
                        src={pet_image}
                        alt="Shoes"
                        className="rounded-xl h-96" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Name : {pet_name}</h2>
                    <p>Age : {pet_age}</p>
                    <p>Location : {pet_location}</p>
                </div>
            </div>
        </div>
    );
};

export default PetsCard;