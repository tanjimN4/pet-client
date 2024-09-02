import { useState } from "react";

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState('tab2');

    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };

    return (
        <div className="hero h-auto w-full lg:h-96  mx-auto">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="https://i.ibb.co/PMkpXtG/Screenshot-2024-08-26-032521.png"
                    className="w-full lg:w-80 lg:max-w-md rounded-lg shadow-2xl"
                    alt="About Us"
                />
                <div className="w-full lg:w-3/4 p-4 text-center">
                    <div className="tabs">
                        <a
                            className={`tab tab-bordered ${activeTab === 'tab1' ? 'tab-active' : ''}`}
                            role="tab"
                            aria-selected={activeTab === 'tab1'}
                            onClick={() => handleTabClick('tab1')}
                        >
                            The Starfish Story
                        </a>
                        <a
                            className={`tab tab-bordered ${activeTab === 'tab2' ? 'tab-active' : ''}`}
                            role="tab"
                            aria-selected={activeTab === 'tab2'}
                            onClick={() => handleTabClick('tab2')}
                        >
                            Our Mission
                        </a>
                        <a
                            className={`tab tab-bordered ${activeTab === 'tab3' ? 'tab-active' : ''}`}
                            role="tab"
                            aria-selected={activeTab === 'tab3'}
                            onClick={() => handleTabClick('tab3')}
                        >
                            Our Vision
                        </a>
                    </div>

                    <header className="mt-4">
                        <h1 className="text-4xl font-bold">
                            <span>About</span> <span>Us</span>
                        </h1>
                    </header>

                    <div className="mt-4">
                        {activeTab === 'tab1' && (
                            <div>
                                <p>
                                    There is a man walking on the beach. In the distance he sees a boy throwing something into the ocean. As he gets closer, he sees the boy is surrounded by starfish that have washed up in the tide. The boy reaches down, picks up another starfish, and throws it in the water. The man questions the boy, "Don't you see how many there are? You will never be able to make a difference." The boy picks up another starfish, throws it into the ocean, and says, "I made a difference for that one."
                                </p>
                            </div>
                        )}
                        {activeTab === 'tab2' && (
                            <div>
                                <p>
                                    The mission of Starfish Animal Rescue is to rescue animals from high-kill shelters, provide transportation of these animals to secure, non-kill establishments, to promote and facilitate responsible pet ownership and to make a difference in pet overpopulation, one life at a time.
                                </p>
                            </div>
                        )}
                        {activeTab === 'tab3' && (
                            <div>
                                <p>
                                    <span>A world where every dog and cat is wanted, cared for, and loved.</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
