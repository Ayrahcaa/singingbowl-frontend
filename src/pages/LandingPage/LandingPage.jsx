import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/HeroSection/HeroSection";
import Categories from "../../components/Categories/Categories";
import NewCollection from "../../components/NewCollection/NewCollection";
import Reviews from "../../components/Reviews/Reviews";
import PopularProducts from "../../components/PopularProducts/PopularProducts";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <NewCollection />
      <Reviews />
      <PopularProducts />
    </div>
  );
};

export default LandingPage;
