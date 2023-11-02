import { SaladBowlPortal } from './SaladBowl.portal'
import React, { useSyncExternalStore } from 'react'
import { ballStore } from '../../ballStore'

export default function SaladBowlContainer() {
  const ball = useSyncExternalStore(ballStore.subscribe, ballStore.getSnapshot)
  console.log(ball)
  return <SaladBowlPortal {...ball} />
}
