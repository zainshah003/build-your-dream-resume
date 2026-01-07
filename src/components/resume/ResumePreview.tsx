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
      <div className="print-resume bg-card min-h-[850px] rounded-2xl shadow-elevated border border-border/30 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="text-center text-muted-foreground relative z-10 p-8">
          <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-0.5 bg-muted-foreground/30 rounded-full" />
          </div>
          <p className="text-xl font-serif font-medium mb-2">Your resume preview will appear here</p>
          <p className="text-sm opacity-70">Start filling in your information on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="print-resume bg-card min-h-[850px] rounded-2xl shadow-elevated border border-border/30 overflow-hidden animate-fade-in">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="p-8">
        {/* Header */}
        {hasPersonalInfo && (
          <header className="mb-8 pb-6 border-b-2 border-border/30 relative">
            {personalInfo.fullName && (
              <h1 className="text-4xl font-serif font-bold text-foreground mb-3 tracking-tight">
                {personalInfo.fullName}
              </h1>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {personalInfo.email && (
                <span className="flex items-center gap-2 hover:text-accent transition-colors">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="h-3 w-3 text-accent" />
                  </div>
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 hover:text-accent transition-colors">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-3 w-3 text-accent" />
                  </div>
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 hover:text-accent transition-colors">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-accent" />
                  </div>
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-2 hover:text-accent transition-colors">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <Linkedin className="h-3 w-3 text-accent" />
                  </div>
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-2 hover:text-accent transition-colors">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <Globe className="h-3 w-3 text-accent" />
                  </div>
                  {personalInfo.website}
                </span>
              )}
            </div>

            {personalInfo.summary && (
              <p className="mt-5 text-foreground/80 leading-relaxed text-[15px] bg-secondary/30 p-4 rounded-xl border-l-4 border-accent">
                {personalInfo.summary}
              </p>
            )}
          </header>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-serif font-bold text-foreground mb-5 flex items-center gap-3">
              <span className="h-8 w-1 bg-accent rounded-full" />
              Work Experience
            </h2>
            <div className="space-y-5">
              {workExperience.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="relative pl-4 border-l-2 border-border/40 hover:border-accent/40 transition-colors animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-accent" />
                  <div className="flex justify-between items-start mb-1.5 gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-[15px]">{exp.position}</h3>
                      <p className="text-sm text-accent font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-secondary/50 px-2.5 py-1 rounded-full">
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-foreground/75 mt-2 leading-relaxed whitespace-pre-line">
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
          <section className="mb-8">
            <h2 className="text-lg font-serif font-bold text-foreground mb-5 flex items-center gap-3">
              <span className="h-8 w-1 bg-accent rounded-full" />
              Education
            </h2>
            <div className="space-y-5">
              {education.map((edu, index) => (
                <div 
                  key={edu.id} 
                  className="relative pl-4 border-l-2 border-border/40 hover:border-accent/40 transition-colors animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-accent" />
                  <div className="flex justify-between items-start mb-1.5 gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-[15px]">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-sm text-accent font-medium">{edu.school}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-secondary/50 px-2.5 py-1 rounded-full">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-foreground/75 mt-2 leading-relaxed">
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
            <h2 className="text-lg font-serif font-bold text-foreground mb-5 flex items-center gap-3">
              <span className="h-8 w-1 bg-accent rounded-full" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="text-sm px-4 py-1.5 bg-gradient-to-r from-secondary to-secondary/70 text-secondary-foreground rounded-full font-medium border border-border/30 hover:border-accent/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};