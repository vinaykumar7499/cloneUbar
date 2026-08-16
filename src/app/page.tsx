import Navbar from "@/components/Nav";
import PublicHome from "@/components/PublicHome";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <PublicHome />
      <Footer />
    </div>
  );
}