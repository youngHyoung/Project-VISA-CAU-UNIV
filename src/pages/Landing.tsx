import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFECD4] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#CA8853] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#7D4519] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-md space-y-12">
        {/* Logo & Branding */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Sparkles className="w-16 h-16 text-[#CA8853]" />
          </div>
          <h1 className="text-4xl font-bold text-[#7D4519] tracking-tight">K-Pass</h1>
          <p className="text-[#7D4519]/80 text-lg">Your Easy Path to Korea</p>
        </div>

        {/* 3D Character Placeholder */}
        <div className="relative w-48 h-48 animate-float">
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-full blur-xl" />
          <div className="relative w-full h-full bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg">
             <User className="w-24 h-24 text-[#7D4519] opacity-80" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 animate-slide-up">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full h-14 text-lg font-semibold bg-[#CA8853] hover:bg-[#B07342] text-white rounded-2xl shadow-lg shadow-[#CA8853]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign Up
          </Button>
          <Button 
            variant="ghost"
            className="w-full h-14 text-lg font-medium text-[#7D4519] hover:bg-[#7D4519]/5 rounded-2xl transition-all"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
