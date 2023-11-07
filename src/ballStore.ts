export type BallType = {
  show: boolean
  x?: number
  y?: number
  onActive: () => void
}

const initialBall: BallType = {
  show: false,
  x: 0,
  y: 0,
  onActive: () => {},
}

let ball = initialBall
let listeners: Function[] = []

function emitChange() {
  listeners.forEach((listener) => listener())
}

export const ballStore = {
  setBall(_ball: BallType) {
    ball = { ..._ball }
    emitChange()
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return ball
  },
}
