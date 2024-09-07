import React, { useState } from 'react';
import usePet from '../../Hooks/usePet';
import { Link } from 'react-router-dom';
import usePetScoring from '../../Hooks/usePetScoring';

const PetListing = () => {
    const { pets } = usePetScoring()
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')


    //filter for search
    const filterdata = pets.filter(pet =>
        pet.pet_name.toLowerCase().includes(search.toLowerCase()) &&
        (category === '' || pet.pet_code === category)
    ).sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
    return (
        <div>
            <div className='mt-10 mb-10'>
                <form className="float-none lg:flex items-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="simple-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search ..."
                            required
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full">
                        <select
                            id="category-select"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="dog">Dogs</option>
                            <option value="cat">Cats</option>
                            <option value="rabbit">Rabbits</option>
                            <option value="fish">Fish</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                    {
                        filterdata.map(pet =>
                            <div key={pet._id} className="">
                                <div className="card bg-base-100 w-96 shadow-xl border-2">
                                    <figure className="px-10 pt-10">
                                        <img
                                            src={pet.pet_image}
                                            alt="Shoes"
                                            className="rounded-xl h-80" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">Name : {pet.pet_name}</h2>
                                        <p>Age : {pet.pet_age}</p>
                                        <p>Location : {pet.pet_location}</p>
                                    </div>
                                    <div className='flex justify-center mb-6'>
                                        <Link to={`/details/${pet._id}`}><button className="bg-yellow-500 text-black px-6 py-3 w-40 rounded-full font-semibold hover:bg-yellow-600 transition">
                                            Details
                                        </button></Link>
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

export default PetListing;