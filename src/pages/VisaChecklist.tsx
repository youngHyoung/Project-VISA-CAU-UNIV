import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Document = {
  id: string;
  name: string;
  description: string;
  details: string; // Detailed content for the accordion
  required: boolean;
};

const documentsByVisa: Record<string, Document[]> = {
  e7: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid for at least 6 months",
      details: "Ensure your passport has at least 6 months of validity remaining. Check for any damage to the pages.",
      required: true,
    },
    {
      id: "diploma",
      name: "Educational Diploma",
      description: "Bachelor's degree or higher",
      details: "For E-7, you typically need a Bachelor's degree related to the job. If you graduated outside Korea, you need an Apostille or Consular Verification.",
      required: true,
    },
    {
      id: "contract",
      name: "Employment Contract",
      description: "Signed contract from Korean employer",
      details: "Must specify salary, working hours, and job duties. Salary must meet the GNI per capita requirement (80% for SMEs).",
      required: true,
    },
    {
      id: "tax",
      name: "Tax Records",
      description: "Previous year's tax documentation",
      details: "Certificate of Income Amount (소득금액증명원) from Hometax. If you are a new graduate, this might be waived.",
      required: true,
    },
    {
      id: "criminal",
      name: "Criminal Record Check",
      description: "From your home country",
      details: "Must be issued by your home country's government, notarized, and apostilled/consular verified. Valid for 3 months.",
      required: true,
    },
  ],
  d2: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid for duration of study",
      details: "Check the expiry date. It should cover your entire expected study period if possible.",
      required: true,
    },
    {
      id: "photo",
      name: "Passport Photo",
      description: "3.5cm x 4.5cm, White background",
      details: "Standard passport size (3.5cm x 4.5cm). White background. Taken within the last 6 months. Do not wear white clothes.",
      required: true,
    },
    {
      id: "admission",
      name: "University Admission Letter",
      description: "Official acceptance letter",
      details: "Certificate of Admission issued by the university. Ensure the start date and course details are correct.",
      required: true,
    },
    {
      id: "transcript",
      name: "Academic Transcripts",
      description: "Previous education records",
      details: "Transcripts from your previous degree. If from a non-OECD country, you might need Apostille/Consular Verification.",
      required: true,
    },
    {
      id: "finance",
      name: "Financial Proof",
      description: "Bank statements or scholarship",
      details: "Bank statement showing ~$20,000 USD (varies by university). Must be issued within 30 days.",
      required: true,
    },
  ],
  d4: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid for duration of study",
      details: "Ensure validity covers at least the first 6 months of your language program.",
      required: true,
    },
    {
      id: "photo",
      name: "Passport Photo",
      description: "3.5cm x 4.5cm, White background",
      details: "Standard passport size (3.5cm x 4.5cm). White background. Taken within the last 6 months.",
      required: true,
    },
    {
      id: "admission",
      name: "Language School Admission",
      description: "Certificate of admission",
      details: "Issued by the language institute. Check for the specific term dates.",
      required: true,
    },
    {
      id: "finance",
      name: "Bank Statement",
      description: "Proof of funds ($10,000+)",
      details: "Bank statement showing at least $10,000 USD (or equivalent). Must be in your name or parents' name (with family relation proof).",
      required: true,
    },
    {
      id: "education",
      name: "Graduation Certificate",
      description: "Highest degree or diploma",
      details: "Certificate of graduation from your last school. Apostille/Consular Verification may be required.",
      required: true,
    },
  ],
  default: [
    {
      id: "passport",
      name: "Valid Passport",
      description: "Must be valid",
      details: "General requirement for all visas. Ensure it is not expired.",
      required: true,
    },
    {
      id: "photos",
      name: "Passport Photos",
      description: "Recent color photos",
      details: "3.5cm x 4.5cm, white background, taken within 6 months.",
      required: true,
    },
    {
      id: "application",
      name: "Application Form",
      description: "Completed visa application",
      details: "Form No. 34 for Alien Registration or Extension. Download from Hikorea.",
      required: true,
    },
    {
      id: "fee",
      name: "Application Fee",
      description: "Payment receipt",
      details: "Revenue stamps (Government revenue stamp). Usually 60,000 KRW for extension, 30,000 KRW for registration card.",
      required: true,
    },
  ],
};

const VisaChecklist = () => {
  const navigate = useNavigate();
  const [selectedVisa, setSelectedVisa] = useState("default");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isRenewing, setIsRenewing] = useState(false);

  useEffect(() => {
    const visa = localStorage.getItem("selected-visa") || "default";
    setSelectedVisa(visa);
  }, []);

  const documents = documentsByVisa[selectedVisa] || documentsByVisa.default;
  const allChecked = documents.every((doc) => checkedItems[doc.id]);

  const toggleCheck = (docId: string) => {
    setCheckedItems((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleOneClickRenewal = () => {
    setIsRenewing(true);
    // Simulate API call / Processing
    setTimeout(() => {
      setIsRenewing(false);
      toast.success("Renewal Application Generated!", {
        description: "Your Hikorea application form has been pre-filled and downloaded.",
      });
    }, 2000);
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
              Expand each item for detailed instructions.
            </p>
          </div>

          {/* One-Click Renewal CTA (Visible for D-2/D-4) */}
          {(selectedVisa === "d2" || selectedVisa === "d4") && (
            <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">One-Click Renewal</h3>
                  <p className="text-sm text-blue-100">
                    Data already saved? Skip the paperwork.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleOneClickRenewal}
                disabled={isRenewing}
                className="w-full rounded-xl bg-white text-blue-600 hover:bg-blue-50"
              >
                {isRenewing ? "Generating Form..." : "Generate Renewal Form"}
              </Button>
            </div>
          )}

          <div className="mb-6 space-y-3">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {documents.map((doc) => (
                <AccordionItem
                  key={doc.id}
                  value={doc.id}
                  className="overflow-hidden rounded-3xl border-none bg-white shadow-card"
                >
                  <div className="flex items-center justify-between pr-4">
                    <AccordionTrigger className="flex-1 px-5 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">
                            {doc.name}
                          </span>
                          <span className="text-sm font-normal text-muted-foreground">
                            {doc.description}
                          </span>
                        </div>
                        {doc.required && (
                          <span className="ml-2 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-600">
                            Required
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <Switch
                      checked={checkedItems[doc.id] || false}
                      onCheckedChange={() => toggleCheck(doc.id)}
                      className="ml-2"
                    />
                  </div>
                  <AccordionContent className="bg-gray-50/50 px-5 pb-4 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2 rounded-xl bg-blue-50 p-3 text-blue-700">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>{doc.details}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

