"use client"

import { useState } from "react"
import { Award } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AchievementBadgeProps {
  title: string
  description: string
  color: "purple" | "blue" | "green" | "yellow" | "red" | "orange"
  points: number
  unlocked?: boolean
}

export default function AchievementBadge({
  title,
  description,
  color,
  points,
  unlocked = true,
}: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorMap = {
    purple: "bg-purple-100 text-purple-500 dark:bg-purple-900/20 dark:text-purple-300",
    blue: "bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-300",
    green: "bg-green-100 text-green-500 dark:bg-green-900/20 dark:text-green-300",
    yellow: "bg-yellow-100 text-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-300",
    red: "bg-red-100 text-red-500 dark:bg-red-900/20 dark:text-red-300",
    orange: "bg-orange-100 text-orange-500 dark:bg-orange-900/20 dark:text-orange-300",
  }

  const badgeColorMap = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`relative overflow-hidden transition-all duration-300 ${
              unlocked ? "" : "grayscale opacity-50"
            } ${isHovered ? "scale-105" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center ${colorMap[color]}`}>
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
              <Badge className={`mt-3 ${badgeColorMap[color]} text-white`}>+{points} Points</Badge>
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
                  <Badge variant="outline" className="bg-background">
                    Locked
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{unlocked ? "Achievement unlocked!" : "Complete tasks to unlock this achievement"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
