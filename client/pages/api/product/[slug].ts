import { IResSimpleProduct } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResSimpleProduct | Data>
) {
  const { slug } = req.query;
  const data: IResSimpleProduct = await (
    await fetch(
      `https://backend-ecommerce-2.onrender.com/api/products/${slug}?populate=*`
    )
  ).json();

  res.status(200).json(data);
}
