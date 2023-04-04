import Banner from "@/components/Banner";
import Category from "@/components/Category";
import ProductContainer from "@/components/ProductContainer";
import ProductFamous from "@/components/ProductFamous";
import Service from "@/components/Service";

export default function Home() {
  return (
    <main className="main" style={{ background: "var(--main-bg)" }}>
      <Banner />
      <Service />
      {/* @ts-ignore */}
      <Category />
      {/* @ts-ignore */}
      <ProductContainer
        type="featured collection"
        path="products?populate=*&pagination[page]=1&pagination[pageSize]=6"
      />
      {/* @ts-ignore */}
      <ProductFamous />
      {/* @ts-ignore */}
      <ProductContainer
        type="suggest collection"
        path="products?populate=*&pagination[page]=1&pagination[pageSize]=6"
      />
    </main>
  );
}
