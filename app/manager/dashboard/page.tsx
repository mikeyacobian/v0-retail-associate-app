"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, BarChart3, BookOpen, ChevronRight, Clock, Home, LogOut, Menu, User, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
                href="/manager/dashboard"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/manager/team"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Users className="h-5 w-5" />
                Team
              </Link>
              <Link
                href="/manager/reports"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BarChart3 className="h-5 w-5" />
                Reports
              </Link>
              <Link
                href="/manager/profile"
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
          <Badge variant="outline">Manager</Badge>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/manager/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/manager/team" className="text-sm font-medium hover:underline underline-offset-4">
            Team
          </Link>
          <Link href="/manager/reports" className="text-sm font-medium hover:underline underline-offset-4">
            Reports
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50/40 md:block dark:bg-gray-800/40">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex items-center gap-2 px-3 py-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm">
                <div className="font-medium">Sarah Miller</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Store Manager</div>
              </div>
            </div>
            <nav className="grid gap-1 px-2 pt-2">
              <Link
                href="/manager/dashboard"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/manager/team"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Users className="h-4 w-4" />
                Team
              </Link>
              <Link
                href="/manager/reports"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BarChart3 className="h-4 w-4" />
                Reports
              </Link>
              <Link
                href="/manager/profile"
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
              <h1 className="text-2xl font-bold tracking-tight">Team Dashboard</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  Store #1234
                </Badge>
                <Badge className="bg-green-500 text-white hover:bg-green-600">12 Active Associates</Badge>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Team Completion</CardTitle>
                      <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">72%</div>
                      <Progress value={72} className="mt-2" />
                      <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Average course completion rate</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                      <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">10/12</div>
                      <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Associates active this week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
                      <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.3h</div>
                      <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Per associate this week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                      <Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">37</div>
                      <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Total badges earned this month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-4 grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Overview of your team's learning progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">John Doe</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Sales Associate</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">68% Complete</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Last active: Today</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                              <AvatarFallback>EJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Emma Johnson</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Sales Associate</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">92% Complete</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Last active: Yesterday</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                              <AvatarFallback>MS</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Michael Smith</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Sales Associate</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">45% Complete</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Last active: 3 days ago</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Team Members
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="progress" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>Track your team's progress across all learning modules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Customer Engagement Mastery</h3>
                          <Badge className="bg-green-500 text-white">75% Team Completion</Badge>
                        </div>
                        <Progress value={75} className="mt-2" />
                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Not Started</p>
                            <p className="text-lg font-bold">1</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">In Progress</p>
                            <p className="text-lg font-bold">3</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Completed</p>
                            <p className="text-lg font-bold">8</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Avg. Score</p>
                            <p className="text-lg font-bold">87%</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Product Knowledge Essentials</h3>
                          <Badge className="bg-blue-500 text-white">62% Team Completion</Badge>
                        </div>
                        <Progress value={62} className="mt-2" />
                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Not Started</p>
                            <p className="text-lg font-bold">2</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">In Progress</p>
                            <p className="text-lg font-bold">5</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Completed</p>
                            <p className="text-lg font-bold">5</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Avg. Score</p>
                            <p className="text-lg font-bold">79%</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Advanced Sales Techniques</h3>
                          <Badge className="bg-purple-500 text-white">41% Team Completion</Badge>
                        </div>
                        <Progress value={41} className="mt-2" />
                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Not Started</p>
                            <p className="text-lg font-bold">4</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">In Progress</p>
                            <p className="text-lg font-bold">6</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Completed</p>
                            <p className="text-lg font-bold">2</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                            <p className="text-xs font-medium">Avg. Score</p>
                            <p className="text-lg font-bold">72%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Achievements</CardTitle>
                    <CardDescription>Track badges and rewards earned by your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                          <Award className="h-8 w-8 text-purple-500" />
                        </div>
                        <h3 className="mt-2 font-semibold">Customer Whisperer</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          8 team members earned this badge
                        </p>
                        <Progress value={66} className="mt-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">8 of 12 team members</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                          <Award className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="mt-2 font-semibold">Product Expert</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          5 team members earned this badge
                        </p>
                        <Progress value={42} className="mt-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">5 of 12 team members</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                          <Award className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="mt-2 font-semibold">Sales Master</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          3 team members earned this badge
                        </p>
                        <Progress value={25} className="mt-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">3 of 12 team members</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                          <Award className="h-8 w-8 text-yellow-500" />
                        </div>
                        <h3 className="mt-2 font-semibold">Fast Learner</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          10 team members earned this badge
                        </p>
                        <Progress value={83} className="mt-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">10 of 12 team members</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                          <Award className="h-8 w-8 text-red-500" />
                        </div>
                        <h3 className="mt-2 font-semibold">Team Player</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          7 team members earned this badge
                        </p>
                        <Progress value={58} className="mt-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">7 of 12 team members</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                          <Award className="h-8 w-8 text-orange-500" />
                        </div>
                        <h3 className="mt-2 font-semibold">Perfect Score</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          4 team members earned this badge
                        </p>
                        <Progress value={33} className="mt-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">4 of 12 team members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
