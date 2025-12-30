import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  const hasPersonalInfo =
    personalInfo.fullName ||
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.location;

  const hasContent =
    hasPersonalInfo ||
    workExperience.length > 0 ||
    education.length > 0 ||
    skills.length > 0;

  if (!hasContent) {
    return (
      <div className="print-resume bg-card min-h-[800px] p-8 shadow-elevated rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-serif">Your resume preview will appear here</p>
          <p className="text-sm mt-2">Start filling in your information on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="print-resume bg-card min-h-[800px] p-8 shadow-elevated rounded-lg animate-fade-in">
      {/* Header */}
      {hasPersonalInfo && (
        <header className="mb-6 pb-6 border-b border-border">
          {personalInfo.fullName && (
            <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">
              {personalInfo.fullName}
            </h1>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-accent" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-accent" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin className="h-3.5 w-3.5 text-accent" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-accent" />
                {personalInfo.website}
              </span>
            )}
          </div>

          {personalInfo.summary && (
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </header>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="animate-slide-in">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.position}</h3>
                    <p className="text-sm text-accent font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm text-foreground/80 mt-2 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="animate-slide-in">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-accent font-medium">{edu.school}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
