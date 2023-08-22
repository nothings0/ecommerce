import Banner from "@/components/Banner";
import BannerVertical from "@/components/Banner/BannerVertical";
import Category from "@/components/Category";
import Email from "@/components/Email";
import ProductContainer from "@/components/ProductContainer";
import ProductFamous from "@/components/ProductFamous";
import Service from "@/components/Service";
import { Metadata } from "next";
import qs from "querystring";

export const metadata: Metadata = {
  title: "E - Ecommerce",
};

export default function Home() {
  const query = qs.stringify({
    populate: "*",
    "pagination[page]": 1,
    "pagination[pageSize]": 6,
  });
  const bestSellerQuery = qs.stringify({
    populate: "*",
    "pagination[page]": 1,
    "pagination[pageSize]": 4,
  });
  const bestProductQuery = qs.stringify({
    populate: "*",
    "pagination[page]": 1,
    "pagination[pageSize]": 9,
  });

  return (
    <main className="main" style={{ background: "var(--main-bg)" }}>
      <Banner />
      <Service />
      {/* @ts-ignore */}
      <Category />
      {/* @ts-ignore */}
      <ProductContainer heading="Popular Category" path={`products?${query}`} />
      {/* @ts-ignore */}
      <ProductFamous />
      {/* @ts-ignore */}
      <ProductContainer
        heading="Featured Products"
        path={`products?${query}`}
      />
      <BannerVertical />
      <ProductContainer
        heading="Top Rated Products"
        path={`products?${bestSellerQuery}`}
        type="rate"
      />
      <ProductContainer
        heading="best products"
        path={`products?${bestProductQuery}`}
        type="best"
      />
      <Email />
    </main>
  );
}
