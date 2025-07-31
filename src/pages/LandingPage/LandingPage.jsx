import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/HeroSection/HeroSection";
import Categories from "../../components/Categories/Categories";
import NewCollection from "../../components/NewCollection/NewCollection";
import Reviews from "../../components/Reviews/Reviews";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import FeatureSection from "../../components/FeatureSection/FeatureSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <NewCollection />
      <FeatureSection />
      <PopularProducts />
    </div>
  );
};

export default LandingPage;
