"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface RetailAssistantProps {
  onClose: () => void
}

export default function RetailAssistant({ onClose }: RetailAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hi there! I'm Retail 911, your retail knowledge assistant. Ask me anything about customer service, sales techniques, or any retail situation you're facing. I'm here to help you succeed!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question about customer engagement! The key is to make each interaction personal and show genuine interest in their needs.",
        "When dealing with difficult customers, remember to stay calm, listen actively, and focus on solutions rather than the problem.",
        "Product knowledge is crucial! I recommend reviewing the Level 1 materials on our product lineup and key features that customers care about.",
        "For upselling techniques, try focusing on complementary products that genuinely enhance the customer's original purchase.",
        "Active listening involves making eye contact, nodding to show understanding, and paraphrasing what the customer said to confirm you understood correctly.",
      ]

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <Card className="shadow-lg border-t-4 border-t-purple-500">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 bg-purple-100">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Retail 911" />
                <AvatarFallback className="bg-purple-100 text-purple-500">911</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Retail 911</h3>
                <p className="text-xs text-gray-500">Your retail knowledge assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-right mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask a question about retail skills..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-xs text-muted-foreground w-full mb-1">Try asking:</p>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 rounded-full"
                onClick={() => {
                  setInput("How do I handle a customer who wants to return an item without a receipt?")
                }}
              >
                Returns without receipt?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 rounded-full"
                onClick={() => {
                  setInput("What's the best way to introduce new products to customers?")
                }}
              >
                Introducing new products?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 rounded-full"
                onClick={() => {
                  setInput("Tips for dealing with angry customers?")
                }}
              >
                Dealing with angry customers?
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
