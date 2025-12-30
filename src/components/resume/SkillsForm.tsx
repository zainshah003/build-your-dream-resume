import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Lightbulb } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    "JavaScript",
    "React",
    "TypeScript",
    "Python",
    "Project Management",
    "Communication",
    "Problem Solving",
    "Leadership",
  ];

  const availableSuggestions = suggestedSkills.filter(
    (skill) => !data.includes(skill)
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium animate-fade-in group cursor-default"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No skills added yet.</p>
        </div>
      )}

      {availableSuggestions.length > 0 && (
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 5).map((skill) => (
              <button
                key={skill}
                onClick={() => onChange([...data, skill])}
                className="text-xs px-2.5 py-1 rounded-full border border-dashed border-border hover:border-accent hover:text-accent transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
