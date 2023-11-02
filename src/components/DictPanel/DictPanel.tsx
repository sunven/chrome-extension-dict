import React, { FC } from 'react'
import classnames from 'classnames'

export interface DictPanelProps {
  /** Viewport based coordinate. */
  readonly x?: number
  /** Viewport based coordinate. */
  readonly y?: number
  readonly data: {}
}

/**
 * Cute little icon that pops up near the selection.
 */
export const DictPanel: FC<DictPanelProps> = props => {
  return (
    <div className={classnames('dictpanel')} style={{ transform: `translate(${props.x}px, ${props.y}px)` }} onClick={() => {}}>
      aaabbbccc
    </div>
  )
}
