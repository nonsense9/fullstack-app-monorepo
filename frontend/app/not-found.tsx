import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">Page not found</p>
      <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded">
        To login
      </Link>
    </div>
  )
}
