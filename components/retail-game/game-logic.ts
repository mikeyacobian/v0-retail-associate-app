import type { GameState, Customer, Position, Tile } from "./game-types"
import { isoToGrid } from "./game-renderer"

// Calculate distance between two points
function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

// Check if a position is walkable
function isWalkable(x: number, y: number, gameState: GameState): boolean {
  const { tiles } = gameState.storeLayout

  // Check bounds
  if (x < 0 || y < 0 || y >= tiles.length || x >= tiles[0].length) {
    return false
  }

  return tiles[Math.floor(y)][Math.floor(x)].walkable
}

// Find a path using A* algorithm
function findPath(startX: number, startY: number, targetX: number, targetY: number, gameState: GameState): Position[] {
  // Implementation of A* pathfinding
  // This is a simplified version - in a real game, you'd want a more robust implementation

  // For simplicity, we'll just return a direct path if it's walkable
  if (isWalkable(targetX, targetY, gameState)) {
    return [{ x: targetX, y: targetY }]
  }

  // Otherwise, find a nearby walkable tile
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 1, dy: 0 }, // right
    { dx: 0, dy: 1 }, // down
    { dx: -1, dy: 0 }, // left
  ]

  for (let i = 1; i <= 3; i++) {
    for (const dir of directions) {
      const newX = targetX + dir.dx * i
      const newY = targetY + dir.dy * i

      if (isWalkable(newX, newY, gameState)) {
        return [{ x: newX, y: newY }]
      }
    }
  }

  // If no walkable tile found, return current position
  return [{ x: startX, y: startY }]
}

// Move entity towards target
function moveTowards(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
  speed: number,
  gameState: GameState,
): { x: number; y: number; direction: "up" | "down" | "left" | "right"; isMoving: boolean } {
  const dist = distance(currentX, currentY, targetX, targetY)

  // If already at target, don't move
  if (dist < 0.1) {
    return {
      x: currentX,
      y: currentY,
      direction: "down", // Default direction
      isMoving: false,
    }
  }

  // Calculate movement
  const moveX = (Math.min(speed, dist) * (targetX - currentX)) / dist
  const moveY = (Math.min(speed, dist) * (targetY - currentY)) / dist

  // Determine direction based on movement
  let direction: "up" | "down" | "left" | "right" = "down"

  if (Math.abs(moveX) > Math.abs(moveY)) {
    direction = moveX > 0 ? "right" : "left"
  } else {
    direction = moveY > 0 ? "down" : "up"
  }

  // Check if new position is walkable
  const newX = currentX + moveX
  const newY = currentY + moveY

  if (isWalkable(newX, newY, gameState)) {
    return {
      x: newX,
      y: newY,
      direction,
      isMoving: true,
    }
  }

  // If not walkable, try moving only horizontally or vertically
  if (isWalkable(currentX + moveX, currentY, gameState)) {
    return {
      x: currentX + moveX,
      y: currentY,
      direction: moveX > 0 ? "right" : "left",
      isMoving: true,
    }
  }

  if (isWalkable(currentX, currentY + moveY, gameState)) {
    return {
      x: currentX,
      y: currentY + moveY,
      direction: moveY > 0 ? "down" : "up",
      isMoving: true,
    }
  }

  // If still not walkable, don't move
  return {
    x: currentX,
    y: currentY,
    direction,
    isMoving: false,
  }
}

// Update customer state based on associate interaction
function updateCustomer(
  customer: Customer,
  associateX: number,
  associateY: number,
  interactionRadius: number,
  gameState: GameState,
): Customer {
  const dist = distance(customer.position.x, customer.position.y, associateX, associateY)
  const isInRange = dist < interactionRadius
  const isTooClose = dist < interactionRadius * 0.5

  // Deep copy the customer object
  const updatedCustomer = { ...customer }

  // Update customer movement
  if (customer.targetPosition) {
    const movement = moveTowards(
      customer.position.x,
      customer.position.y,
      customer.targetPosition.x,
      customer.targetPosition.y,
      customer.speed,
      gameState,
    )

    updatedCustomer.position.x = movement.x
    updatedCustomer.position.y = movement.y
    updatedCustomer.direction = movement.direction
    updatedCustomer.isMoving = movement.isMoving

    // If reached target, clear it
    if (distance(movement.x, movement.y, customer.targetPosition.x, customer.targetPosition.y) < 0.1) {
      updatedCustomer.targetPosition = null
    }
  } else if (Math.random() < 0.01) {
    // Occasionally set a new random target
    const randomX = Math.floor(Math.random() * gameState.storeLayout.tiles[0].length)
    const randomY = Math.floor(Math.random() * gameState.storeLayout.tiles.length)

    if (isWalkable(randomX, randomY, gameState)) {
      updatedCustomer.targetPosition = { x: randomX, y: randomY }
      updatedCustomer.path = findPath(customer.position.x, customer.position.y, randomX, randomY, gameState)
    }
  }

  // Update customer state based on interaction with associate
  switch (customer.state) {
    case "browsing":
      if (customer.needsHelp) {
        // If associate is too close, customer gets uncomfortable and may leave
        if (isTooClose) {
          updatedCustomer.approachAttempts += 1
          updatedCustomer.patience = Math.max(0, customer.patience - 10)

          // If approached too aggressively multiple times, customer leaves
          if (updatedCustomer.approachAttempts >= 3) {
            updatedCustomer.state = "angry"

            // Find path to exit
            const exit = findNearestExit(customer.position, gameState)
            updatedCustomer.targetPosition = exit
            updatedCustomer.path = findPath(customer.position.x, customer.position.y, exit.x, exit.y, gameState)
          } else {
            // Move away from associate
            const moveAwayX = customer.position.x + (customer.position.x - associateX) * 0.5
            const moveAwayY = customer.position.y + (customer.position.y - associateY) * 0.5

            if (isWalkable(moveAwayX, moveAwayY, gameState)) {
              updatedCustomer.targetPosition = { x: moveAwayX, y: moveAwayY }
              updatedCustomer.path = findPath(customer.position.x, customer.position.y, moveAwayX, moveAwayY, gameState)
            }
          }
        }
        // If associate is nearby but not too close, and customer hasn't been helped recently
        else if (isInRange && gameState.time - customer.lastInteractionTime > 3000) {
          // Customer notices associate and may initiate interaction
          if (Math.random() < 0.1) {
            updatedCustomer.state = "waiting"
            updatedCustomer.lastInteractionTime = gameState.time
          }
        } else {
          // Customer continues browsing but patience decreases over time
          updatedCustomer.patience = Math.max(0, customer.patience - 0.05)
          if (updatedCustomer.patience <= 0) {
            updatedCustomer.state = "angry"

            // Find path to exit
            const exit = findNearestExit(customer.position, gameState)
            updatedCustomer.targetPosition = exit
            updatedCustomer.path = findPath(customer.position.x, customer.position.y, exit.x, exit.y, gameState)
          }
        }
      }
      break

    case "waiting":
      if (isInRange) {
        // Associate is helping the customer
        updatedCustomer.state = "helped"
        updatedCustomer.interactionTime = 0
      } else {
        // Associate moved away or didn't respond
        updatedCustomer.patience = Math.max(0, customer.patience - 0.2)

        if (updatedCustomer.patience <= 0) {
          updatedCustomer.state = "angry"

          // Find path to exit
          const exit = findNearestExit(customer.position, gameState)
          updatedCustomer.targetPosition = exit
          updatedCustomer.path = findPath(customer.position.x, customer.position.y, exit.x, exit.y, gameState)
        } else if (gameState.time - customer.lastInteractionTime > 5000) {
          // If waited too long, go back to browsing
          updatedCustomer.state = "browsing"
        }
      }
      break

    case "helped":
      if (isInRange) {
        // Continue helping
        updatedCustomer.interactionTime += 1
        if (updatedCustomer.interactionTime >= 100) {
          // Customer is satisfied after enough interaction
          updatedCustomer.state = "satisfied"
          updatedCustomer.needsHelp = false
          updatedCustomer.lastInteractionTime = gameState.time
        }
      } else {
        // Associate moved away before finishing
        updatedCustomer.state = "waiting"
        updatedCustomer.patience = Math.max(0, customer.patience - 1)
      }
      break

    case "satisfied":
      // Customer stays satisfied for a while, then may need help again
      if (Math.random() < 0.001) {
        updatedCustomer.needsHelp = Math.random() < 0.3
        updatedCustomer.state = "browsing"
        updatedCustomer.patience = 100
      }
      break

    case "angry":
    case "leaving":
      // These customers are heading to the exit
      if (!customer.targetPosition) {
        const exit = findNearestExit(customer.position, gameState)
        updatedCustomer.targetPosition = exit
        updatedCustomer.path = findPath(customer.position.x, customer.position.y, exit.x, exit.y, gameState)
      }
      break
  }

  return updatedCustomer
}

// Find nearest exit
function findNearestExit(position: Position, gameState: GameState): Position {
  // Find tiles of type 'entrance'
  const entrances: Position[] = []

  for (let y = 0; y < gameState.storeLayout.tiles.length; y++) {
    for (let x = 0; x < gameState.storeLayout.tiles[y].length; x++) {
      if (gameState.storeLayout.tiles[y][x].type === "entrance") {
        entrances.push({ x, y })
      }
    }
  }

  // Find closest entrance
  let closest = entrances[0]
  let minDist = Number.POSITIVE_INFINITY

  for (const entrance of entrances) {
    const dist = distance(position.x, position.y, entrance.x, entrance.y)
    if (dist < minDist) {
      minDist = dist
      closest = entrance
    }
  }

  return closest
}

// Calculate score based on customer states
function calculateScore(customers: Customer[]): number {
  let score = 0

  customers.forEach((customer) => {
    if (customer.state === "satisfied") {
      score += 10
    } else if (customer.state === "angry") {
      score -= 5
    }
  })

  return score
}

// Main game state update function
export function updateGameState(gameState: GameState): GameState {
  if (gameState.gameStatus !== "playing") {
    return gameState
  }

  const { associate, customers, mousePosition, storeLayout, time } = gameState

  // Convert mouse position to grid coordinates
  const gridPos = isoToGrid(mousePosition.x, mousePosition.y, gameState)

  // Update associate target position if it's walkable
  if (isWalkable(gridPos.x, gridPos.y, gameState)) {
    associate.targetPosition = { x: gridPos.x, y: gridPos.y }
  }

  // Move associate towards target position
  const associateMovement = moveTowards(
    associate.position.x,
    associate.position.y,
    associate.targetPosition.x,
    associate.targetPosition.y,
    associate.speed,
    gameState,
  )

  // Update all customers
  const updatedCustomers = customers.map((customer) =>
    updateCustomer(customer, associateMovement.x, associateMovement.y, associate.interactionRadius, gameState),
  )

  // Calculate new score
  const newScore = gameState.score + calculateScore(updatedCustomers) - calculateScore(customers)

  // Return updated game state
  return {
    ...gameState,
    associate: {
      ...associate,
      position: { x: associateMovement.x, y: associateMovement.y },
      direction: associateMovement.direction,
      isMoving: associateMovement.isMoving,
    },
    customers: updatedCustomers,
    score: newScore,
    time: time + 16, // Assuming ~60fps
  }
}

// Initialize game state
export function initializeGameState(width: number, height: number, difficulty: "easy" | "medium" | "hard"): GameState {
  // Create tile map
  const tiles: Tile[][] = []
  const tileSize = 1

  // Create a simple store layout
  for (let y = 0; y < 15; y++) {
    tiles[y] = []
    for (let x = 0; x < 20; x++) {
      // Default to floor tiles
      tiles[y][x] = {
        x,
        y,
        type: "floor",
        walkable: true,
      }

      // Add walls around the edges
      if (x === 0 || x === 19 || y === 0 || y === 14) {
        tiles[y][x] = {
          x,
          y,
          type: "wall",
          walkable: false,
        }
      }

      // Add entrance
      if ((x === 10 || x === 11) && y === 14) {
        tiles[y][x] = {
          x,
          y,
          type: "entrance",
          walkable: true,
        }
      }

      // Add shelves
      if (
        (x >= 3 && x <= 6 && y >= 3 && y <= 4) ||
        (x >= 13 && x <= 16 && y >= 3 && y <= 4) ||
        (x >= 3 && x <= 6 && y >= 9 && y <= 10) ||
        (x >= 13 && x <= 16 && y >= 9 && y <= 10)
      ) {
        tiles[y][x] = {
          x,
          y,
          type: "shelf",
          walkable: false,
        }
      }

      // Add counter
      if (x >= 8 && x <= 12 && y >= 1 && y <= 2) {
        tiles[y][x] = {
          x,
          y,
          type: "counter",
          walkable: false,
        }
      }
    }
  }

  // Create initial game state
  const initialState: GameState = {
    associate: {
      position: { x: 10, y: 12 },
      targetPosition: { x: 10, y: 12 },
      speed: 0.05,
      interactionRadius: 1.5,
      sprite: "associate",
      direction: "down",
      isMoving: false,
    },
    customers: [
      {
        id: 1,
        position: { x: 5, y: 7 },
        targetPosition: null,
        path: [],
        speed: 0.03,
        state: "browsing",
        needsHelp: true,
        patience: 100,
        interactionTime: 0,
        sprite: "customer1",
        direction: "down",
        isMoving: false,
        approachAttempts: 0,
        lastInteractionTime: 0,
      },
      {
        id: 2,
        position: { x: 15, y: 7 },
        targetPosition: null,
        path: [],
        speed: 0.025,
        state: "browsing",
        needsHelp: false,
        patience: 100,
        interactionTime: 0,
        sprite: "customer2",
        direction: "down",
        isMoving: false,
        approachAttempts: 0,
        lastInteractionTime: 0,
      },
      {
        id: 3,
        position: { x: 10, y: 5 },
        targetPosition: null,
        path: [],
        speed: 0.035,
        state: "browsing",
        needsHelp: true,
        patience: 80,
        interactionTime: 0,
        sprite: "customer3",
        direction: "down",
        isMoving: false,
        approachAttempts: 0,
        lastInteractionTime: 0,
      },
    ],
    score: 0,
    mousePosition: { x: width / 2, y: height / 2 },
    storeLayout: {
      width,
      height,
      tiles,
      shelves: [
        { x: 3, y: 3, width: 4, height: 2 },
        { x: 13, y: 3, width: 4, height: 2 },
        { x: 3, y: 9, width: 4, height: 2 },
        { x: 13, y: 9, width: 4, height: 2 },
      ],
      counter: { x: 8, y: 1, width: 5, height: 2 },
    },
    isometric: {
      tileWidth: 64,
      tileHeight: 32,
      originX: width / 2,
      originY: height / 4,
    },
    assets: {
      loaded: false,
      images: {},
    },
    time: 0,
    gameStatus: "loading",
  }

  // Add more customers for medium and hard difficulties
  if (difficulty === "medium" || difficulty === "hard") {
    initialState.customers.push(
      {
        id: 4,
        position: { x: 8, y: 8 },
        targetPosition: null,
        path: [],
        speed: 0.03,
        state: "browsing",
        needsHelp: true,
        patience: difficulty === "hard" ? 60 : 80,
        interactionTime: 0,
        sprite: "customer4",
        direction: "down",
        isMoving: false,
        approachAttempts: 0,
        lastInteractionTime: 0,
      },
      {
        id: 5,
        position: { x: 12, y: 8 },
        targetPosition: null,
        path: [],
        speed: 0.025,
        state: "browsing",
        needsHelp: false,
        patience: 100,
        interactionTime: 0,
        sprite: "customer5",
        direction: "down",
        isMoving: false,
        approachAttempts: 0,
        lastInteractionTime: 0,
      },
    )
  }

  // Add even more customers for hard difficulty
  if (difficulty === "hard") {
    initialState.customers.push({
      id: 6,
      position: { x: 10, y: 10 },
      targetPosition: null,
      path: [],
      speed: 0.04,
      state: "browsing",
      needsHelp: true,
      patience: 50,
      interactionTime: 0,
      sprite: "customer6",
      direction: "down",
      isMoving: false,
      approachAttempts: 0,
      lastInteractionTime: 0,
    })
  }

  return initialState
}
