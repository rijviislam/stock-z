import Banner from "@/components/Banner";
import Brands from "@/components/Brands";
import RecentlyViewed from "@/components/RecentlyViewed";
import Recommended from "@/components/Recommended";
import TrendingProduct from "@/components/TrendingProduct";

export default function Home() {
  return (
    <>
      <Banner />
      <RecentlyViewed/>
      <Recommended />
      <TrendingProduct />
      <Brands />
    </>
  );
}
