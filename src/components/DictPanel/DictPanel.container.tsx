import { DictPanelPortal } from './DictPanel.portal'
import React, { useSyncExternalStore } from 'react'
import { panelStore } from '@/panelStore'

export default function DictPanelContainer() {
  const panel = useSyncExternalStore(panelStore.subscribe, panelStore.getSnapshot)
  return <DictPanelPortal {...panel} />
}
