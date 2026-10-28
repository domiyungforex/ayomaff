import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { DiscographySection } from "@/components/home/DiscographySection";
import { VideosSection } from "@/components/home/VideosSection";
import { HomeBottomSection } from "@/components/home/HomeBottomSection";

export default function HomePage() {
  return (
    <div className="relative">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Editorial About Section */}
      <AboutSection />

      {/* 3. Discography & Interactive Vinyl Record */}
      <DiscographySection />

      {/* 4. Official Music Videos */}
      <VideosSection />

      {/* 5. Triple Bottom Section: Shows, Merch & Fan Club */}
      <HomeBottomSection />
    </div>
  );
}
