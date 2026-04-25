"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Milestone, ContributorProgress } from "@/types/bounty";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Send, ExternalLink, Clock } from "lucide-react";

interface MilestoneSubmissionCardProps {
  milestones: Milestone[];
  contributorProgress: ContributorProgress;
  className?: string;
}

export function MilestoneSubmissionCard({
  milestones,
  contributorProgress,
  className,
}: MilestoneSubmissionCardProps) {
  // Find current milestone index
  const currentMilestoneIndex = milestones.findIndex(
    (m) => m.id === contributorProgress.currentMilestoneId,
  );

  return (
    <Card
      className={cn(
        "border-gray-800 bg-background-card/50 backdrop-blur-sm",
        className,
      )}
    >
      <CardHeader className="border-b border-gray-800/50">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          Your Progress
          <span className="text-xs font-normal text-muted-foreground ml-auto">
            {currentMilestoneIndex + 1} of {milestones.length} Milestones
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const isCompleted =
              index < currentMilestoneIndex || milestone.isCompleted;
            const isCurrent = index === currentMilestoneIndex;
            const isLocked = index > currentMilestoneIndex;

            return (
              <div
                key={milestone.id}
                className={cn(
                  "relative pl-8 pb-6 last:pb-0 group",
                  !isLocked &&
                    "hover:bg-primary/5 -mx-2 px-4 rounded-lg transition-colors",
                )}
              >
                {/* Vertical Line */}
                {index !== milestones.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-3.5 top-7 w-0.5 h-full -translate-x-1/2",
                      isCompleted ? "bg-primary" : "bg-gray-800",
                    )}
                  />
                )}

                {/* Status Icon */}
                <div
                  className={cn(
                    "absolute left-0 top-1 size-7 rounded-full border-2 flex items-center justify-center transition-all",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-background border-primary text-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                        : "bg-background border-gray-800 text-gray-600",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-4" />
                  ) : isCurrent ? (
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                  ) : (
                    <Circle className="size-4 fill-current opacity-20" />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h5
                      className={cn(
                        "text-sm font-semibold",
                        isLocked ? "text-gray-500" : "text-gray-200",
                      )}
                    >
                      {milestone.title}
                    </h5>
                    <p className="text-xs text-gray-500 line-clamp-1 group-hover:line-clamp-none transition-all">
                      {milestone.description || "No description provided."}
                    </p>
                  </div>

                  {isCurrent && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs border-primary/30 hover:bg-primary/10"
                      >
                        <ExternalLink className="size-3 mr-1.5" /> View Task
                      </Button>
                      <Button size="sm" className="h-8 text-xs font-bold">
                        <Send className="size-3 mr-1.5" /> Submit Work
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium uppercase tracking-wider">
                      <CheckCircle2 className="size-3" /> Completed
                    </div>
                  )}

                  {isLocked && (
                    <div className="flex items-center gap-1.5 text-gray-600 text-[10px] font-medium uppercase tracking-wider">
                      <Clock className="size-3" /> Locked
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
