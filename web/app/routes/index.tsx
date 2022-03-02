import Carousel from "~/components/Carousel";
import Feedback from "~/components/Feedback";
import Footer from "~/components/Footer";
import HeaderMenu from "~/components/HeaderMenu";
import ListProducts from "~/components/ListProducts";
import Newsletter from "~/components/Newsletter";

function Home() {
  return (
    <>
      <Carousel />
      <HeaderMenu />
      <ListProducts />
      <Feedback />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
