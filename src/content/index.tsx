import { createRoot } from 'react-dom/client'
import React from 'react'
import SaladBowlContainer from '../components/SaladBowl/SaladBowl.container'
import { ballStore } from '../ballStore'
import { panelStore } from '../panelStore'
import DictPanelContainer from '../components/DictPanel/DictPanel.container'
import './index.css'

function isInDictPanel(element: Node | EventTarget | null): boolean {
  if (!element) {
    return false
  }

  for (let el: Element | null = element as Element; el; el = el.parentElement) {
    if (el.classList && el.classList.contains('cranberry-panel')) {
      return true
    }
  }

  return false
}

// 鼠标抬起
document.addEventListener('mouseup', (e) => {
  const selection = window.getSelection()
  const text = selection?.toString().trim() || ''
  if (!text) {
    ballStore.setBall({ show: false, onActive: () => {} })
    return
  }
  const rect = selection?.getRangeAt(0).getBoundingClientRect()
  ballStore.setBall({
    show: true,
    x: rect?.right,
    y: rect?.top,
    onActive: () => {
      console.log('a', 1)
      panelStore.setPanel({ show: true, x: rect?.right, y: rect?.top, data: undefined })
      chrome.runtime.sendMessage(
        {
          type: 'fetchUrl',
          url: `https://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q=${text}&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%22exam_dict%22%2C%22ctc%22%2C%22web_search%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1`,
        },
        (res) => {
          panelStore.setPanelData(JSON.parse(res))
        },
      )
    },
  })
  console.log('mouseup', text)
  // chrome.runtime.sendMessage(
  //   {
  //     type: 'fetchUrl',
  //     url: `https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=too`,
  //   },
  //   response => {
  //     const doc = new DOMParser().parseFromString(response, 'text/html')
  //     console.log(doc)
  //     const bingConfig = getDefaultProfile().dicts.all.bing
  //     const transform = null

  //     if (doc.querySelector('.client_def_hd_hd')) {
  //       console.log('handleLexResult(doc, bingConfig.options, transform)', handleLexResult(doc, bingConfig.options, transform))

  //       return handleLexResult(doc, bingConfig.options, transform)
  //     }

  //     if (doc.querySelector('.client_trans_head')) {
  //       console.log('handleMachineResult(doc, transform)', handleMachineResult(doc, transform))
  //       return handleMachineResult(doc, transform)
  //     }

  //     if (bingConfig.options.related) {
  //       if (doc.querySelector('.client_do_you_mean_title_bar')) {
  //         console.log('handleRelatedResult(doc, bingConfig, transform)', handleRelatedResult(doc, bingConfig, transform))
  //         return handleRelatedResult(doc, bingConfig, transform)
  //       }
  //     }
  //   }
  // )
})

document.addEventListener('mousedown', (e) => {
  if (isInDictPanel(e.target)) {
    return
  }
  panelStore.closePanel(false)
})

function main() {
  createRoot(document.createElement('div')).render(<SaladBowlContainer />)
  createRoot(document.createElement('div')).render(<DictPanelContainer />)
}

main()
