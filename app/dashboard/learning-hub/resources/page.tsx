"use client"

import Link from "next/link"
import { ArrowLeft, Search, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/learning-hub"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Learning Hub
        </Link>
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <p className="text-muted-foreground mt-1">Browse our collection of training materials and interactive tools</p>
      </div>

      <div className="relative flex-1 mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-100 text-blue-500">Video</Badge>
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-2">Active Listening Masterclass</CardTitle>
            <CardDescription>15 min • Communication</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Expert techniques to improve your listening skills with customers.</p>
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
            <p className="text-sm text-gray-500">Practice identifying and adapting to different customer types.</p>
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
            <p className="text-sm text-gray-500">Quick responses to common customer objections and concerns.</p>
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
    </div>
  )
}
