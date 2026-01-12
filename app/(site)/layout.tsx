import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ClientLayout from "./ClientLayout";
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="min-h-screen flex flex-col">
        <NavBar />        
        <main className="flex-1">
          <ClientLayout>
          {children}
          </ClientLayout>
        </main>       
        <Footer />
      </div>
  );
}
