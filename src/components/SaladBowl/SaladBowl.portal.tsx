import React, { FC, useState } from 'react'
import ShadowPortal from '../ShadowPortal'
import { SaladBowl, SaladBowlProps } from './SaladBowl'

export interface SaladBowlPortalProps extends Omit<SaladBowlProps, 'onHover'> {
  show: boolean
}

/**
 * React portal wrapped SaladBowlShadow.
 * Detach from DOM when not visible.
 */
export const SaladBowlPortal: FC<SaladBowlPortalProps> = props => {
  const { show, ...restProps } = props
  const [isHover, setHover] = useState(false)
  const bowlStyles = <style>{require('!sass-loader!./SaladBowl.shadow.scss?raw')}</style>

  return (
    <ShadowPortal id="saladict-saladbowl-root" head={bowlStyles} classNames="saladbowl" in={show || isHover} timeout={0}>
      {() => <SaladBowl {...restProps} />}
    </ShadowPortal>
  )
}
