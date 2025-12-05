import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Briefcase, Download, FileText, Send } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  hrName: z.string().min(2, "HR Manager name is required"),
  hrEmail: z.string().email("Invalid email address"),
  requestDetails: z.string().optional(),
});

const EmployerHelper = () => {
  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      position: "",
      hrName: "",
      hrEmail: "",
      requestDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate generation delay
    setTimeout(() => {
      setGenerated(true);
      toast.success("Document Package Generated!", {
        description: "You can now download or email the request package.",
      });
    }, 1500);
  }

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
          <h1 className="font-bold text-foreground">Employer Helper</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="mx-auto max-w-md">
          <div className="mb-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Request Documents
            </h2>
            <p className="text-muted-foreground">
              We'll generate a professional email and document checklist for your
              HR department.
            </p>
          </div>

          {!generated ? (
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Samsung Electronics" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="hrName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HR Manager Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Kim Min-su" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hrEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HR Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="hr@company.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="requestDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requests..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="mt-2 h-12 w-full rounded-xl text-lg font-semibold"
                  >
                    Generate Package
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-3xl bg-green-50 p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-green-800">
                  Package Ready!
                </h3>
                <p className="text-sm text-green-700">
                  Includes: Employment Contract Template, Explanation of Employment,
                  Company Tax Record Request.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-card">
                <h4 className="mb-4 font-semibold text-foreground">Preview</h4>
                <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="mb-2 font-bold">
                    Subject: Visa Document Request - {form.getValues().position}
                  </p>
                  <p className="mb-2">
                    Dear {form.getValues().hrName},
                  </p>
                  <p className="mb-2">
                    I am preparing for my visa application and kindly request your
                    assistance with the following documents required by the
                    immigration office:
                  </p>
                  <ul className="mb-2 list-inside list-disc pl-2">
                    <li>Signed Employment Contract</li>
                    <li>Certificate of Business Registration</li>
                    <li>Tax Payment Certificate</li>
                    <li>Employment Explanation Statement</li>
                  </ul>
                  <p>Thank you for your support.</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 rounded-xl border-primary text-primary hover:bg-primary/5"
                    onClick={() => toast.success("Email sent to HR!")}
                  >
                    <Send className="h-4 w-4" />
                    Send Email
                  </Button>
                  <Button
                    className="flex-1 gap-2 rounded-xl"
                    onClick={() => toast.success("Package downloaded!")}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground"
                onClick={() => setGenerated(false)}
              >
                Create Another Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerHelper;
