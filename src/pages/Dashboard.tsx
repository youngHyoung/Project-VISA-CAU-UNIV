import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Briefcase, ArrowRight, FileText } from "lucide-react";

type UserData = {
  name: string;
  desiredVisa: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kpass-user");
    if (stored) {
      const data = JSON.parse(stored);
      setUserData(data);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const visaLabels: Record<string, string> = {
    "d-visa": "D Visa",
    "e-visa": "E Visa",
    "f-visa": "F Visa",
  };

  return (
    <div className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Hello, {userData?.name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's get your{" "}
            <span className="font-semibold text-primary">
              {visaLabels[userData?.desiredVisa || ""] || "visa"}
            </span>
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-4 animate-slide-up">
          {/* Card A: AI Auto-Service */}
          <button
            onClick={() => navigate("/visa-selection")}
            className="group w-full rounded-3xl bg-white p-6 shadow-card transition-all hover:scale-[1.02] hover:shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 text-left">
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Bot className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground">
                  Easy Visa Document Helper
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  AI-powered assistant for your visa application
                </p>
                <div className="inline-flex items-center text-sm font-medium text-primary">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </button>

          {/* Card B: Employer Document Helper */}
          <button
            onClick={() => navigate("/employer-helper")}
            className="group w-full rounded-3xl bg-white p-6 shadow-card transition-all hover:scale-[1.02] hover:shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 text-left">
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground">
                  Employer Document Helper
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Generate professional document requests for your HR department
                </p>
                <div className="inline-flex items-center text-sm font-medium text-primary">
                  Create Request
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </button>

          {/* Card C: Expert Matching */}
          <button
            onClick={() => navigate("/experts")}
            className="group w-full rounded-3xl bg-white p-6 shadow-card transition-all hover:scale-[1.02] hover:shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 text-left">
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground">
                  Find a Visa Specialist
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Connect with expert immigration administrators for E/F-Visa
                </p>
                <div className="inline-flex items-center text-sm font-medium text-primary">
                  Browse Experts
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-card">
          <h3 className="mb-2 font-semibold text-foreground">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            Our AI assistant can help with document preparation for D-Visa
            applications, while our expert network specializes in E and F-Visa
            consultations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
