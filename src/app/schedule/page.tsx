
import Schedule from "@/components/schedule";

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
        <Schedule />
      </div>
    </main>
  );
}
