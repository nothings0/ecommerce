import { Metadata } from "next";

export const metadata: Metadata = {
  title: "checkout",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
