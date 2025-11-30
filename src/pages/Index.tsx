import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background px-5 py-12">
      <div className="flex-1"></div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/20">
            <Plane className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground">K-Pass</h1>
        </div>

        {/* 3D Character Placeholder */}
        <div className="mb-6 flex h-64 w-64 items-center justify-center rounded-[3rem] bg-white shadow-soft">
          <div className="text-center">
            <div className="mb-4 text-8xl">🧳</div>
            <p className="text-sm text-muted-foreground">
              Your Visa Journey Starts Here
            </p>
          </div>
        </div>

        <p className="mb-2 text-xl font-semibold text-foreground">
          Welcome to K-Pass
        </p>
        <p className="text-muted-foreground">
          Simplify your Korean visa process
        </p>
      </div>

      <div className="flex-1"></div>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        <Button
          onClick={() => navigate("/onboarding")}
          className="h-16 w-full rounded-3xl bg-primary text-lg font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:bg-primary/90"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="h-16 w-full rounded-3xl border-2 border-border bg-white text-lg font-semibold text-foreground transition-all hover:scale-[1.02] hover:border-primary/50"
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Index;
