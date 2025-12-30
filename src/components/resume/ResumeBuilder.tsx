import { useState } from "react";
import { ResumeData, initialResumeData } from "@/types/resume";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { WorkExperienceForm } from "./WorkExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { ResumePreview } from "./ResumePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Briefcase, GraduationCap, Lightbulb, Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Opening print dialog. Choose 'Save as PDF' to download your resume.");
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="no-print sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-foreground">Resume Builder</h1>
              <p className="text-xs text-muted-foreground">Create your professional resume</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Download className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="no-print">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="personal" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="pr-4">
                  <TabsContent value="personal" className="mt-0">
                    <div className="bg-card rounded-lg p-6 shadow-soft border border-border/50">
                      <h2 className="text-lg font-serif font-semibold mb-4">Personal Information</h2>
                      <PersonalInfoForm
                        data={resumeData.personalInfo}
                        onChange={(personalInfo) =>
                          setResumeData({ ...resumeData, personalInfo })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="mt-0">
                    <div className="bg-card rounded-lg p-6 shadow-soft border border-border/50">
                      <h2 className="text-lg font-serif font-semibold mb-4">Work Experience</h2>
                      <WorkExperienceForm
                        data={resumeData.workExperience}
                        onChange={(workExperience) =>
                          setResumeData({ ...resumeData, workExperience })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <div className="bg-card rounded-lg p-6 shadow-soft border border-border/50">
                      <h2 className="text-lg font-serif font-semibold mb-4">Education</h2>
                      <EducationForm
                        data={resumeData.education}
                        onChange={(education) =>
                          setResumeData({ ...resumeData, education })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <div className="bg-card rounded-lg p-6 shadow-soft border border-border/50">
                      <h2 className="text-lg font-serif font-semibold mb-4">Skills</h2>
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={(skills) => setResumeData({ ...resumeData, skills })}
                      />
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <ScrollArea className="h-full">
              <ResumePreview data={resumeData} />
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};
