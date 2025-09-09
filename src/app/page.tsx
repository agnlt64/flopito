
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold mb-4">EDT</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Consultez votre emploi du temps en un clin d&apos;œil.</p>
          <Link href="/schedule" className="rounded-full bg-blue-500 px-8 py-4 text-white font-bold text-lg hover:bg-blue-600 transition-colors">
            Voir l&apos;emploi du temps
          </Link>
        </div>
      </div>
    </main>
  );
}
