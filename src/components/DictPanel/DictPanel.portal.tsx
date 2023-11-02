import React, { FC, useState } from 'react'
import ShadowPortal from '../ShadowPortal'
import { DictPanel, DictPanelProps } from './DictPanel'

export interface DictPanelPortalProps extends Omit<DictPanelProps, 'onHover'> {
  show: boolean
}

export const DictPanelPortal: FC<DictPanelPortalProps> = props => {
  const { show, ...restProps } = props
  const [isHover, setHover] = useState(false)
  const bowlStyles = <style>{require('!sass-loader!./DictPanel.shadow.scss?raw')}</style>

  return (
    <ShadowPortal id="saladict-dictpanel-root" head={bowlStyles} classNames="dictpanel" in={show || isHover}>
      {() => <DictPanel {...restProps} />}
    </ShadowPortal>
  )
}
