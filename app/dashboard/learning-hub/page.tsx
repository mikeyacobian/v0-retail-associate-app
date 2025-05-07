"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, Filter, Home, Search, Star, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearningHubPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
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
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/learning-hub"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
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
            </nav>

            <div className="mt-6">
              <h3 className="mb-2 px-3 text-sm font-medium">Learning Levels</h3>
              <nav className="grid gap-1 px-2">
                <Link
                  href="/dashboard/learning-hub/level/1"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <Badge className="bg-purple-100 text-purple-500 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300">
                    1
                  </Badge>
                  <span>Retail Fundamentals</span>
                </Link>
                <Link
                  href="/dashboard/learning-hub/level/2"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300">
                    2
                  </Badge>
                  <span>Advanced Customer Service</span>
                </Link>
                <Link
                  href="/dashboard/learning-hub/level/3"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <Badge className="bg-green-100 text-green-500 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300">
                    3
                  </Badge>
                  <span>Expert Retail Skills</span>
                </Link>
              </nav>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 px-3 text-sm font-medium">Categories</h3>
              <nav className="grid gap-1 px-2">
                <Link
                  href="/dashboard/learning-hub/category/communication"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <span>Communication</span>
                  <Badge variant="outline">12</Badge>
                </Link>
                <Link
                  href="/dashboard/learning-hub/category/sales"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <span>Sales Techniques</span>
                  <Badge variant="outline">8</Badge>
                </Link>
                <Link
                  href="/dashboard/learning-hub/category/product"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <span>Product Knowledge</span>
                  <Badge variant="outline">10</Badge>
                </Link>
                <Link
                  href="/dashboard/learning-hub/category/conflict"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <span>Conflict Resolution</span>
                  <Badge variant="outline">6</Badge>
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Learning Hub</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  18 of 36 Skills Mastered
                </Badge>
                <Badge className="bg-purple-500 text-white hover:bg-purple-600">50% Complete</Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for skills, topics, or behaviors..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="flex gap-2 items-center">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="levels" className="w-full">
              <TabsList>
                <TabsTrigger value="levels">Learning Levels</TabsTrigger>
                <TabsTrigger value="behaviors">Behaviors</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="levels" className="space-y-6">
                <div className="grid gap-6 mt-6">
                  <Card className="overflow-hidden">
                    <div className="md:flex">
                      <div className="bg-gradient-to-br from-purple-400 to-purple-600 md:w-1/3 p-6 flex flex-col justify-between">
                        <div>
                          <Badge className="bg-white text-purple-600 mb-2">Level 1</Badge>
                          <h2 className="text-2xl font-bold text-white mb-2">Retail Fundamentals</h2>
                          <p className="text-purple-100">Master the essential skills every retail associate needs</p>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Progress</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} className="h-2 bg-purple-300" />
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-lg font-semibold mb-4">Core Behaviors</h3>
                        <div className="grid gap-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Greeting Customers</h4>
                                <p className="text-sm text-gray-500">Make a positive first impression</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white">Completed</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Active Listening</h4>
                                <p className="text-sm text-gray-500">Understand customer needs</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white">Completed</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Product Knowledge</h4>
                                <p className="text-sm text-gray-500">Know what you're selling</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white">Completed</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-yellow-100 text-yellow-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Handling Basic Questions</h4>
                                <p className="text-sm text-gray-500">Answer common customer inquiries</p>
                              </div>
                            </div>
                            <Badge className="bg-yellow-500 text-white">In Progress</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Checkout Process</h4>
                                <p className="text-sm text-gray-500">Complete transactions smoothly</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Link href="/dashboard/learning-hub/level/1">
                            <Button className="w-full">
                              Continue Level 1
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="md:flex">
                      <div className="bg-gradient-to-br from-blue-400 to-blue-600 md:w-1/3 p-6 flex flex-col justify-between">
                        <div>
                          <Badge className="bg-white text-blue-600 mb-2">Level 2</Badge>
                          <h2 className="text-2xl font-bold text-white mb-2">Advanced Customer Service</h2>
                          <p className="text-blue-100">Elevate your customer interactions to the next level</p>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Progress</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2 bg-blue-300" />
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-lg font-semibold mb-4">Core Behaviors</h3>
                        <div className="grid gap-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Personalized Recommendations</h4>
                                <p className="text-sm text-gray-500">Tailor suggestions to customer needs</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white">Completed</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Handling Objections</h4>
                                <p className="text-sm text-gray-500">Address customer concerns effectively</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white">Completed</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-yellow-100 text-yellow-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Upselling Techniques</h4>
                                <p className="text-sm text-gray-500">Increase transaction value ethically</p>
                              </div>
                            </div>
                            <Badge className="bg-yellow-500 text-white">In Progress</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Customer Personality Types</h4>
                                <p className="text-sm text-gray-500">Adapt to different customer styles</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Handling Difficult Situations</h4>
                                <p className="text-sm text-gray-500">Turn complaints into opportunities</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Link href="/dashboard/learning-hub/level/2">
                            <Button className="w-full">
                              Continue Level 2
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="md:flex">
                      <div className="bg-gradient-to-br from-green-400 to-green-600 md:w-1/3 p-6 flex flex-col justify-between">
                        <div>
                          <Badge className="bg-white text-green-600 mb-2">Level 3</Badge>
                          <h2 className="text-2xl font-bold text-white mb-2">Expert Retail Skills</h2>
                          <p className="text-green-100">Master advanced techniques to become a retail leader</p>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Progress</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-2 bg-green-300" />
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-lg font-semibold mb-4">Core Behaviors</h3>
                        <div className="grid gap-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Building Long-term Relationships</h4>
                                <p className="text-sm text-gray-500">Create loyal customer connections</p>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white">Completed</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Advanced Conflict Resolution</h4>
                                <p className="text-sm text-gray-500">Handle complex customer issues</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Consultative Selling</h4>
                                <p className="text-sm text-gray-500">Become a trusted advisor to customers</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Mentoring Others</h4>
                                <p className="text-sm text-gray-500">Help develop team members' skills</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center p-0">
                                <Star className="h-4 w-4" />
                              </Badge>
                              <div>
                                <h4 className="font-medium">Creating Exceptional Experiences</h4>
                                <p className="text-sm text-gray-500">Go beyond customer expectations</p>
                              </div>
                            </div>
                            <Badge variant="outline">Not Started</Badge>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Link href="/dashboard/learning-hub/level/3">
                            <Button className="w-full">
                              Continue Level 3
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="behaviors" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                  {/* Behavior cards would go here */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-500">Level 1</Badge>
                        <Badge className="bg-green-500 text-white">Completed</Badge>
                      </div>
                      <CardTitle className="mt-2">Active Listening</CardTitle>
                      <CardDescription>Communication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Learn techniques to truly hear and understand what customers are saying.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Review
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-500">Level 2</Badge>
                        <Badge className="bg-yellow-500 text-white">In Progress</Badge>
                      </div>
                      <CardTitle className="mt-2">Upselling Techniques</CardTitle>
                      <CardDescription>Sales Techniques</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Ethically increase transaction value by suggesting complementary products.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Continue</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-500">Level 3</Badge>
                        <Badge variant="outline">Not Started</Badge>
                      </div>
                      <CardTitle className="mt-2">Consultative Selling</CardTitle>
                      <CardDescription>Sales Techniques</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Become a trusted advisor to customers through needs-based selling.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                  {/* Resource cards would go here */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-500">Video</Badge>
                        <Button variant="ghost" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">Active Listening Masterclass</CardTitle>
                      <CardDescription>15 min • Communication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Expert techniques to improve your listening skills with customers.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Watch Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-500">Interactive</Badge>
                        <Button variant="ghost" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">Customer Personality Simulator</CardTitle>
                      <CardDescription>10 min • Customer Psychology</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Practice identifying and adapting to different customer types.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Try Simulation</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-500">Quick Reference</Badge>
                        <Button variant="ghost" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">Objection Handling Cheat Sheet</CardTitle>
                      <CardDescription>5 min • Sales Techniques</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Quick responses to common customer objections and concerns.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Guide</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-500">Interactive</Badge>
                        <Button variant="ghost" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">Retail Floor Simulation</CardTitle>
                      <CardDescription>15 min • Customer Service</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Practice customer interactions in a virtual store environment using mouse controls.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/dashboard/learning-hub/resources/retail-simulation">
                        <Button className="w-full">Play Game</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
