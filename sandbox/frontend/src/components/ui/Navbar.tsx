import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b px-4 py-3 flex justify-between items-center bg-white dark:bg-gray-900">
      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
        <Link href="/">Ask Your Docs</Link>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80">
          Upload Document
        </button>
        <button className="px-3 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          Settings
        </button>
      </div>
    </header>
  );
}