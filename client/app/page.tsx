import Banner from "@/components/Banner";
import Category from "@/components/Category";
import ProductContainer from "@/components/ProductContainer";
import ProductFamous from "@/components/ProductFamous";
import Service from "@/components/Service";

export default function Home() {
  return (
    <main style={{ marginTop: "var(--main-header-h)", minHeight: "100vh" }}>
      <Banner />
      <Service />
      {/* @ts-ignore */}
      <Category />
      {/* @ts-ignore */}
      <ProductContainer type="featured collection" path="products?populate=*" />
      {/* @ts-ignore */}
      <ProductFamous />
      {/* @ts-ignore */}
      <ProductContainer type="suggest collection" path="products?populate=*" />
    </main>
  );
}
