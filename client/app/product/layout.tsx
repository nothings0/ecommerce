import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
