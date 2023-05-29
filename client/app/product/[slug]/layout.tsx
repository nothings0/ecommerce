import { IResSimpleProduct } from "@/type";
import { Metadata } from "next";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  const data: IResSimpleProduct = await (
    await fetch(`http://127.0.0.1:3000/api/product/${slug}`)
  ).json();

  return {
    title: data?.data?.attributes.name,
  };
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
