import dateFormat from "dateformat";
import querystring from "qs";
import crypto from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";
interface VnpParams {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;
  vnp_ExpireDate: string;
  vnp_BankCode: string;
  vnp_SecureHash: string;
}

function sortObject(obj: VnpParams): any {
  let sorted: { [key: string]: string } = {};
  let str: string[] = [];
  let key: string;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && key !== "vnp_SecureHash") {
      str.push(encodeURIComponent(key));
    }
  }

  str.sort();

  for (let i = 0; i < str.length; i++) {
    sorted[str[i]] = encodeURIComponent(obj[str[i] as keyof VnpParams]).replace(
      /%20/g,
      "+"
    );
  }

  return sorted;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ipAddr = "14.191.250.7";

  const tmnCode = process.env.REACT_APP_TMNCODE!;
  //   const tmnCode = "AH7U74KB";
  const secretKey = process.env.REACT_APP_SECRET_KEY!;
  //   const secretKey = "UIAHOQLQQWGTZFQLTIFRIQOHYTROFDYU";
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "https://x-ecommerce.vercel.app/checkout";

  const date = new Date();
  const money = Number(req.query.amount);
  const createDate = dateFormat(date, "yyyymmddHHmmss");
  const orderId = dateFormat(date, "HHmmss");
  const expDate = dateFormat(date.getTime() + 15 * 60 * 1000, "yyyymmddHHmmss");
  const amount = money;
  const bankCode = "NCB";

  const orderInfo = "Thanh toán hóa đơn từ X-Ecommerce";
  const orderType = "billpayment";
  const locale = "vn";
  const currCode = "VND";
  let vnp_Params: VnpParams = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expDate,
    vnp_BankCode: bankCode,
    vnp_SecureHash: "",
  };

  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.status(200).json(vnpUrl);
}
