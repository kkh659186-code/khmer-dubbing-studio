export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold khmer">ស្ទូឌីយោបញ្ចូលសំឡេងខ្មែរ</h1>
        <p className="text-sm text-gray-600">Khmer Dubbing Studio</p>
        <div className="mt-2 flex gap-2">
          <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">Sreymom [F]</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Piseth [M]</span>
        </div>
      </div>
    </header>
  )
}
