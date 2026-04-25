"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Milestone, ContributorProgress } from "@/types/bounty";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  ArrowRight,
  MessageSquare,
  Coins,
  ChevronRight,
} from "lucide-react";

interface Model4MaintainerDashboardProps {
  milestones: Milestone[];
  contributors: ContributorProgress[];
  className?: string;
}

export function Model4MaintainerDashboard({
  milestones,
  contributors,
  className,
}: Model4MaintainerDashboardProps) {
  return (
    <Card
      className={cn(
        "border-gray-800 bg-background-card/50 backdrop-blur-sm",
        className,
      )}
    >
      <CardHeader className="border-b border-gray-800/50 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          Maintainer Dashboard
          <span className="text-xs font-normal text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Model 4 Management
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-800/50">
          {contributors.map((contributor) => {
            const currentMilestone = milestones.find(
              (m) => m.id === contributor.currentMilestoneId,
            );
            const currentMilestoneIndex = milestones.findIndex(
              (m) => m.id === contributor.currentMilestoneId,
            );
            const progressPercentage =
              ((currentMilestoneIndex + 1) / milestones.length) * 100;

            return (
              <div
                key={contributor.userId}
                className="p-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Contributor Info */}
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar className="size-10 border border-gray-700">
                      <AvatarImage src={contributor.userAvatarUrl} />
                      <AvatarFallback>
                        {contributor.userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h5 className="text-sm font-bold text-gray-100 truncate">
                        {contributor.userName}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-500 uppercase font-semibold">
                          Current:
                        </span>
                        <span className="text-xs text-primary font-medium">
                          {currentMilestone?.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="flex-1 max-w-xs hidden lg:block">
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <span className="text-gray-500 font-bold uppercase tracking-tighter">
                        Progress
                      </span>
                      <span className="text-gray-300">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)] transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <MessageSquare className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs border-gray-700 hover:bg-gray-800"
                    >
                      View Submissions
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 font-bold"
                    >
                      <Coins className="size-3 mr-1.5" /> Release Payment
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs font-bold"
                    >
                      Advance <ArrowRight className="size-3 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-primary/5 border-t border-gray-800/50 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
            <Trophy className="size-3 text-yellow-500" />
            <span>Total Winners Allowed: {contributors.length} / 5</span>
          </div>
          <div className="h-3 w-px bg-gray-800" />
          <Button
            variant="link"
            className="text-[10px] h-auto p-0 text-primary"
          >
            View All Applications <ChevronRight className="size-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
