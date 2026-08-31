import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
