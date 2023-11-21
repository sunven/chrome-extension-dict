import React, { FC } from 'react'
import ShadowPortal from '../ShadowPortal'
import { DictPanel, DictPanelProps } from './DictPanel'

export interface DictPanelPortalProps extends Omit<DictPanelProps, 'onHover'> {
  show: boolean
}

export const DictPanelPortal: FC<DictPanelPortalProps> = (props) => {
  const { show, ...restProps } = props
  const bowlStyles = (
    <>
      <style>{require('!postcss-loader!@/tailwindcss.css?raw')}</style>
      <style>{require('!sass-loader!./DictPanel.shadow.scss?raw')}</style>
    </>
  )

  return (
    <ShadowPortal
      id="saladict-dictpanel-root"
      head={bowlStyles}
      shadowRootClassName="cranberry-panel"
      classNames="dictpanel"
      in={show}
      timeout={0}
    >
      {() => <DictPanel {...restProps} />}
    </ShadowPortal>
  )
}
