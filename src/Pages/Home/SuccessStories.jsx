import React from 'react';

const SuccessStories = () => {
    const stories = [
        {
            id: 'item_151',
            imgSrc: '	https://www.starfishanimalrescue.com/images/home/zeus-c-n.jpg',
            alt: 'Zeus',
            title: 'Zeus',
            description: 'Chris and Nikki made sure their Starfish pup Zeus was in their engagement photos and in their wedding. He was the star of the show.',
            link: '/68-success-stories/151-zeus',
        },
        {
            id: 'item_152',
            imgSrc: '	https://www.starfishanimalrescue.com/images/home/barrett-hogan.jpg',
            alt: 'Barrett and Hogan',
            title: 'Barrett and Hogan',
            description: 'Kim cannot imagine her life without her two Husky boys Barrett and Hogan who she has had for 7 years.',
            link: '/68-success-stories/152-barrett-and-hogan',
        },
        {
            id: 'item_153',
            imgSrc: 'https://www.starfishanimalrescue.com/images/home/Syndey.jpg',
            alt: 'Sydney',
            title: 'Sydney',
            description: 'Sydney found her Happily Ever After this month with Kelly and Nick, and she also has two fur siblings!',
            link: '/68-success-stories/153-sydney',
        },
        {
            id: 'item_154',
            imgSrc: '	https://www.starfishanimalrescue.com/images/home/rocky.jpg',
            alt: 'Rocky',
            title: 'Rocky',
            description: 'Rocky just celebrated his second birthday - his family of 4 says their life is now complete and he makes them laugh every day.',
            link: '/68-success-stories/154-rocky',
        },
    ];

    return (
        <div>
            <div className='text-center my-10'>
                <h1 className='text-3xl lg:text-5xl font-extrabold'>SUCCESS STORIES</h1>
                <p className='my-2'>Share a photo and tell us what role animals play in your life.</p>
            </div>
            <div className='flex justify-center items-center'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    {
                        stories.map(story =>
                            <div key={story.id} className="card card-side bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        className='w-96'
                                        src={story.imgSrc}
                                        alt="Movie" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{story.title}</h2>
                                    <p>{story.description}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
