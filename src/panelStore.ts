import merge from 'lodash/merge'

export type PanelType = {
  show: boolean
  x?: number
  y?: number
  data: any
  range?: Range
}

const initialPanel: PanelType = {
  show: false,
  x: 0,
  y: 0,
  data: undefined,
}

let panel = { ...initialPanel }
let listeners: Function[] = []

function emitChange() {
  listeners.forEach((listener) => listener())
}

export const panelStore = {
  reset() {
    panel = { ...initialPanel }
    emitChange()
  },
  mergeData(_panel: Partial<PanelType>) {
    panel = { ...merge(panel, _panel) }
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
