import Schedule from "@/components/schedule";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        <Button variant="ghost" className="cursor-pointer" size="icon">
          <Link href="https://github.com/agnlt64/flopito" target="_blank" rel="noreferrer">
            <Github size={16} />
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className="z-10 w-full p-2 sm:p-4 font-mono">
        <Suspense fallback={<div>Loading...</div>}>
          <Schedule />
        </Suspense>
      </div>
    </main>
  );
}