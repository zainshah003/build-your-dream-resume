import { WorkExperience } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm = ({ data, onChange }: WorkExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {data.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-accent/60" />
          </div>
          <p className="text-sm font-medium">No work experience added yet</p>
          <p className="text-xs mt-1 opacity-70">Add your professional journey</p>
        </div>
      ) : (
        data.map((experience, index) => (
          <Card
            key={experience.id}
            className="p-5 space-y-4 border border-border/50 shadow-soft animate-slide-in rounded-xl hover:border-accent/30 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <h4 className="font-medium text-sm text-foreground">
                  Position {index + 1}
                </h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Company</Label>
                <Input
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Position</Label>
                <Input
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) =>
                  updateExperience(experience.id, "current", checked as boolean)
                }
              />
              <Label htmlFor={`current-${experience.id}`} className="text-sm cursor-pointer">
                I currently work here
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Textarea
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </Card>
        ))
      )}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 hover:border-accent hover:text-accent hover:bg-accent/5 rounded-xl h-12 font-medium transition-all"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
};
