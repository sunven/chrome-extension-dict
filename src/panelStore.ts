export type PanelType = {
  show: boolean
  x?: number
  y?: number
}

const initialPanel: PanelType = {
  show: false,
  x: 0,
  y: 0,
}

let panel = initialPanel
let listeners: Function[] = []

export const panelStore = {
  setPanel(_panel: PanelType) {
    panel = { ..._panel }
    emitChange()
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return panel
  },
}

function emitChange() {
  for (let listener of listeners) {
    listener()
  }
}
