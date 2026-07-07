import Header from "@/components/header/header";
import { Hero } from "@/components/hero/hero";
import Collections from "@/components/collections/collections";
import Ticker from "@/components/ticker/ticker";
import Bestsellers from "@/components/bestsellers/bestsellers";
import Community from "@/components/community/community";
import PromoOffer from "@/components/promo-offer/promo-offer";
import Reviews from "@/components/reviews/reviews";
import Footer from "@/components/footer/footer";
import OurStory from "@/components/our-story/our-story";

export default function Home() {
  return (
    <>
      <Header />


      <main>
        <Hero />
        <Ticker />
        <Collections />
        <Bestsellers />
        <Community />
        <PromoOffer />
        <Reviews />
        <OurStory />
      </main>
      <Footer />
    </>
  );
}