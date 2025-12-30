import { PersonalInfo } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
          <User className="h-4 w-4 text-accent" />
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={data.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="h-4 w-4 text-accent" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4 text-accent" />
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="h-4 w-4 text-accent" />
          Location
        </Label>
        <Input
          id="location"
          placeholder="San Francisco, CA"
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium">
            <Linkedin className="h-4 w-4 text-accent" />
            LinkedIn (optional)
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4 text-accent" />
            Website (optional)
          </Label>
          <Input
            id="website"
            placeholder="johndoe.com"
            value={data.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          placeholder="A brief summary of your professional background and career objectives..."
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
};
