import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, ImagePlus, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = ["Basic Info", "Funding Goal", "Milestones", "Review"];

interface MilestoneInput {
  description: string;
  percentage: number;
}

export default function CreateCampaign() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("30");
  const [milestones, setMilestones] = useState<MilestoneInput[]>([
    { description: "", percentage: 50 },
    { description: "", percentage: 50 },
  ]);

  const totalPercentage = milestones.reduce((sum, m) => sum + m.percentage, 0);

  const addMilestone = () => {
    if (milestones.length < 5) {
      setMilestones([...milestones, { description: "", percentage: 0 }]);
    }
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 2) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index: number, field: keyof MilestoneInput, value: string | number) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const canNext = () => {
    switch (step) {
      case 0: return title.length > 0 && description.length > 0;
      case 1: return Number(goal) > 0;
      case 2: return totalPercentage === 100 && milestones.every((m) => m.description.length > 0);
      default: return true;
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-12">
        <h1 className="font-display text-3xl font-bold">Create Campaign</h1>
        <p className="mt-2 text-muted-foreground">Launch your project on Bitcoin</p>

        {/* Step Indicator */}
        <div className="mt-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                i < step ? "bg-success text-background" : i === step ? "gradient-orange text-primary-foreground" : "border border-muted-foreground/30 text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-sm sm:inline ${i === step ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="mx-2 h-px w-6 bg-border" />}
            </div>
          ))}
        </div>

        <Card className="mt-8 border-border bg-card">
          <CardContent className="p-6">
            {/* Step 1: Basic Info */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Campaign Title</label>
                  <Input
                    placeholder="e.g. Decentralized Bitcoin Marketplace"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 64))}
                    className="bg-secondary border-border"
                    maxLength={64}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{title.length}/64 characters</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <textarea
                    placeholder="Describe your project, goals, and how funds will be used..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="flex w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Banner Image</label>
                  <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 cursor-pointer hover:border-primary/30 transition-colors">
                    <div className="text-center text-muted-foreground">
                      <ImagePlus className="mx-auto h-8 w-8 mb-2" />
                      <p className="text-sm">Click or drag to upload</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Funding Goal */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Funding Goal</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="10000"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="pr-16 bg-secondary border-border text-lg font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">STX</span>
                  </div>
                  {Number(goal) > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      ≈ ${(Number(goal) * 0.45).toLocaleString()} USD
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Campaign Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Milestones */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Define Milestones</p>
                    <p className="text-xs text-muted-foreground">Allocate 100% of funds across milestones</p>
                  </div>
                  <Badge className={totalPercentage === 100 ? "bg-success/20 text-success border-success/30 border" : "bg-destructive/20 text-destructive border-destructive/30 border"}>
                    {totalPercentage}%
                  </Badge>
                </div>
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-muted-foreground/30 text-xs text-muted-foreground mt-1">
                      {i + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder={`Milestone ${i + 1} description`}
                        value={m.description}
                        onChange={(e) => updateMilestone(i, "description", e.target.value)}
                        className="bg-secondary border-border"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={m.percentage}
                          onChange={(e) => updateMilestone(i, "percentage", Number(e.target.value))}
                          className="w-24 bg-secondary border-border font-mono"
                          min={1}
                          max={100}
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    {milestones.length > 2 && (
                      <Button variant="ghost" size="icon" onClick={() => removeMilestone(i)} className="text-muted-foreground hover:text-destructive mt-1">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {milestones.length < 5 && (
                  <Button variant="outline" onClick={addMilestone} className="w-full gap-2 border-border border-dashed">
                    <Plus className="h-4 w-4" /> Add Milestone
                  </Button>
                )}
              </div>
            )}

            {/* Step 4: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
                  ⚠️ Once launched, campaign details cannot be changed. Please review carefully.
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Title</p>
                    <p className="font-semibold text-foreground mt-1">{title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Goal</p>
                    <p className="font-semibold text-foreground mt-1 font-mono">{Number(goal).toLocaleString()} STX</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Duration</p>
                    <p className="font-semibold text-foreground mt-1">{duration} days</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Milestones</p>
                    {milestones.map((m, i) => (
                      <div key={i} className="flex justify-between py-1 text-sm">
                        <span className="text-foreground">{m.description}</span>
                        <span className="font-mono text-muted-foreground">{m.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="gap-2 border-border"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canNext()}
                  className="gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button className="gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90 animate-pulse-glow">
                  🚀 Launch Campaign
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
