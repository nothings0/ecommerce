import Banner from "@/components/Banner";
import Category from "@/components/Category";
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

  return (
    <main className="main" style={{ background: "var(--main-bg)" }}>
      <Banner />
      <Service />
      {/* @ts-ignore */}
      <Category />
      {/* @ts-ignore */}
      <ProductContainer type="featured collection" path={`products?${query}`} />
      {/* @ts-ignore */}
      <ProductFamous />
      {/* @ts-ignore */}
      <ProductContainer type="suggest collection" path={`products?${query}`} />
    </main>
  );
}
