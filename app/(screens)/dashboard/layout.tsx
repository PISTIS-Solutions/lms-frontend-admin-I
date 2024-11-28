import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <main>{children}</main>
      </Suspense>
    </div>
  );
}
