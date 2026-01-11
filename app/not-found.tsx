export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-950">
      <h1 className="text-9xl font-extrabold text-white mb-6">404</h1>
      <p className="text-2xl text-green-500 font-semibold mb-4">
        Oops! Page Not Found
      </p>
      <p className="text-white text-lg mb-8 text-center px-4">
        The page you are looking for does not exist. <br />
        Maybe check the URL or go back to the homepage.
      </p>
      <a
        href="/"
        className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}
