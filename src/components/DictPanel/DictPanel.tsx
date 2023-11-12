import React, { useState, type FC } from 'react'
import classnames from 'classnames'
import { panelStore } from '@/panelStore'

export interface DictPanelProps {
  /** Viewport based coordinate. */
  readonly x?: number
  /** Viewport based coordinate. */
  readonly y?: number
  readonly data: any
}

type CoordType = {
  x?: number
  y?: number
}

function getX(mouseMoveClient: CoordType, mouseDownClient: CoordType) {
  if (mouseMoveClient.x === undefined || mouseDownClient.x === undefined) {
    return 0
  }
  console.log('x', mouseMoveClient.x - mouseDownClient.x)
  return mouseMoveClient.x - mouseDownClient.x
}

function getY(mouseMoveClient: CoordType, mouseDownClient: CoordType) {
  if (mouseMoveClient.y === undefined || mouseDownClient.y === undefined) {
    return 0
  }
  console.log('y', mouseMoveClient.y - mouseDownClient.y)
  return mouseMoveClient.y - mouseDownClient.y
}

/**
 * Cute little icon that pops up near the selection.
 */
export const DictPanel: FC<DictPanelProps> = (props) => {
  const { data, x, y } = props
  console.log('data', data)
  if (!data) {
    return null
  }

  const { ec, simple, rel_word: relWord } = data
  if (!ec || !simple) {
    return null
  }
  const [mouseDownClient, setMouseDownClient] = useState<CoordType>({})
  const [mouseMoveClient, setMouseMoveClient] = useState<CoordType>({})

  return (
    <div
      role="img"
      className={classnames('dictpanel', 'saladict-external')}
      style={{
        // transform: `translate(${x}px, ${y}px)`,
        position: 'fixed',
        zIndex: 1,
        // top: y,
        left: x + getX(mouseMoveClient, mouseDownClient),
        top: y + getY(mouseMoveClient, mouseDownClient),
        // bottom: 0,
        // right: 0,
      }}
    >
      <div className="max-w-md divide-y divide-gray-300/50 border-2 border-solid border-indigo-600 p-4 bg-green-50">
        {!!data && (
          <>
            <div className="flex justify-between items-center gap-4">
              <div>dic</div>
              <div
                className="flex-1 cursor-move"
                onMouseDown={(e) => {
                  setMouseDownClient({ x: e.clientX, y: e.clientY })
                  console.log('onMouseDown', e.clientX, e.clientY)
                }}
                onMouseMove={(e) => {
                  if (mouseMoveClient.x === undefined || mouseDownClient.y === undefined) {
                    return
                  }
                  setMouseMoveClient({ x: e.clientX, y: e.clientY })
                  // console.log(
                  //   'onMouseMove',
                  //   e.clientX,
                  //   e.clientY,
                  //   'x,y',
                  //   x,
                  //   y,
                  //   'cha',
                  //   e.clientX - mouseDownClient.x,
                  //   e.clientY - mouseDownClient.y,
                  // )
                }}
                onMouseUp={() => {
                  setMouseDownClient({})
                  setMouseMoveClient({})
                }}
              >
                drag
              </div>
              <div
                className=" cursor-pointer"
                onClick={() => {
                  panelStore.setPanel({ show: false, x: 0, y: 0, data: undefined })
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 30 30"
                >
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-lg">{simple.query}</span>{' '}
              <span className="ml-2">美/{ec.word[0].usphone}/</span>
              <span className="ml-2">英/{ec.word[0].ukphone}/</span>
            </div>
            <div className="text-sm leading-7 text-gray-600">
              {ec.word[0].trs.map((item: any, index: number) => {
                const txt = item.tr[0].l.i[0]
                const ind = txt.indexOf(' ')
                return (
                  <div key={index} className="flex">
                    <div className="w-10 flex-none">{txt.substring(0, ind)}</div>
                    <div className="flex-auto">{txt.substring(ind + 1)}</div>
                  </div>
                )
              })}
              <div className="flex">
                <div className="w-10 flex-none" />
                <div className="flex-auto">{ec.exam_type.join('|')}</div>
              </div>
              <div className="max-w-md">
                {ec.word[0].wfs.map((item: any, index: number) => (
                  <span key={index} className={index === 0 ? '' : 'ml-4'}>
                    <span>{item.wf.name}:</span>
                    {item.wf.value}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex">
                <div>同根词</div>
              </div>
              <div>
                <p>词根：{relWord.stem}</p>
                {relWord.rels.map((item: any) => (
                  <div>
                    <p>{item.rel.pos}</p>
                    {item.rel.words.map((w: any) => (
                      <p>
                        {w.word}:{w.tran}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* <div
              style={{
                position: 'fixed',
                zIndex: 1,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                margin: 'auto',
                background: 'rgba(225, 225, 225, 0.01)',
              }}
            /> */}
          </>
        )}
      </div>
    </div>
  )
}
