"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight, Play } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState("content")

  // Course data would normally come from an API
  const courseData = {
    "customer-engagement": {
      title: "Customer Engagement Mastery",
      description: "Learn how to effectively engage with customers to build rapport and trust",
      progress: 75,
      modules: [
        { id: 1, title: "Understanding Customer Needs", completed: true },
        { id: 2, title: "Active Listening Techniques", completed: true },
        { id: 3, title: "Building Rapport", completed: true },
        { id: 4, title: "Personalized Recommendations", completed: true },
        { id: 5, title: "Handling Objections", completed: false, current: true },
        { id: 6, title: "Closing Techniques", completed: false },
      ],
      currentModule: {
        title: "Handling Objections",
        description: "Learn how to address customer concerns and objections effectively",
        videoUrl: "#",
        points: 50,
      },
    },
    "product-knowledge": {
      title: "Product Knowledge Essentials",
      description: "Master the details of your product lineup to better serve customers",
      progress: 30,
      modules: [
        { id: 1, title: "Product Categories Overview", completed: true },
        { id: 2, title: "Feature Presentation", completed: false, current: true },
        { id: 3, title: "Comparing Products", completed: false },
        { id: 4, title: "Technical Specifications", completed: false },
      ],
      currentModule: {
        title: "Feature Presentation",
        description: "Learn how to effectively present product features and benefits",
        videoUrl: "#",
        points: 40,
      },
    },
    "sales-techniques": {
      title: "Advanced Sales Techniques",
      description: "Take your sales skills to the next level with proven techniques",
      progress: 15,
      modules: [
        { id: 1, title: "Building Rapport", completed: false, current: true },
        { id: 2, title: "Needs Assessment", completed: false },
        { id: 3, title: "Solution Presentation", completed: false },
        { id: 4, title: "Overcoming Objections", completed: false },
        { id: 5, title: "Closing the Sale", completed: false },
      ],
      currentModule: {
        title: "Building Rapport",
        description: "Learn techniques to quickly establish trust with customers",
        videoUrl: "#",
        points: 30,
      },
    },
  }

  const course = courseData[slug as keyof typeof courseData]

  if (!course) {
    return <div className="p-8">Course not found</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="hidden md:inline-flex">
            {course.progress}% Complete
          </Badge>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="grid flex-1 items-start gap-4 p-4 md:grid-cols-[240px_1fr] md:gap-8 md:p-6">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Progress</div>
                  <div className="font-medium">{course.progress}%</div>
                </div>
                <Progress value={course.progress} />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="grid w-full gap-2">
                <div className="font-semibold">Modules</div>
                <div className="grid gap-1">
                  {course.modules.map((module) => (
                    <div
                      key={module.id}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                        module.current
                          ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-50"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {module.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600" />
                      )}
                      <span className={module.completed ? "text-gray-500 line-through" : ""}>{module.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{course.currentModule.title}</CardTitle>
                  <CardDescription>{course.currentModule.description}</CardDescription>
                </div>
                <Badge className="bg-purple-500 text-white hover:bg-purple-600">
                  +{course.currentModule.points} Points
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="pt-4">
                  <div className="aspect-video overflow-hidden rounded-lg bg-black">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <Button size="icon" variant="ghost" className="h-16 w-16 rounded-full bg-white/10 text-white">
                          <Play className="h-8 w-8" />
                        </Button>
                        <p className="mt-4 text-white">Click to play video lesson</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Key Learning Points</h3>
                      <ul className="mt-2 grid gap-2 pl-6">
                        <li>Identify common customer objections in retail settings</li>
                        <li>Learn techniques to address price concerns effectively</li>
                        <li>Practice turning objections into opportunities</li>
                        <li>Master the art of providing alternatives when needed</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Supplementary Materials</h3>
                      <div className="mt-2 grid gap-2">
                        <Button variant="outline" className="justify-start">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Objection Handling Cheat Sheet
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Common Objections Reference
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="quiz" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Module Quiz</CardTitle>
                      <CardDescription>Test your knowledge of objection handling techniques</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Question 1 of 5</h3>
                        <p className="mt-2">
                          When a customer says "This is too expensive," what is the best first response?
                        </p>
                        <div className="mt-4 grid gap-2">
                          <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600" />
                            <span>Immediately offer a discount</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600" />
                            <span>Ask what their budget is</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600" />
                            <span>Acknowledge their concern and ask what they're comparing it to</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600" />
                            <span>Show them a cheaper alternative immediately</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" disabled>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="practice" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Role-Play Scenario</CardTitle>
                      <CardDescription>
                        Practice handling objections in a simulated customer interaction
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Scenario: Premium Product Objection</h3>
                        <p className="mt-2">
                          A customer is interested in a premium product but expresses concern about the price. They say:
                          "I like this, but I can find something similar for much less elsewhere."
                        </p>
                        <div className="mt-4">
                          <h4 className="font-medium">Your Response:</h4>
                          <textarea
                            className="mt-2 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={4}
                            placeholder="Type your response to the customer..."
                          ></textarea>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-medium">Tips:</h4>
                          <ul className="mt-2 grid gap-1 pl-6">
                            <li>Acknowledge their concern without being defensive</li>
                            <li>Highlight unique value propositions of your product</li>
                            <li>Ask questions to understand their specific needs</li>
                            <li>Consider discussing total cost of ownership, not just purchase price</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Submit Response for Feedback</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Module
              </Button>
              <Button>
                Complete & Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
