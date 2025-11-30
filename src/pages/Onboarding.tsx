import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

type FormData = {
  name: string;
  nationality: string;
  age: string;
  education: string;
  address: string;
  currentVisa: string;
  desiredVisa: string;
  purpose: string[];
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    nationality: "",
    age: "",
    education: "",
    address: "",
    currentVisa: "",
    desiredVisa: "",
    purpose: [],
  });

  const progressValue = (step / 3) * 100;

  const purposeOptions = [
    "Employment",
    "Study",
    "Investment",
    "Family Reunion",
    "Tourism",
    "Business",
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem("kpass-user", JSON.stringify(formData));
      navigate("/dashboard");
    }
  };

  const togglePurpose = (purpose: string) => {
    setFormData((prev) => ({
      ...prev,
      purpose: prev.purpose.includes(purpose)
        ? prev.purpose.filter((p) => p !== purpose)
        : [...prev.purpose, purpose],
    }));
  };

  return (
    <div className="min-h-screen bg-background px-5 py-6">
      <div className="mx-auto max-w-md">
        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in">
          <Progress value={progressValue} className="h-2 bg-muted" />
          <p className="mt-2 text-sm text-muted-foreground">Step {step} of 3</p>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="animate-slide-up space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Welcome to K-Pass
              </h1>
              <p className="text-muted-foreground">
                Let's get to know you better
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="h-14 rounded-2xl border-0 bg-white shadow-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-foreground">
                  Nationality
                </Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                  placeholder="Your nationality"
                  className="h-14 rounded-2xl border-0 bg-white shadow-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  placeholder="Your age"
                  className="h-14 rounded-2xl border-0 bg-white shadow-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="text-foreground">
                  Education Level
                </Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) =>
                    setFormData({ ...formData, education: value })
                  }
                >
                  <SelectTrigger className="h-14 rounded-2xl border-0 bg-white shadow-card">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Current Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Your current address"
                  className="h-14 rounded-2xl border-0 bg-white shadow-card"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Visa Goals */}
        {step === 2 && (
          <div className="animate-slide-up space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Your Visa Goals
              </h1>
              <p className="text-muted-foreground">
                Tell us about your visa situation
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Current Visa</Label>
                <Select
                  value={formData.currentVisa}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currentVisa: value })
                  }
                >
                  <SelectTrigger className="h-14 rounded-2xl border-0 bg-white shadow-card">
                    <SelectValue placeholder="Select current visa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourist">Tourist Visa</SelectItem>
                    <SelectItem value="student">Student Visa</SelectItem>
                    <SelectItem value="work">Work Visa</SelectItem>
                    <SelectItem value="none">No Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Desired Visa</Label>
                <Select
                  value={formData.desiredVisa}
                  onValueChange={(value) =>
                    setFormData({ ...formData, desiredVisa: value })
                  }
                >
                  <SelectTrigger className="h-14 rounded-2xl border-0 bg-white shadow-card">
                    <SelectValue placeholder="Select desired visa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d-visa">D Visa (Long-term)</SelectItem>
                    <SelectItem value="e-visa">E Visa (Employment)</SelectItem>
                    <SelectItem value="f-visa">F Visa (Family)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Purpose */}
        {step === 3 && (
          <div className="animate-slide-up space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Purpose of Stay
              </h1>
              <p className="text-muted-foreground">
                Select all that apply to your situation
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {purposeOptions.map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => togglePurpose(purpose)}
                  className={`rounded-2xl border-2 px-4 py-6 text-center text-sm font-medium transition-all ${
                    formData.purpose.includes(purpose)
                      ? "border-primary bg-primary text-primary-foreground shadow-card"
                      : "border-border bg-white text-foreground hover:border-primary/50"
                  }`}
                >
                  {purpose}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next Button */}
        <Button
          onClick={handleNext}
          className="mt-8 h-14 w-full rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:bg-primary/90"
        >
          {step < 3 ? "Next" : "Get Started"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
