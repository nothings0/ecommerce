import type { NextApiRequest, NextApiResponse } from "next";
// import qs from "qs";

function flattenObjectToQueryString(obj: any) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const obj = req.query;
  // const queryString = qs.stringify(obj);
  // const path2 = path1?.replace("%3F", "?");
  // const path = path2?.replace("%3D", "=");
  const queryString = flattenObjectToQueryString(obj);
  const path = queryString?.replace("path=", "");
  const resp = await fetch(
    `https://backend-ecommerce-2.onrender.com/api/${path}`
  );
  const data = await resp.json();
  res.status(200).json(data);
}
