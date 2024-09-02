import AboutUs from "./AboutUs";
import Banner from "./Banner";
import CallToAction from "./CallToAction";
import PartnersSlider from "./PartnersSlider";
import Pets from "./Pets";
import SuccessStories from "./SuccessStories";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Pets></Pets>
            <CallToAction></CallToAction>

            <AboutUs></AboutUs>
            <SuccessStories></SuccessStories>
            <PartnersSlider></PartnersSlider>
        </div>
    );
};

export default Home;