export default function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm max-w-5xl">
        <p>
          This website is intended for educational purposes only. All biblical quotations are from the New International
          Version.
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Faith, Politics, and the Teachings of Christ</p>
      </div>
    </footer>
  )
}
