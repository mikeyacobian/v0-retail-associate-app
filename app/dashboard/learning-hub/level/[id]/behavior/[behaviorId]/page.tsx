"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, MessageSquareText, Play } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoPlayer from "@/components/video-player"
import AudioPlayer from "@/components/audio-player"
import RetailAssistant from "@/components/retail-assistant"

// Mock data for behaviors
const behaviorData = {
  "active-listening": {
    id: "active-listening",
    title: "Active Listening",
    level: 1,
    levelName: "Retail Fundamentals",
    category: "Communication",
    description: "Learn how to truly hear and understand what customers are saying to better serve their needs.",
    progress: 75,
    sections: [
      {
        id: "video-lesson",
        title: "Video Lesson: Active Listening Fundamentals",
        type: "video",
        completed: true,
        points: 20,
      },
      {
        id: "interactive-practice",
        title: "Interactive Practice: Customer Scenarios",
        type: "interactive",
        completed: false,
        points: 30,
      },
      {
        id: "quick-quiz",
        title: "Quick Quiz: Test Your Knowledge",
        type: "quiz",
        completed: false,
        points: 15,
      },
      {
        id: "audio-tips",
        title: "Audio Tips: Expert Advice",
        type: "audio",
        completed: false,
        points: 10,
      },
    ],
    relatedBehaviors: ["greeting-customers", "handling-objections", "building-rapport"],
  },
  "greeting-customers": {
    id: "greeting-customers",
    title: "Greeting Customers",
    level: 1,
    levelName: "Retail Fundamentals",
    category: "Communication",
    description: "Learn how to make a positive first impression with every customer interaction.",
    progress: 100,
    sections: [
      {
        id: "video-lesson",
        title: "Video Lesson: First Impressions Matter",
        type: "video",
        completed: true,
        points: 20,
      },
      {
        id: "interactive-practice",
        title: "Interactive Practice: Greeting Scenarios",
        type: "interactive",
        completed: true,
        points: 30,
      },
      {
        id: "quick-quiz",
        title: "Quick Quiz: Test Your Knowledge",
        type: "quiz",
        completed: true,
        points: 15,
      },
    ],
    relatedBehaviors: ["active-listening", "building-rapport"],
  },
  "handling-objections": {
    id: "handling-objections",
    title: "Handling Objections",
    level: 2,
    levelName: "Advanced Customer Service",
    category: "Sales Techniques",
    description: "Learn effective strategies to address customer concerns and overcome objections.",
    progress: 50,
    sections: [
      {
        id: "video-lesson",
        title: "Video Lesson: Common Objections",
        type: "video",
        completed: true,
        points: 20,
      },
      {
        id: "interactive-practice",
        title: "Interactive Practice: Objection Scenarios",
        type: "interactive",
        completed: false,
        points: 30,
      },
      {
        id: "quick-quiz",
        title: "Quick Quiz: Test Your Knowledge",
        type: "quiz",
        completed: false,
        points: 15,
      },
    ],
    relatedBehaviors: ["active-listening", "upselling-techniques"],
  },
}

export default function BehaviorPage() {
  const params = useParams()
  const router = useRouter()
  const levelId = params.id as string
  const behaviorId = params.behaviorId as string
  const [activeTab, setActiveTab] = useState("learn")
  const [showAssistant, setShowAssistant] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  // Get behavior data
  const behavior = behaviorData[behaviorId as keyof typeof behaviorData]

  if (!behavior) {
    return <div className="p-8">Behavior not found</div>
  }

  const currentSection = behavior.sections[currentSectionIndex]

  const handleNextSection = () => {
    if (currentSectionIndex < behavior.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
    }
  }

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "purple"
      case 2:
        return "blue"
      case 3:
        return "green"
      default:
        return "gray"
    }
  }

  const levelColor = getLevelColor(behavior.level)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href={`/dashboard/learning-hub/level/${levelId}`} className="flex items-center gap-2 font-semibold">
          <ArrowLeft className="h-4 w-4" />
          Back to Level {levelId}
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative" onClick={() => setShowAssistant((prev) => !prev)}>
            <MessageSquareText className="h-5 w-5" />
            <span className="sr-only">Retail 911 Assistant</span>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500"></span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={`bg-${levelColor}-100 text-${levelColor}-500`}>Level {behavior.level}</Badge>
                  <Badge variant="outline">{behavior.category}</Badge>
                </div>
                <h1 className="text-2xl font-bold tracking-tight mt-2">{behavior.title}</h1>
                <p className="text-gray-500">{behavior.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`bg-${levelColor}-500 text-white`}>
                  +{behavior.sections.reduce((acc, section) => acc + section.points, 0)} Points
                </Badge>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="learn" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={`bg-${currentSection.completed ? "green" : "yellow"}-500 text-white`}>
                              {currentSection.completed ? "Completed" : "In Progress"}
                            </Badge>
                            <Badge variant="outline">{currentSection.type}</Badge>
                          </div>
                          <Badge className={`bg-${levelColor}-500 text-white`}>+{currentSection.points} Points</Badge>
                        </div>
                        <CardTitle className="mt-2">{currentSection.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {currentSection.type === "video" && (
                          <div className="space-y-4">
                            <VideoPlayer
                              src="#"
                              title="Active Listening Fundamentals"
                              poster="/placeholder.svg?height=480&width=854"
                            />
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold mb-2">Key Takeaways</h3>
                              <ul className="space-y-2 list-disc pl-5">
                                <li>Focus completely on the customer when they're speaking</li>
                                <li>Use verbal and non-verbal cues to show you're engaged</li>
                                <li>Ask clarifying questions to ensure understanding</li>
                                <li>Paraphrase what you've heard to confirm accuracy</li>
                                <li>Avoid interrupting or formulating responses while the customer is speaking</li>
                              </ul>
                            </div>
                          </div>
                        )}

                        {currentSection.type === "interactive" && (
                          <div className="space-y-4">
                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center p-6">
                                <h3 className="text-lg font-semibold mb-2">Customer Scenario Simulation</h3>
                                <p className="mb-4">
                                  Practice your active listening skills in realistic customer interactions
                                </p>
                                <Button size="lg">
                                  Start Simulation
                                  <Play className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold mb-2">What You'll Practice</h3>
                              <ul className="space-y-2 list-disc pl-5">
                                <li>Identifying customer needs through careful listening</li>
                                <li>Responding appropriately to emotional cues</li>
                                <li>Asking effective follow-up questions</li>
                                <li>Demonstrating empathy and understanding</li>
                              </ul>
                            </div>
                          </div>
                        )}

                        {currentSection.type === "quiz" && (
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Question 1 of 5</CardTitle>
                                <CardDescription>Select the best answer</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="mb-4">Which of the following is NOT an example of active listening?</p>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                                    <div className="h-4 w-4 rounded-full border"></div>
                                    <span>Nodding to show you're following along</span>
                                  </div>
                                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                                    <div className="h-4 w-4 rounded-full border"></div>
                                    <span>Thinking about what you'll say next while the customer is speaking</span>
                                  </div>
                                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                                    <div className="h-4 w-4 rounded-full border"></div>
                                    <span>Paraphrasing what the customer said to confirm understanding</span>
                                  </div>
                                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                                    <div className="h-4 w-4 rounded-full border"></div>
                                    <span>Asking clarifying questions</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button variant="outline" disabled>
                                  Previous
                                </Button>
                                <Button>Next Question</Button>
                              </CardFooter>
                            </Card>
                          </div>
                        )}

                        {currentSection.type === "audio" && (
                          <div className="space-y-4">
                            <AudioPlayer src="#" title="Expert Tips: Active Listening in Retail" />
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold mb-2">Audio Transcript</h3>
                              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                                <p className="mb-2">
                                  "Welcome to our expert tips on active listening in retail. Today we'll cover the most
                                  effective techniques to ensure you're truly hearing what your customers are saying..."
                                </p>
                                <p>
                                  "Remember, active listening isn't just about hearing words—it's about understanding
                                  the meaning, intent, and emotion behind those words..."
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={handlePrevSection} disabled={currentSectionIndex === 0}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Previous Section
                        </Button>
                        <Button
                          onClick={handleNextSection}
                          disabled={currentSectionIndex === behavior.sections.length - 1}
                        >
                          Next Section
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <div className="flex justify-center">
                      <div className="flex gap-1">
                        {behavior.sections.map((section, index) => (
                          <Button
                            key={section.id}
                            variant="ghost"
                            size="icon"
                            className={`rounded-full ${index === currentSectionIndex ? "bg-gray-200" : ""}`}
                            onClick={() => setCurrentSectionIndex(index)}
                          >
                            {section.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <span className="h-4 w-4 flex items-center justify-center text-xs">{index + 1}</span>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="practice" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Practice Activities</CardTitle>
                        <CardDescription>Reinforce your learning with these activities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Role Play Scenario</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Practice active listening with a customer who has a complex request.
                            </p>
                            <Button>Start Role Play</Button>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Listening Challenge</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Test your ability to recall details from customer conversations.
                            </p>
                            <Button>Take Challenge</Button>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Self-Assessment</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Evaluate your active listening skills and identify areas for improvement.
                            </p>
                            <Button>Start Assessment</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Additional Resources</CardTitle>
                        <CardDescription>Deepen your understanding with these materials</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">Active Listening Cheat Sheet</h3>
                              <p className="text-sm text-gray-500">Quick reference guide for your daily interactions</p>
                            </div>
                            <Button variant="outline">Download PDF</Button>
                          </div>

                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">Customer Conversation Examples</h3>
                              <p className="text-sm text-gray-500">Real-world examples of effective listening</p>
                            </div>
                            <Button variant="outline">View Examples</Button>
                          </div>

                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">Expert Interview</h3>
                              <p className="text-sm text-gray-500">
                                Tips from top retail customer service professionals
                              </p>
                            </div>
                            <Button variant="outline">Watch Video</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span>{behavior.progress}%</span>
                      </div>
                      <Progress value={behavior.progress} className="h-2" />

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Sections</h3>
                        <div className="space-y-2">
                          {behavior.sections.map((section) => (
                            <div
                              key={section.id}
                              className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                              onClick={() =>
                                setCurrentSectionIndex(behavior.sections.findIndex((s) => s.id === section.id))
                              }
                            >
                              <div className="flex items-center gap-2">
                                {section.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border border-gray-300" />
                                )}
                                <span className={section.completed ? "text-gray-500" : ""}>{section.title}</span>
                              </div>
                              <Badge variant="outline">{section.points} pts</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Related Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {behavior.relatedBehaviors.map((relatedId) => {
                        const related = behaviorData[relatedId as keyof typeof behaviorData]
                        if (!related) return null

                        return (
                          <Link
                            key={relatedId}
                            href={`/dashboard/learning-hub/level/${related.level}/behavior/${relatedId}`}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                          >
                            <div>
                              <h3 className="font-medium">{related.title}</h3>
                              <p className="text-xs text-gray-500">
                                Level {related.level} • {related.category}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Have questions about this skill or how to apply it?</p>
                    <Button className="w-full" onClick={() => setShowAssistant(true)}>
                      <MessageSquareText className="mr-2 h-4 w-4" />
                      Ask Retail 911
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showAssistant && <RetailAssistant onClose={() => setShowAssistant(false)} />}
    </div>
  )
}
