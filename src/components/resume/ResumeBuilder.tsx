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
import { User, Briefcase, GraduationCap, Lightbulb, Download, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState("personal");

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Opening print dialog. Choose 'Save as PDF' to download your resume.");
    window.print();
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="no-print sticky top-0 z-10 glass-panel border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-semibold text-foreground tracking-tight flex items-center gap-2">
                Resume Builder
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              </h1>
              <p className="text-sm text-muted-foreground">Craft your professional story</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint}
              className="hover-lift"
            >
              <Download className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              size="sm" 
              onClick={handleDownload}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="no-print space-y-6">
            {/* Tab Navigation */}
            <div className="glass-panel rounded-2xl p-2 shadow-soft">
              <div className="grid grid-cols-4 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl
                        transition-all duration-300 font-medium text-sm
                        ${isActive 
                          ? "bg-primary text-primary-foreground shadow-lg" 
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "animate-fade-in" : ""}`} />
                      <span className="hidden sm:block">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="pr-4 space-y-6">
                  <TabsContent value="personal" className="mt-0">
                    <div className="gradient-border rounded-2xl p-6 shadow-soft hover-lift">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif font-semibold">Personal Information</h2>
                          <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                        </div>
                      </div>
                      <PersonalInfoForm
                        data={resumeData.personalInfo}
                        onChange={(personalInfo) =>
                          setResumeData({ ...resumeData, personalInfo })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="mt-0">
                    <div className="gradient-border rounded-2xl p-6 shadow-soft hover-lift">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif font-semibold">Work Experience</h2>
                          <p className="text-sm text-muted-foreground">Showcase your career journey</p>
                        </div>
                      </div>
                      <WorkExperienceForm
                        data={resumeData.workExperience}
                        onChange={(workExperience) =>
                          setResumeData({ ...resumeData, workExperience })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <div className="gradient-border rounded-2xl p-6 shadow-soft hover-lift">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif font-semibold">Education</h2>
                          <p className="text-sm text-muted-foreground">Your academic background</p>
                        </div>
                      </div>
                      <EducationForm
                        data={resumeData.education}
                        onChange={(education) =>
                          setResumeData({ ...resumeData, education })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <div className="gradient-border rounded-2xl p-6 shadow-soft hover-lift">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif font-semibold">Skills</h2>
                          <p className="text-sm text-muted-foreground">Highlight your expertise</p>
                        </div>
                      </div>
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
          <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-160px)]">
            <div className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Preview</h3>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <ScrollArea className="h-[calc(100%-2rem)]">
                <ResumePreview data={resumeData} />
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};