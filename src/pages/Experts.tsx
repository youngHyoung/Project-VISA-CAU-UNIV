import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Star,
  Filter,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

type Expert = {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  successRate: number;
  price: string;
  style: string;
  specialty: string[];
  languages: string[];
  image: string;
};

const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Kim Min-ji",
    location: "Seoul, Gangnam",
    rating: 4.9,
    reviews: 127,
    successRate: 98,
    price: "₩150,000",
    style: "Professional",
    specialty: ["E-7 Visa", "F-2-7 Points"],
    languages: ["English Native", "Korean Fluent"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Lee Dong-hyun",
    location: "Seoul, Jongno",
    rating: 4.8,
    reviews: 203,
    successRate: 96,
    price: "₩180,000",
    style: "Detailed",
    specialty: ["F-2 Specialist", "Family Reunion"],
    languages: ["Chinese Fluent", "English Advanced"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Park Ji-won",
    location: "Busan, Haeundae",
    rating: 4.9,
    reviews: 156,
    successRate: 97,
    price: "₩120,000",
    style: "Friendly",
    specialty: ["E-Visa", "D-10 Job Seeker"],
    languages: ["English Native"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "4",
    name: "Choi Sung-min",
    location: "Incheon, Songdo",
    rating: 4.7,
    reviews: 89,
    successRate: 95,
    price: "₩140,000",
    style: "Efficient",
    specialty: ["F-5 Permanent", "Investment Visa"],
    languages: ["English Advanced", "Japanese Fluent"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "5",
    name: "Jung Hye-jin",
    location: "Gyeonggi, Suwon",
    rating: 4.8,
    reviews: 134,
    successRate: 99,
    price: "₩160,000",
    style: "Thorough",
    specialty: ["D-2 Student", "E-7 Professional"],
    languages: ["Chinese Fluent", "Korean Native"],
    image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "6",
    name: "Kang Tae-young",
    location: "Daegu, Suseong",
    rating: 4.6,
    reviews: 78,
    successRate: 94,
    price: "₩110,000",
    style: "Patient",
    specialty: ["F-2-7 Points", "Marriage Visa"],
    languages: ["English Advanced"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "7",
    name: "Yoon Seo-yeon",
    location: "Jeju, Jeju City",
    rating: 4.9,
    reviews: 92,
    successRate: 97,
    price: "₩130,000",
    style: "Supportive",
    specialty: ["E-Visa", "Remote Work Visa"],
    languages: ["English Native", "Spanish Fluent"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80",
  },
];

const Experts = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filters = [
    "Seoul",
    "Gyeonggi",
    "Incheon",
    "Busan",
    "Daegu",
    "Jeju",
    "Professional",
    "Friendly",
    "Under ₩150K",
    "Above ₩150K",
    "English Native",
    "Chinese Fluent",
  ];

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredExperts = mockExperts.filter((expert) => {
    if (activeFilters.length === 0) return true;

    return activeFilters.every((filter) => {
      // Location filters
      if (
        ["Seoul", "Gyeonggi", "Incheon", "Busan", "Daegu", "Jeju"].includes(
          filter
        )
      ) {
        return expert.location.includes(filter);
      }
      // Style filters
      if (["Professional", "Friendly"].includes(filter)) {
        return expert.style === filter;
      }
      // Price filters
      if (filter === "Under ₩150K") {
        return parseInt(expert.price.replace(/[₩,]/g, "")) < 150000;
      }
      if (filter === "Above ₩150K") {
        return parseInt(expert.price.replace(/[₩,]/g, "")) >= 150000;
      }
      // Language filters
      if (["English Native", "Chinese Fluent"].includes(filter)) {
        return expert.languages.includes(filter);
      }
      return true;
    });
  });

  const handleBook = (expertName: string) => {
    toast.success(`Booking Request Sent to ${expertName}`, {
      description: "The expert will contact you shortly to confirm the time.",
    });
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
          <h1 className="font-bold text-foreground">Find Experts</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-5 py-4 shadow-card">
        <div className="mx-auto max-w-md">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <span className="text-muted-foreground">
                ({activeFilters.length} active)
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeFilters.includes(filter)
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "border border-border bg-white text-foreground hover:border-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experts List */}
      <div className="px-5 py-6">
        <div className="mx-auto max-w-md space-y-4">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="animate-fade-in rounded-3xl bg-white p-5 shadow-card transition-all hover:scale-[1.01] hover:shadow-soft"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">
                      {expert.name}
                    </h3>
                    <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {expert.location}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">
                          {expert.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({expert.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span className="font-semibold">
                          {expert.successRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {expert.specialty.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {expert.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Style:{" "}
                  <span className="font-medium text-foreground">
                    {expert.style}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <DollarSign className="h-4 w-4" />
                  {expert.price}
                </div>
              </div>

              <Button 
                onClick={() => handleBook(expert.name)}
                className="h-12 w-full rounded-2xl bg-primary font-semibold text-primary-foreground shadow-card hover:bg-primary/90"
              >
                Book Consultation
              </Button>
            </div>
          ))}

          {filteredExperts.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center shadow-card">
              <p className="text-muted-foreground">
                No experts found matching your filters. Try adjusting your
                selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experts;
