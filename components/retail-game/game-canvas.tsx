"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { GameState } from "./game-types"
import { renderGameScene } from "./game-renderer"
import { updateGameState, initializeGameState } from "./game-logic"

interface GameCanvasProps {
  onComplete: (score: number) => void
  difficulty?: "easy" | "medium" | "hard"
  scenarioType?: "greeting" | "assistance" | "checkout"
}

export default function GameCanvas({ onComplete, difficulty = "easy", scenarioType = "greeting" }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds game
  const [gameStatus, setGameStatus] = useState<"loading" | "tutorial" | "playing" | "paused" | "gameOver">("loading")
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  const { toast } = useToast()

  // Animation frame ID ref for cleanup
  const animationFrameIdRef = useRef<number>(0)

  // Timer ref for cleanup
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Mouse position ref
  const mousePositionRef = useRef({ x: 0, y: 0 })

  // Initialize game state once on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const initialState = initializeGameState(canvas.width, canvas.height, difficulty)
    gameStateRef.current = initialState
    setGameStatus("loading")
    setTimeLeft(difficulty === "easy" ? 60 : difficulty === "medium" ? 90 : 120)

    // Load assets
    const imageUrls = {
      // Tile sprites
      tiles: "/placeholder.svg?height=64&width=320&text=Tiles",

      // Character sprites
      associate: "/placeholder.svg?height=192&width=128&text=Associate",
      customer1: "/placeholder.svg?height=192&width=128&text=C1",
      customer2: "/placeholder.svg?height=192&width=128&text=C2",
      customer3: "/placeholder.svg?height=192&width=128&text=C3",
      customer4: "/placeholder.svg?height=192&width=128&text=C4",
      customer5: "/placeholder.svg?height=192&width=128&text=C5",
      customer6: "/placeholder.svg?height=192&width=128&text=C6",

      // UI icons
      questionIcon: "/placeholder.svg?height=32&width=32&text=?",
      waitingIcon: "/placeholder.svg?height=32&width=32&text=⏱",
      helpedIcon: "/placeholder.svg?height=32&width=32&text=💬",
      satisfiedIcon: "/placeholder.svg?height=32&width=32&text=✓",
      angryIcon: "/placeholder.svg?height=32&width=32&text=!",
    }

    const images: Record<string, HTMLImageElement> = {}
    let imagesLoaded = 0
    const totalImages = Object.keys(imageUrls).length

    Object.entries(imageUrls).forEach(([key, url]) => {
      const img = new Image()
      img.crossOrigin = "anonymous" // Avoid CORS issues
      img.onload = () => {
        imagesLoaded++
        if (imagesLoaded === totalImages && gameStateRef.current) {
          // All images loaded, update game state
          gameStateRef.current = {
            ...gameStateRef.current,
            assets: {
              loaded: true,
              images,
            },
          }
          setAssetsLoaded(true)
          setGameStatus(showTutorial ? "tutorial" : "playing")
        }
      }
      img.src = url
      images[key] = img
    })

    // Update game state with images (even before they're fully loaded)
    if (gameStateRef.current) {
      gameStateRef.current = {
        ...gameStateRef.current,
        assets: {
          loaded: false,
          images,
        },
      }
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [difficulty, showTutorial])

  // Handle mouse movement
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Game loop
  useEffect(() => {
    if (gameStatus !== "playing" || !assetsLoaded) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx || !gameStateRef.current) return

    // Update mouse position in game state
    if (gameStateRef.current) {
      gameStateRef.current.mousePosition = mousePositionRef.current
    }

    // Game timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Game over
          setIsGameOver(true)
          setGameStatus("gameOver")
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Animation loop
    const animate = () => {
      if (gameStateRef.current && gameStateRef.current.assets.loaded) {
        // Update game state
        gameStateRef.current = updateGameState(gameStateRef.current)

        // Update score if it changed
        if (gameStateRef.current.score !== score) {
          setScore(gameStateRef.current.score)
        }

        // Render the game
        renderGameScene(ctx, gameStateRef.current)
      }

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [gameStatus, assetsLoaded, score])

  // Handle game over
  useEffect(() => {
    if (isGameOver && gameStateRef.current) {
      onComplete(gameStateRef.current.score)
      toast({
        title: "Game Over!",
        description: `You scored ${gameStateRef.current.score} points!`,
      })
    }
  }, [isGameOver, onComplete, toast])

  const startGame = () => {
    setGameStatus("playing")
    setShowTutorial(false)
    setIsGameOver(false)

    if (gameStateRef.current) {
      gameStateRef.current.gameStatus = "playing"
    }
  }

  const togglePause = () => {
    if (gameStatus === "playing") {
      setGameStatus("paused")
      setIsPaused(true)
      if (gameStateRef.current) {
        gameStateRef.current.gameStatus = "paused"
      }
    } else if (gameStatus === "paused") {
      setGameStatus("playing")
      setIsPaused(false)
      if (gameStateRef.current) {
        gameStateRef.current.gameStatus = "playing"
      }
    }
  }

  const restartGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Initialize new game state
    const initialState = initializeGameState(canvas.width, canvas.height, difficulty)

    // Keep the loaded assets
    if (gameStateRef.current && gameStateRef.current.assets) {
      initialState.assets = gameStateRef.current.assets
    }

    gameStateRef.current = initialState
    gameStateRef.current.gameStatus = "playing"

    // Reset UI state
    setScore(0)
    setTimeLeft(difficulty === "easy" ? 60 : difficulty === "medium" ? 90 : 120)
    setIsGameOver(false)
    setIsPaused(false)
    setGameStatus("playing")
  }

  // Render loading screen
  const renderLoadingScreen = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#333"
    ctx.font = "24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Loading assets...", canvas.width / 2, canvas.height / 2)
  }

  // Initial render of loading screen
  useEffect(() => {
    if (gameStatus === "loading") {
      renderLoadingScreen()
    }
  }, [gameStatus])

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative">
        <canvas ref={canvasRef} width={800} height={600} className="w-full h-auto border-b" />

        {/* Game UI Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Badge variant="outline" className="bg-white/80 text-black font-bold px-3 py-1">
            Score: {score}
          </Badge>
          <Badge variant="outline" className="bg-white/80 text-black font-bold px-3 py-1">
            Time: {timeLeft}s
          </Badge>
        </div>

        {/* Tutorial Overlay */}
        {gameStatus === "tutorial" && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-6">
            <h3 className="text-2xl font-bold mb-4">Retail Floor Simulation</h3>
            <ul className="list-disc space-y-2 mb-6 max-w-md">
              <li>Move your mouse to control the retail associate</li>
              <li>Don't approach customers directly - they'll walk away!</li>
              <li>Pass by customers not too close and be available</li>
              <li>Let customers initiate the conversation when they're ready</li>
              <li>Stay with them until they're satisfied once they engage you</li>
              <li>Balance your time between all customers to maximize your score</li>
            </ul>
            <Button onClick={startGame} size="lg">
              Start Game
            </Button>
          </div>
        )}

        {/* Pause Overlay */}
        {gameStatus === "paused" && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">Game Paused</h3>
            <Button onClick={togglePause} className="mb-2">
              Resume Game
            </Button>
            <Button variant="outline" onClick={restartGame}>
              Restart Game
            </Button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameStatus === "gameOver" && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
            <p className="text-xl mb-4">Your Score: {score}</p>
            <Button onClick={restartGame} className="mb-2">
              Play Again
            </Button>
          </div>
        )}

        {/* Loading Overlay */}
        {gameStatus === "loading" && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">Loading Game Assets...</h3>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Game Controls */}
      <div className="p-4 flex justify-between">
        {gameStatus === "playing" ? (
          <Button variant="outline" onClick={togglePause}>
            Pause
          </Button>
        ) : gameStatus === "paused" ? (
          <Button variant="outline" onClick={togglePause}>
            Resume
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={gameStatus === "gameOver" ? restartGame : startGame}
            disabled={gameStatus === "loading"}
          >
            {gameStatus === "gameOver" ? "Play Again" : "Start Game"}
          </Button>
        )}
        <Button variant="outline" onClick={restartGame} disabled={gameStatus === "loading"}>
          Restart
        </Button>
      </div>
    </Card>
  )
}
