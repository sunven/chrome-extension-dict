export type BallType = {
  show: boolean
  panelCSS: string
  x: number
  y: number
  withAnimation: boolean
  enableHover: boolean
  onActive: () => void
}

const initialBall: BallType = {
  show: false,
  panelCSS: '',
  x: 0,
  y: 0,
  withAnimation: false,
  enableHover: false,
  onActive: () => {},
}

let ball = initialBall
let listeners: Function[] = []

export const ballStore = {
  setBall(_ball: BallType) {
    ball = { ...ball }
    emitChange()
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return ball
  },
}

function emitChange() {
  for (let listener of listeners) {
    listener()
  }
}
