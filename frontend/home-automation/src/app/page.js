"use client";
import dynamic from "next/dynamic";
// const Dashboard = dynamic(() => import("@/components/Dashboard/Dashboard"), {
//   ssr: false,
// });
import Dashboard from "@/components/Dashboard/Dashboard";
export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
