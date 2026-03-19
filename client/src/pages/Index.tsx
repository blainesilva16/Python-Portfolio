import Navbar from "@/components/Navbar";
import WaveBackground from "@/components/WaveBackground";
import HeroSection from "@/components/HeroSection";
import MiniChat from "@/components/MiniChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <WaveBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
      </main>
      <MiniChat />
    </div>
  );
};

export default Index;
