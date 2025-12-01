import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Users,
  Home,
  Award,
  LucideIcon,
} from "lucide-react";

type VisaType = {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const visaTypes: VisaType[] = [
  {
    id: "d2",
    code: "D-2",
    name: "Student Visa",
    description: "For studying at Korean universities",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "d4",
    code: "D-4",
    name: "Language Trainee",
    description: "For learning Korean language",
    icon: GraduationCap,
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    id: "d10",
    code: "D-10",
    name: "Job Seeker",
    description: "For seeking employment in Korea",
    icon: Briefcase,
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: "e7",
    code: "E-7",
    name: "Professional",
    description: "For professionals with specific skills",
    icon: Award,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "f27",
    code: "F-2-7",
    name: "Points-based",
    description: "Residency via points system",
    icon: Users,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "f5",
    code: "F-5",
    name: "Permanent Residence",
    description: "Long-term permanent residency",
    icon: Home,
    color: "bg-red-500/10 text-red-600",
  },
];

const VisaSelection = () => {
  const navigate = useNavigate();

  const handleVisaSelect = (visaId: string) => {
    localStorage.setItem("selected-visa", visaId);
    navigate("/visa-checklist");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white px-5 py-4 shadow-card">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-foreground"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-semibold">Back</span>
          </button>
          <h1 className="font-bold text-foreground">Select Visa Type</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        <div className="mx-auto max-w-md">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Choose Your Target Visa
            </h2>
            <p className="text-muted-foreground">
              Select the visa type you want to apply for
            </p>
          </div>

          <div className="space-y-3">
            {visaTypes.map((visa) => {
              const Icon = visa.icon;
              return (
                <button
                  key={visa.id}
                  onClick={() => handleVisaSelect(visa.id)}
                  className="w-full animate-fade-in rounded-3xl bg-white p-5 text-left shadow-card transition-all hover:scale-[1.02] hover:shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${visa.color}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                          {visa.code}
                        </span>
                      </div>
                      <h3 className="mb-1 text-lg font-bold text-foreground">
                        {visa.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {visa.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaSelection;
