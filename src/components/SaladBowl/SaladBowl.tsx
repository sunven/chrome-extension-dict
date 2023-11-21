import React, { FC } from 'react'
import classnames from 'classnames'
import cranberryImg from '@/assets/images/cranberry.svg'

export interface SaladBowlProps {
  /** Viewport based coordinate. */
  readonly x?: number
  /** Viewport based coordinate. */
  readonly y?: number
  /** React on hover. */
  /** When bowl is activated via mouse. */
  readonly onActive: () => void
}

/**
 * Cute little icon that pops up near the selection.
 */
export const SaladBowl: FC<SaladBowlProps> = (props) => {
  return (
    <div
      role="img"
      className={classnames('saladbowl', 'saladict-external')}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
      onClick={() => props.onActive()}
    >
      {/* prettier-ignore */}
      <img src={cranberryImg} />
    </div>
  )
}
