import Schedule from "@/components/schedule";
import { ThemeToggle } from "@/components/theme-toggle";
import { Suspense } from "react";

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <div className="absolute top-4 right-4 z-20">
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