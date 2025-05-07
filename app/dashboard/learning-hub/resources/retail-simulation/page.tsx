"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameCanvas from "@/components/retail-game/game-canvas"

export default function RetailSimulationPage() {
  const [activeTab, setActiveTab] = useState("play")
  const [highScore, setHighScore] = useState(0)
  const [lastScore, setLastScore] = useState(0)
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [selectedScenario, setSelectedScenario] = useState<"greeting" | "assistance" | "checkout">("greeting")

  const handleGameComplete = (score: number) => {
    setLastScore(score)
    if (score > highScore) {
      setHighScore(score)
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/learning-hub/resources"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Resources
        </Link>
        <h1 className="text-3xl font-bold">Retail Floor Simulation</h1>
        <p className="text-muted-foreground mt-1">Practice customer engagement in a virtual retail environment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="play">Play</TabsTrigger>
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="scores">Scores</TabsTrigger>
            </TabsList>

            <TabsContent value="play" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Difficulty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedDifficulty === "easy" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty("easy")}
                        className="flex-1"
                      >
                        Easy
                      </Button>
                      <Button
                        variant={selectedDifficulty === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty("medium")}
                        className="flex-1"
                      >
                        Medium
                      </Button>
                      <Button
                        variant={selectedDifficulty === "hard" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty("hard")}
                        className="flex-1"
                      >
                        Hard
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedScenario === "greeting" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedScenario("greeting")}
                        className="flex-1"
                      >
                        Greeting
                      </Button>
                      <Button
                        variant={selectedScenario === "assistance" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedScenario("assistance")}
                        className="flex-1"
                      >
                        Help
                      </Button>
                      <Button
                        variant={selectedScenario === "checkout" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedScenario("checkout")}
                        className="flex-1"
                      >
                        Checkout
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Last Score</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{lastScore}</div>
                    {lastScore > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {lastScore >= 100 ? "Excellent!" : lastScore >= 50 ? "Good job!" : "Keep practicing!"}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <GameCanvas
                onComplete={handleGameComplete}
                difficulty={selectedDifficulty}
                scenarioType={selectedScenario}
              />
            </TabsContent>

            <TabsContent value="learn" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How to Play</CardTitle>
                  <CardDescription>Master the retail floor simulation game</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Game Objective</h3>
                    <p>
                      Your goal is to help customers in a retail environment, but with a twist: customers don't like
                      being approached directly. You need to be available without being pushy, letting customers
                      initiate the conversation when they're ready.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Controls</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Move your mouse to control the retail associate</li>
                      <li>Position yourself near customers, but not too close</li>
                      <li>Wait for customers to engage with you</li>
                      <li>Once engaged, stay with them until they're satisfied</li>
                      <li>Navigate around shelves and other obstacles</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Customer Behavior</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Browsing with question mark:</span> Customer needs help but will
                        walk away if approached directly
                      </li>
                      <li>
                        <span className="font-medium">Waiting (clock icon):</span> Customer has noticed you and is ready
                        to engage
                      </li>
                      <li>
                        <span className="font-medium">Being helped (speech bubble):</span> You're currently helping this
                        customer
                      </li>
                      <li>
                        <span className="font-medium">Satisfied (checkmark):</span> Customer has been helped
                        successfully
                      </li>
                      <li>
                        <span className="font-medium">Angry (exclamation):</span> Customer was approached too
                        aggressively or waited too long
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Scoring</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>+10 points for each satisfied customer</li>
                      <li>-5 points for each angry customer</li>
                      <li>Higher difficulty levels have more customers and less patience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tips for Success</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Position yourself where customers can see you, but don't crowd them</li>
                      <li>Be patient - let customers come to you when they're ready</li>
                      <li>Once a customer engages, stay with them until they're fully satisfied</li>
                      <li>Plan efficient paths through the store to be available to multiple customers</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("play")}>Start Playing</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real-World Skills</CardTitle>
                  <CardDescription>How this simulation helps you on the job</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Customer Awareness</h3>
                    <p>
                      The game teaches you to identify customers who need assistance without being intrusive, just like
                      in a real retail environment where reading body language is crucial.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Approachability</h3>
                    <p>
                      Learn to be available and approachable without overwhelming customers, allowing them to engage on
                      their terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Patience and Persistence</h3>
                    <p>
                      The simulation reinforces the importance of staying with customers through the entire help process
                      once they've engaged with you.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scores" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Performance</CardTitle>
                  <CardDescription>Track your progress and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full bg-yellow-100 p-6 mb-4">
                        <Trophy className="h-12 w-12 text-yellow-600" />
                      </div>
                      <h3 className="text-2xl font-bold">High Score: {highScore}</h3>
                      <p className="text-muted-foreground mt-1">
                        {highScore >= 200
                          ? "Expert Level!"
                          : highScore >= 100
                            ? "Advanced!"
                            : highScore >= 50
                              ? "Intermediate"
                              : "Beginner"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2">Achievements</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`p-3 rounded-lg border ${
                            highScore >= 50 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award className={`h-5 w-5 ${highScore >= 50 ? "text-green-500" : "text-gray-400"}`} />
                            <span className="font-medium">Approachable Associate</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Score 50+ points</p>
                        </div>

                        <div
                          className={`p-3 rounded-lg border ${
                            highScore >= 100 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award className={`h-5 w-5 ${highScore >= 100 ? "text-blue-500" : "text-gray-400"}`} />
                            <span className="font-medium">Customer Whisperer</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Score 100+ points</p>
                        </div>

                        <div
                          className={`p-3 rounded-lg border ${
                            highScore >= 200
                              ? "bg-purple-50 border-purple-200"
                              : "bg-gray-50 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award className={`h-5 w-5 ${highScore >= 200 ? "text-purple-500" : "text-gray-400"}`} />
                            <span className="font-medium">Retail Master</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Score 200+ points</p>
                        </div>

                        <div
                          className={`p-3 rounded-lg border ${
                            highScore >= 300
                              ? "bg-yellow-50 border-yellow-200"
                              : "bg-gray-50 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award className={`h-5 w-5 ${highScore >= 300 ? "text-yellow-500" : "text-gray-400"}`} />
                            <span className="font-medium">Legendary Associate</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Score 300+ points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("play")} className="w-full">
                    Play Again to Improve
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
              <CardDescription>Skills you'll develop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Customer Awareness</h3>
                  <p className="text-sm text-muted-foreground">Learn to identify which customers need help</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Approachability</h3>
                  <p className="text-sm text-muted-foreground">Be available without being pushy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">Customer Engagement</h3>
                  <p className="text-sm text-muted-foreground">Respond appropriately when customers initiate</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-medium">Store Navigation</h3>
                  <p className="text-sm text-muted-foreground">Move efficiently around the retail environment</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("learn")}>
                View Tutorial
              </Button>
              <Link href="/dashboard/learning-hub/resources" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse More Resources
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
