import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import Ticker from "@/components/Ticker";
import ExperienceCards from "@/components/ExperienceCards";
import KitchenVideo from "@/components/KitchenVideo";
import ParallaxDivider from "@/components/ParallaxDivider";
import AmbientGallery from "@/components/AmbientGallery";
import MenuSection from "@/components/MenuSection";
import Testimonials from "@/components/Testimonials";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="relative bg-[#0f0d0b] text-[#f5f0e8] overflow-hidden">
          <HeroVideo />
          <Ticker />
          <ExperienceCards />
          <KitchenVideo />
          <ParallaxDivider />
          <AmbientGallery />
          <MenuSection />
          <Testimonials />
          <ReservationCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
