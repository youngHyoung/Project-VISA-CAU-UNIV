import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type Document = {
  id: string;
  name: string;
  description: string;
  required: boolean;
};

const documentsByVisa: Record<string, Document[]> = {
  e7: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid for at least 6 months",
      required: true,
    },
    {
      id: "diploma",
      name: "Educational Diploma",
      description: "Bachelor's degree or higher",
      required: true,
    },
    {
      id: "contract",
      name: "Employment Contract",
      description: "Signed contract from Korean employer",
      required: true,
    },
    {
      id: "tax",
      name: "Tax Records",
      description: "Previous year's tax documentation",
      required: true,
    },
    {
      id: "criminal",
      name: "Criminal Record Check",
      description: "From your home country",
      required: true,
    },
  ],
  d2: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid for duration of study",
      required: true,
    },
    {
      id: "admission",
      name: "University Admission Letter",
      description: "Official acceptance letter",
      required: true,
    },
    {
      id: "transcript",
      name: "Academic Transcripts",
      description: "Previous education records",
      required: true,
    },
    {
      id: "finance",
      name: "Financial Proof",
      description: "Bank statements or scholarship",
      required: true,
    },
  ],
  default: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid",
      required: true,
    },
    {
      id: "photos",
      name: "Passport Photos",
      description: "Recent color photos",
      required: true,
    },
    {
      id: "application",
      name: "Application Form",
      description: "Completed visa application",
      required: true,
    },
    {
      id: "fee",
      name: "Application Fee",
      description: "Payment receipt",
      required: true,
    },
  ],
};

const VisaChecklist = () => {
  const navigate = useNavigate();
  const [selectedVisa, setSelectedVisa] = useState("default");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const visa = localStorage.getItem("selected-visa") || "default";
    setSelectedVisa(visa);
  }, []);

  const documents = documentsByVisa[selectedVisa] || documentsByVisa.default;
  const allChecked = documents.every((doc) => checkedItems[doc.id]);

  const toggleCheck = (docId: string) => {
    setCheckedItems((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white px-5 py-4 shadow-card">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            onClick={() => navigate("/visa-selection")}
            className="flex items-center text-foreground"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-semibold">Back</span>
          </button>
          <h1 className="font-bold text-foreground">Document Checklist</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        <div className="mx-auto max-w-md">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Required Documents
            </h2>
            <p className="text-muted-foreground">
              Check off the documents you have ready
            </p>
          </div>

          <div className="mb-6 space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="animate-fade-in rounded-3xl bg-white p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-bold text-foreground">{doc.name}</h3>
                      {doc.required && (
                        <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                  <Switch
                    checked={checkedItems[doc.id] || false}
                    onCheckedChange={() => toggleCheck(doc.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          {allChecked && (
            <div className="mb-4 animate-fade-in rounded-3xl bg-green-500/10 p-4">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle2 className="h-6 w-6" />
                <p className="font-semibold">All documents checked!</p>
              </div>
            </div>
          )}

          <Button
            onClick={() => navigate("/ai-assistant")}
            disabled={!allChecked}
            className="h-16 w-full rounded-3xl bg-primary text-lg font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:bg-primary/90 disabled:opacity-50"
          >
            Continue to AI Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisaChecklist;
