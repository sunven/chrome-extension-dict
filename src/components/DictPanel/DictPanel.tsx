import React, { useState, useRef, type FC, useEffect, RefObject } from 'react'
import classnames from 'classnames'
import { panelStore } from '@/panelStore'
import closeImg from '@/assets/images/close.svg'
import { highlight, serialize } from '@/textNode'

export interface DictPanelProps {
  /** Viewport based coordinate. */
  readonly x?: number
  /** Viewport based coordinate. */
  readonly y?: number
  readonly data: any
  readonly range?: Range
}

let isDragging = false
let offsetX: number
let offsetY: number

/**
 * Cute little icon that pops up near the selection.
 */
export const DictPanel: FC<DictPanelProps> = (props) => {
  const { data, x, y, range } = props
  const panelRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const handleCollect = () => {
    const {
      startContainer,
      startOffset,
      endContainer,
      endOffset,
      commonAncestorContainer,
    } = range!
    highlight(
      startContainer as Text,
      startOffset,
      endContainer as Text,
      endOffset,
      commonAncestorContainer,
    )
    const obj = serialize(
      startContainer as Text,
      startOffset,
      endContainer as Text,
      endOffset,
      commonAncestorContainer,
    )
    console.log('obj', obj)
  }
  useEffect(() => {
    const panelElement = panelRef.current
    const draggableElement = dragRef.current
    if (!draggableElement || !panelElement) {
      return () => {}
    }
    const mousedownListener = (event: MouseEvent) => {
      isDragging = true
      offsetX = event.clientX - panelElement.offsetLeft
      offsetY = event.clientY - panelElement.offsetTop
    }
    const mousemoveListener = (event: MouseEvent) => {
      if (isDragging) {
        panelElement.style.left = `${event.clientX - offsetX}px`
        panelElement.style.top = `${event.clientY - offsetY}px`
      }
    }
    const mouseupListener = () => {
      isDragging = false
    }
    draggableElement.addEventListener('mousedown', mousedownListener)
    document.addEventListener('mousemove', mousemoveListener)
    document.addEventListener('mouseup', mouseupListener)
    return () => {
      draggableElement.removeEventListener('mousedown', mousedownListener)
      document.removeEventListener('mousemove', mousemoveListener)
      document.removeEventListener('mouseup', mouseupListener)
    }
  }, [data, x, y])
  if (!data) {
    return null
  }

  const { ec, simple, rel_word: relWord = { stem: '', rels: [] } } = data
  if (!ec || !simple) {
    return null
  }
  return (
    <div
      ref={panelRef}
      role="img"
      className={classnames('dictpanel', 'saladict-external')}
      style={{
        // transform: `translate(${x}px, ${y}px)`,
        position: 'fixed',
        zIndex: 1,
        // top: y,
        left: x,
        top: y,
        // bottom: 0,
        // right: 0,
      }}
    >
      <div className="max-w-md divide-y divide-gray-300/50 border-2 border-solid border-purple-500 p-4 pt-0 bg-green-50 rounded">
        {!!data && (
          <>
            <div className="flex justify-between items-center gap-4 ">
              <div className="text-purple-500">Cranberry Dict</div>
              <div className="cursor-pointer" onClick={handleCollect}>
                🤍❤️
              </div>
              <div ref={dragRef} className="flex-1 cursor-move h-8" />
              <div
                className="cursor-pointer"
                onClick={() => {
                  panelStore.mergeData({
                    show: false,
                    x: 0,
                    y: 0,
                    data: undefined,
                  })
                }}
              >
                <img src={closeImg} />
              </div>
            </div>
            <div>
              <span className="text-lg text-emerald-500">{simple.query}</span>
              <span className="ml-2">美/{ec.word[0].usphone}/</span>
              <span className="ml-2">英/{ec.word[0].ukphone}/</span>
            </div>
            <div className="text-sm leading-6 text-gray-600">
              {ec.word[0].trs.map((item: any, index: number) => {
                const txt = item.tr[0].l.i[0]
                const ind = txt.indexOf(' ')
                return (
                  <div key={index} className="flex">
                    <div className="w-10 flex-none text-blue-500">
                      {txt.substring(0, ind)}
                    </div>
                    <div className="flex-auto">{txt.substring(ind + 1)}</div>
                  </div>
                )
              })}
              <div className="flex">
                <div className="w-10 flex-none" />
                <div className="flex-auto">
                  {(ec.exam_type || []).join('|')}
                </div>
              </div>
              <div className="max-w-md">
                {(ec.word[0].wfs || []).map((item: any, index: number) => (
                  <span key={index} className={index === 0 ? '' : 'ml-4'}>
                    <span className="text-orange-500">{item.wf.name}: </span>
                    {item.wf.value}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {/* <div className="flex">
                <div>同根词</div>
              </div> */}
              <div>
                <p>
                  词根: <span className="text-rose-500">{relWord.stem}</span>
                </p>
                {relWord.rels.map((item: any, i: number) => (
                  <div key={i} className="text-gray-600 text-sm">
                    <p className="text-blue-500">{item.rel.pos}</p>
                    {item.rel.words.map((w: any, index: number) => (
                      <p key={index}>
                        {w.word}:{w.tran}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
