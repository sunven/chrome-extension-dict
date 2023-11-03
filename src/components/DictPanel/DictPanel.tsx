import React, { FC } from 'react'
import classnames from 'classnames'
import { panelStore } from '@/panelStore'

export interface DictPanelProps {
  /** Viewport based coordinate. */
  readonly x?: number
  /** Viewport based coordinate. */
  readonly y?: number
  readonly data: any
}

/**
 * Cute little icon that pops up near the selection.
 */
export const DictPanel: FC<DictPanelProps> = props => {
  const { data } = props
  console.log('data', data)
  if (!data) {
    return null
  }
  // const data: any = {
  //   pic_dict: {
  //     pic: [
  //       {
  //         image: 'https://ydlunacommon-cdn.nosdn.127.net/ac47f0f8a2a4ca7308411247462e2ebd.jpg?',
  //         host: '',
  //         url: 'https://ydlunacommon-cdn.nosdn.127.net/ac47f0f8a2a4ca7308411247462e2ebd.jpg?',
  //       },
  //     ],
  //   },
  //   ec: {
  //     exam_type: ['高中', 'CET4', 'CET6', '考研', 'IELTS', 'TOEFL', 'GRE', 'GMAT', 'SAT', '商务英语'],
  //     source: {
  //       name: '有道词典',
  //       url: 'https://dict.youdao.com',
  //     },
  //     word: [
  //       {
  //         usphone: 'ɪkˈsplɔɪt',
  //         ukphone: 'ɪkˈsplɔɪt',
  //         ukspeech: 'exploit&type=1',
  //         trs: [
  //           {
  //             tr: [
  //               {
  //                 l: {
  //                   i: ['v. 剥削，压榨；利用（……为自己谋利）；运用，发挥；开发，开拓'],
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             tr: [
  //               {
  //                 l: {
  //                   i: ['n. 英勇事迹，壮举；大胆的表演，不凡的身手'],
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //         wfs: [
  //           {
  //             wf: {
  //               name: '复数',
  //               value: 'exploits',
  //             },
  //           },
  //           {
  //             wf: {
  //               name: '第三人称单数',
  //               value: 'exploits',
  //             },
  //           },
  //           {
  //             wf: {
  //               name: '现在分词',
  //               value: 'exploiting',
  //             },
  //           },
  //           {
  //             wf: {
  //               name: '过去式',
  //               value: 'exploited',
  //             },
  //           },
  //           {
  //             wf: {
  //               name: '过去分词',
  //               value: 'exploited',
  //             },
  //           },
  //         ],
  //         'return-phrase': {
  //           l: {
  //             i: 'exploit',
  //           },
  //         },
  //         usspeech: 'exploit&type=2',
  //       },
  //     ],
  //   },
  // }
  const { ec, simple } = data || {}
  return (
    <div role="img" className={classnames('dictpanel', 'saladict-external')} style={{ transform: `translate(${props.x}px, ${props.y}px)` }}>
      <div className="max-w-md divide-y divide-gray-300/50 border-2 border-solid border-indigo-600 p-4 bg-green-50">
        {!!data && (
          <>
            <div className="relative">
              <div
                className="absolute -right-1 -top-1 cursor-pointer"
                onClick={() => {
                  panelStore.setPanel({ show: false, x: 0, y: 0, data: undefined })
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                </svg>
              </div>
              <span className="text-lg">{simple.query}</span> <span className="ml-2">美/{ec.word[0].usphone}/</span>
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
                <div className="w-10 flex-none"></div>
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
              <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
