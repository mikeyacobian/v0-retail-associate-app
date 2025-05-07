import type { GameState, Position, IsometricPosition } from "./game-types"
import type { Customer } from "./game-types"

// Convert grid coordinates to isometric screen coordinates
export function gridToIso(x: number, y: number, gameState: GameState): IsometricPosition {
  const { tileWidth, tileHeight, originX, originY } = gameState.isometric

  const screenX = originX + ((x - y) * tileWidth) / 2
  const screenY = originY + ((x + y) * tileHeight) / 2

  return { screenX, screenY }
}

// Convert isometric screen coordinates to grid coordinates
export function isoToGrid(screenX: number, screenY: number, gameState: GameState): Position {
  const { tileWidth, tileHeight, originX, originY } = gameState.isometric

  // Translate to origin
  const relX = screenX - originX
  const relY = screenY - originY

  // Convert to grid
  const x = (relX / (tileWidth / 2) + relY / (tileHeight / 2)) / 2
  const y = (relY / (tileHeight / 2) - relX / (tileWidth / 2)) / 2

  return { x, y }
}

// Draw a sprite at isometric position
function drawSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  direction: "up" | "down" | "left" | "right" = "down",
  isMoving = false,
  frameIndex = 0,
) {
  // For pixel art, disable image smoothing
  ctx.imageSmoothingEnabled = false

  // Calculate source rectangle based on direction and animation frame
  let srcX = 0
  let srcY = 0

  // Assuming sprite sheet has 4 rows (one for each direction) and multiple columns for animation frames
  switch (direction) {
    case "down":
      srcY = 0
      break
    case "left":
      srcY = height
      break
    case "right":
      srcY = height * 2
      break
    case "up":
      srcY = height * 3
      break
  }

  // If moving, use the appropriate animation frame
  if (isMoving) {
    srcX = width * (frameIndex % 4) // Assuming 4 frames of animation
  }

  ctx.drawImage(
    image,
    srcX,
    srcY,
    width,
    height, // Source rectangle
    x - width / 2,
    y - height,
    width,
    height, // Destination rectangle
  )
}

// Draw isometric tile
function drawTile(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  screenX: number,
  screenY: number,
  tileWidth: number,
  tileHeight: number,
  tileType: string,
) {
  // Calculate source rectangle based on tile type
  let srcX = 0

  switch (tileType) {
    case "floor":
      srcX = 0
      break
    case "shelf":
      srcX = tileWidth
      break
    case "counter":
      srcX = tileWidth * 2
      break
    case "wall":
      srcX = tileWidth * 3
      break
    case "entrance":
      srcX = tileWidth * 4
      break
  }

  ctx.drawImage(
    image,
    srcX,
    0,
    tileWidth,
    tileHeight, // Source rectangle
    screenX - tileWidth / 2,
    screenY - tileHeight / 2,
    tileWidth,
    tileHeight, // Destination rectangle
  )
}

// Draw customer state indicator
function drawCustomerIndicator(
  ctx: CanvasRenderingContext2D,
  screenX: number,
  screenY: number,
  state: string,
  patience: number,
  needsHelp: boolean,
  images: Record<string, HTMLImageElement>,
) {
  const indicatorSize = 24
  const indicatorY = screenY - 50 // Position above the customer

  if (state === "browsing" && needsHelp) {
    // Question mark for customers who need help
    ctx.drawImage(
      images.questionIcon,
      0,
      0,
      32,
      32,
      screenX - indicatorSize / 2,
      indicatorY - indicatorSize / 2,
      indicatorSize,
      indicatorSize,
    )

    // Patience bar
    const barWidth = 30
    const barHeight = 4

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(screenX - barWidth / 2, indicatorY - 15, barWidth, barHeight)

    // Red to green based on patience
    const patienceColor = `rgb(${255 - Math.floor(patience * 2.55)}, ${Math.floor(patience * 2.55)}, 0)`
    ctx.fillStyle = patienceColor
    ctx.fillRect(screenX - barWidth / 2, indicatorY - 15, (barWidth * patience) / 100, barHeight)
  } else if (state === "waiting") {
    // Clock icon for waiting customers
    ctx.drawImage(
      images.waitingIcon,
      0,
      0,
      32,
      32,
      screenX - indicatorSize / 2,
      indicatorY - indicatorSize / 2,
      indicatorSize,
      indicatorSize,
    )
  } else if (state === "helped") {
    // Speech bubble for customers being helped
    ctx.drawImage(
      images.helpedIcon,
      0,
      0,
      32,
      32,
      screenX - indicatorSize / 2,
      indicatorY - indicatorSize / 2,
      indicatorSize,
      indicatorSize,
    )

    // Progress indicator
    const barWidth = 30
    const barHeight = 4

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(screenX - barWidth / 2, indicatorY - 15, barWidth, barHeight)

    ctx.fillStyle = "blue"
    ctx.fillRect(screenX - barWidth / 2, indicatorY - 15, (barWidth * Math.min(100, patience)) / 100, barHeight)
  } else if (state === "satisfied") {
    // Happy face for satisfied customers
    ctx.drawImage(
      images.satisfiedIcon,
      0,
      0,
      32,
      32,
      screenX - indicatorSize / 2,
      indicatorY - indicatorSize / 2,
      indicatorSize,
      indicatorSize,
    )
  } else if (state === "angry") {
    // Angry face for unsatisfied customers
    ctx.drawImage(
      images.angryIcon,
      0,
      0,
      32,
      32,
      screenX - indicatorSize / 2,
      indicatorY - indicatorSize / 2,
      indicatorSize,
      indicatorSize,
    )
  }
}

// Main render function
export function renderGameScene(ctx: CanvasRenderingContext2D, gameState: GameState) {
  const { associate, customers, storeLayout, isometric, assets, time } = gameState

  if (!assets || !assets.loaded) {
    // Render loading screen
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, storeLayout.width, storeLayout.height)
    ctx.fillStyle = "#333"
    ctx.font = "24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Loading assets...", storeLayout.width / 2, storeLayout.height / 2)
    return
  }

  // Clear canvas
  ctx.clearRect(0, 0, storeLayout.width, storeLayout.height)

  // Calculate animation frame based on time
  const frameIndex = Math.floor(time / 150) % 4 // 150ms per frame, 4 frames total

  // Draw floor tiles (in isometric order - back to front)
  for (let y = 0; y < storeLayout.tiles.length; y++) {
    for (let x = 0; x < storeLayout.tiles[y].length; x++) {
      const tile = storeLayout.tiles[y][x]
      const { screenX, screenY } = gridToIso(x, y, gameState)

      drawTile(ctx, assets.images.tiles, screenX, screenY, isometric.tileWidth, isometric.tileHeight, tile.type)
    }
  }

  // Sort all entities by y-position for correct drawing order
  const entities = [
    ...customers.map((customer) => ({ type: "customer", entity: customer })),
    { type: "associate", entity: associate },
  ].sort((a, b) => a.entity.position.y - b.entity.position.y)

  // Draw all entities in order
  entities.forEach(({ type, entity }) => {
    const { screenX, screenY } = gridToIso(entity.position.x, entity.position.y, gameState)

    if (type === "customer") {
      const customer = entity as Customer
      drawSprite(
        ctx,
        assets.images[customer.sprite],
        screenX,
        screenY,
        32, // sprite width
        48, // sprite height
        customer.direction,
        customer.isMoving,
        frameIndex,
      )

      // Draw customer state indicator
      drawCustomerIndicator(ctx, screenX, screenY, customer.state, customer.patience, customer.needsHelp, assets.images)
    } else {
      // Draw associate
      drawSprite(
        ctx,
        assets.images.associate,
        screenX,
        screenY,
        32, // sprite width
        48, // sprite height
        associate.direction,
        associate.isMoving,
        frameIndex,
      )

      // Draw interaction radius as a subtle circle
      if (gameState.gameStatus === "tutorial") {
        ctx.beginPath()
        ctx.arc(screenX, screenY, associate.interactionRadius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(0, 100, 255, 0.3)"
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  })

  // Draw UI elements
  if (gameState.gameStatus === "playing" || gameState.gameStatus === "paused") {
    // Score
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(10, 10, 100, 30)
    ctx.fillStyle = "white"
    ctx.font = "16px Arial"
    ctx.textAlign = "left"
    ctx.fillText(`Score: ${gameState.score}`, 20, 30)
  }
}
