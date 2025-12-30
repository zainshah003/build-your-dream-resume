import { Education } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No education added yet.</p>
        </div>
      ) : (
        data.map((education, index) => (
          <Card
            key={education.id}
            className="p-4 space-y-4 border border-border/50 shadow-soft animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-muted-foreground">
                Education {index + 1}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">School/University</Label>
              <Input
                placeholder="University Name"
                value={education.school}
                onChange={(e) => updateEducation(education.id, "school", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Degree</Label>
                <Input
                  placeholder="Bachelor's, Master's, etc."
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Field of Study</Label>
                <Input
                  placeholder="Computer Science"
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Start Date</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">End Date</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Description (optional)</Label>
              <Textarea
                placeholder="Relevant coursework, honors, activities..."
                value={education.description || ""}
                onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                className="min-h-[60px] resize-none"
              />
            </div>
          </Card>
        ))
      )}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed hover:border-accent hover:text-accent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};
