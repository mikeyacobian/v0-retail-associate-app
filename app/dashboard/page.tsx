"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, BookOpen, Clock, Home, LogOut, Menu, Search, User, Users, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import RetailAssistant from "@/components/retail-assistant"

export default function DashboardPage() {
  const isMobile = useMobile()
  const [progress, setProgress] = useState(0)
  const [showAssistant, setShowAssistant] = useState(false)

  // Simulate progress loading animation
  useEffect(() => {
    const timer = setTimeout(() => setProgress(68), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/learning-hub"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BookOpen className="h-5 w-5" />
                Learning Hub
              </Link>
              <Link
                href="/dashboard/achievements"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Award className="h-5 w-5" />
                Achievements
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg font-bold">RetailPro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/dashboard/learning-hub" className="text-sm font-medium hover:underline underline-offset-4">
            Learning Hub
          </Link>
          <Link href="/dashboard/achievements" className="text-sm font-medium hover:underline underline-offset-4">
            Achievements
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <div className="px-2 py-6">
                <div className="flex w-full items-center space-x-2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input type="search" placeholder="Search for skills, topics, or questions..." className="flex-1" />
                </div>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium">Recent Searches</h3>
                    <div className="mt-2 space-y-1">
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                        Active listening techniques
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                        Handling customer objections
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                        Product knowledge quiz
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Popular Topics</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="hover:bg-secondary cursor-pointer">
                        Customer Service
                      </Badge>
                      <Badge variant="outline" className="hover:bg-secondary cursor-pointer">
                        Sales Techniques
                      </Badge>
                      <Badge variant="outline" className="hover:bg-secondary cursor-pointer">
                        Conflict Resolution
                      </Badge>
                      <Badge variant="outline" className="hover:bg-secondary cursor-pointer">
                        Product Knowledge
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50/40 md:block dark:bg-gray-800/40">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex items-center gap-2 px-3 py-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Sales Associate</div>
              </div>
            </div>
            <nav className="grid gap-1 px-2 pt-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/learning-hub"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BookOpen className="h-4 w-4" />
                Learning Hub
              </Link>
              <Link
                href="/dashboard/achievements"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Award className="h-4 w-4" />
                Achievements
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  Level 3
                </Badge>
                <Badge className="bg-purple-500 text-white hover:bg-purple-600">680 Points</Badge>
              </div>
            </div>

            <div className="grid gap-6">
              <Card className="border-2 border-purple-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-purple-100">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Retail 911" />
                        <AvatarFallback className="bg-purple-100 text-purple-500">911</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">Retail 911 Assistant</CardTitle>
                        <CardDescription>Ask me anything about retail skills</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Online</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm">
                      👋 <span className="font-medium">Hi John!</span> I'm here to help with any retail questions you
                      have. You can ask me about customer service techniques, product knowledge, or how to handle
                      specific situations.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ask a question about retail skills..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setShowAssistant(true)
                        }
                      }}
                    />
                    <Button onClick={() => setShowAssistant(true)}>
                      <Send className="h-4 w-4 mr-2" />
                      Ask
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full"
                      onClick={() => setShowAssistant(true)}
                    >
                      How do I handle difficult customers?
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full"
                      onClick={() => setShowAssistant(true)}
                    >
                      Tips for active listening?
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full"
                      onClick={() => setShowAssistant(true)}
                    >
                      Upselling techniques?
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card className="border-2 border-purple-200 mb-4">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Award className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle className="text-base">New! Retail Floor Simulation</CardTitle>
                        <CardDescription>Practice your customer service skills</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">
                    Control a retail associate with your mouse and help customers in this interactive training game.
                    Balance your time between multiple customers to maximize your score!
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/learning-hub/resources/retail-simulation" className="w-full">
                    <Button className="w-full">Play Now</Button>
                  </Link>
                </CardFooter>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                    <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <Progress value={progress} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">7 of 12 modules completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                    <Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">3 new badges this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5.2h</div>
                    <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">This week (↑12% from last week)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Team Rank</CardTitle>
                    <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">#3</div>
                    <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Out of 12 team members</p>
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
