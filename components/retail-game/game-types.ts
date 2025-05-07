export interface Position {
  x: number
  y: number
}

export interface Tile {
  x: number
  y: number
  type: "floor" | "shelf" | "counter" | "wall" | "entrance"
  walkable: boolean
}

export interface Associate {
  position: Position
  targetPosition: Position
  speed: number
  interactionRadius: number
  sprite: string
  direction: "up" | "down" | "left" | "right"
  isMoving: boolean
}

export interface Customer {
  id: number
  position: Position
  targetPosition: Position | null
  path: Position[]
  speed: number
  state: "browsing" | "waiting" | "helped" | "satisfied" | "leaving" | "angry"
  needsHelp: boolean
  patience: number
  interactionTime: number
  sprite: string
  direction: "up" | "down" | "left" | "right"
  isMoving: boolean
  approachAttempts: number
  lastInteractionTime: number
}

export interface StoreLayout {
  width: number
  height: number
  tiles: Tile[][]
  shelves: { x: number; y: number; width: number; height: number }[]
  counter: { x: number; y: number; width: number; height: number }
}

export interface GameState {
  associate: Associate
  customers: Customer[]
  score: number
  mousePosition: Position
  storeLayout: StoreLayout
  isometric: {
    tileWidth: number
    tileHeight: number
    originX: number
    originY: number
  }
  assets: {
    loaded: boolean
    images: Record<string, HTMLImageElement>
  }
  time: number
  gameStatus: "loading" | "tutorial" | "playing" | "paused" | "gameOver"
}

export interface IsometricPosition {
  screenX: number
  screenY: number
}
