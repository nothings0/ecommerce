import crypto from "crypto";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var requestId = partnerCode + new Date().getTime();
var orderId = requestId;
var orderInfo = "Thanh toán hóa đơn từ X-Ecommerce";
var redirectUrl = "https://x-ecommerce.vercel.app/checkout";
var ipnUrl = "https://x-ecommerce.vercel.app/checkout";
var requestType = "captureWallet";
var extraData = "";

// const options = {
//   hostname: "test-payment.momo.vn",
//   port: 443,
//   path: "/v2/gateway/api/create",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Content-Length": Buffer.byteLength(requestBody),
//   },
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const money = Number(req.query.amount);
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    money +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: money,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  const resp = await axios.post(
    "https://test-payment.momo.vn/v2/gateway/api/create",
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  res.status(200).json(resp.data.payUrl);
}
