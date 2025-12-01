import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Send, Download, Bot, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUESTIONS = [
  "What is your specific major or field of expertise?",
  "What is your annual income range in USD?",
  "Have you violated any laws or regulations in Korea?",
  "What is your Korean language proficiency level (TOPIK score if any)?",
  "When does your current visa expire? (If applicable)"
];

const AIAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check visa type for E/F redirection logic
  const visaType = localStorage.getItem("selected-visa") || "";
  const isSpecialistVisa = ["e", "f"].some(prefix => visaType.toLowerCase().startsWith(prefix));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  useEffect(() => {
    // Initial greeting
    const initialMessage = "Hello, I am ready to start the visa interview.\n\n" + QUESTIONS[0];
    setMessages([{ role: "assistant", content: initialMessage }]);
  }, []);

  const progress = Math.min(((currentQuestionIndex) / 5) * 100, 100);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsGenerating(true);

    // Simulate "AI" delay
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex < QUESTIONS.length) {
        const nextQuestion = QUESTIONS[nextIndex];
        setMessages((prev) => [...prev, { role: "assistant", content: nextQuestion }]);
        setCurrentQuestionIndex(nextIndex);
      } else {
        // Finished
        const completionMsg = "Perfect! I have all the information I need. I'm now analyzing your responses and preparing your visa documents...";
        setMessages((prev) => [...prev, { role: "assistant", content: completionMsg }]);
        setIsComplete(true);
        toast({
          title: "Document Ready!",
          description: "Your visa application document has been generated successfully.",
        });
        
        if (isSpecialistVisa) {
             toast({
              title: "Specialist Recommended",
              description: "For your visa type, we recommend connecting with a specialist to expedite the process.",
              duration: 5000,
            });
        }
      }
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white px-5 py-4 shadow-card">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            onClick={() => navigate("/visa-checklist")}
            className="flex items-center text-foreground"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">AI Interview</span>
          </div>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-5 py-4 shadow-card">
        <div className="mx-auto max-w-md">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Interview Progress
            </span>
            <span className="font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-md space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`animate-fade-in ${
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-white text-foreground shadow-card"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex justify-center">
              <div className="rounded-2xl bg-white px-6 py-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-75"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-150"></div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Action Buttons (Download or Specialist) */}
      {isComplete && (
        <div className="px-5 py-4 animate-slide-up">
          <div className="mx-auto max-w-md space-y-3">
            {isSpecialistVisa ? (
              <>
                <div className="rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
                  <p className="font-semibold mb-1">Expert Review Recommended</p>
                  <p>For {visaType.toUpperCase()} visas, we recommend passing your documents to a specialist for faster processing.</p>
                </div>
                <Button 
                  onClick={() => navigate("/experts")}
                  className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  <UserCheck className="mr-2 h-5 w-5" />
                  Connect with Visa Specialist
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 w-full rounded-2xl border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Only
                </Button>
              </>
            ) : (
              <Button className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-soft hover:bg-primary/90">
                <Download className="mr-2 h-5 w-5" />
                Download Generated Document
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Input */}
      {!isComplete && (
        <div className="border-t border-border bg-white px-5 py-4 shadow-card">
          <div className="mx-auto flex max-w-md items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your answer..."
              disabled={isGenerating}
              className="h-12 flex-1 rounded-2xl border-0 bg-background shadow-card"
            />
            <Button
              onClick={handleSend}
              size="icon"
              disabled={isGenerating}
              className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground shadow-card hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;