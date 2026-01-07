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
    <div className="space-y-5 animate-fade-in">
      <div className="flex gap-3">
        <Input
          placeholder="Type a skill and press Enter..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 h-11 rounded-xl"
        />
        <Button
          type="button"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="shrink-0 h-11 w-11 rounded-xl bg-accent hover:bg-accent/90"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium animate-fade-in group cursor-default bg-gradient-to-r from-secondary to-secondary/80 border border-border/50 rounded-xl hover:border-accent/50 transition-all"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 opacity-50 hover:opacity-100 transition-opacity hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-accent/60" />
          </div>
          <p className="text-sm font-medium">No skills added yet</p>
          <p className="text-xs mt-1 opacity-70">Add skills to showcase your expertise</p>
        </div>
      )}

      {availableSuggestions.length > 0 && (
        <div className="pt-5 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Quick add</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 5).map((skill) => (
              <button
                key={skill}
                onClick={() => onChange([...data, skill])}
                className="text-sm px-3.5 py-1.5 rounded-xl border border-dashed border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all font-medium"
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
