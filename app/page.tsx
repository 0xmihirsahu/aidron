import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex font-manrope flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Aidron</h1>
      <p className="text-lg">
        Aidron is a platform for creating and sharing AI-powered tools. 
      </p> 
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
