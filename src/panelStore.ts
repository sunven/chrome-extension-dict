export type PanelType = {
  show: boolean
  x?: number
  y?: number
  data: any
}

const initialPanel: PanelType = {
  show: false,
  x: 0,
  y: 0,
  data: undefined,
}

let panel = initialPanel
let listeners: Function[] = []

function emitChange() {
  listeners.forEach((listener) => listener())
}

export const panelStore = {
  setPanelData(data: any) {
    panel = { ...panel, data }
    emitChange()
  },
  setPanel(_panel: PanelType) {
    panel = { ..._panel }
    emitChange()
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return panel
  },
}
