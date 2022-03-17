import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import Carousel from "~/components/presentation/Carousel";
import Feedback from "~/components/presentation/Feedback";
import Footer from "~/components/shared/Footer";
import HeaderMenu from "~/components/shared/HeaderMenu";
import ListCategoriesProducts from "~/components/presentation/ListCategoriesProducts";
import Newsletter from "~/components/presentation/Newsletter";

import client from "~/graphql/client";
import { QUERY_HOME } from "~/graphql/queries/home";
import DiscountBar from "~/components/presentation/DiscountBar";

export let loader: LoaderFunction = async () => {
  const { categories } = await client.request(QUERY_HOME, {
    first: 4,
  });

  return {
    categories,
  };
};

function Home() {
  let { categories } = useLoaderData();

  return (
    <>
      <DiscountBar />
      <HeaderMenu />
      <Carousel />
      <ListCategoriesProducts categories={categories} />
      <Feedback />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
