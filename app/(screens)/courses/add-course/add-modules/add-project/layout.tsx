import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
