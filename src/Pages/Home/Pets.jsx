import React, { useState } from 'react';
import usePet from '../../Hooks/usePet';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import PetsCard from './PetsCard';
import { Link } from 'react-router-dom';

const Pets = () => {
    const [tabIndex, setTabindex] = useState(0)

    const {pets,loading}=usePet()
    

    const dogs = pets.filter(item => item.pet_code === 'dog').slice(0, 6);
    const cats = pets.filter(item => item.pet_code === 'cat').slice(0, 6);
    const fish = pets.filter(item => item.pet_code === 'fish').slice(0, 6);
    const rabbits = pets.filter(item => item.pet_code === 'rabbit').slice(0, 6);
    return (
        <div>
            <div className='flex justify-center text-center items-center my-10'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabindex(index)}>
                    <TabList>
                        <Tab>Dogs</Tab>
                        <Tab>Cats</Tab>
                        <Tab>Fish</Tab>
                        <Tab>Rabbits</Tab>
                    </TabList>
                    <TabPanel>
                        <div className='grid grid-cols-3 gap-5 pt-10'>{dogs.map(item => <PetsCard key={item._id} item={item}></PetsCard>)}</div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-3 gap-5 pt-10'>{cats.map(item => <PetsCard key={item._id} item={item}></PetsCard>)}</div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-3 gap-5 pt-10'>{fish.map(item => <PetsCard key={item._id} item={item}></PetsCard>)}</div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-3 gap-5 pt-10'>{rabbits.map(item => <PetsCard key={item._id} item={item}></PetsCard>)}</div>
                    </TabPanel>
                </Tabs>

            </div>
            <div className='flex justify-center'>
                <Link to='/petlisting'><button className="bg-yellow-500 text-black px-6 py-3 mb-8 rounded-full font-semibold hover:bg-yellow-600 transition">
                    See More
                </button></Link>
            </div>
        </div>
    );
};

export default Pets;