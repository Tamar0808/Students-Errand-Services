import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuthProvider from "@/components/providers/session-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <NextAuthProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full min-w-0">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0 overflow-x-hidden">
            {children}
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </NextAuthProvider>
  );
}
