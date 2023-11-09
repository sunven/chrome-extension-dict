import React, { useSyncExternalStore } from 'react'
import { DictPanelPortal } from './DictPanel.portal'
import { panelStore } from '@/panelStore'

export default function DictPanelContainer() {
  const panel = useSyncExternalStore(panelStore.subscribe, panelStore.getSnapshot)
  return <DictPanelPortal {...panel} />
}
