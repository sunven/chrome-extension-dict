import { getDefaultProfile } from './app-config/profiles'
import { render } from 'react-dom'
import SaladBowlContainer from './components/SaladBowl/SaladBowl.container'
import React from 'react'
import { ballStore } from './ballStore'
import { panelStore } from './panelStore'
import { handleLexResult, handleMachineResult, handleRelatedResult } from '@/components/dictionaries/bing/engine'
import DictPanelContainer from './components/DictPanel/DictPanel.container'

//鼠标抬起
document.addEventListener('mouseup', e => {
  const selection = window.getSelection()
  const text = selection?.toString() || ''
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
      panelStore.setPanel({ show: true, x: rect?.right, y: rect?.top })
    },
  })
  console.log('mouseup', text)
  chrome.runtime.sendMessage(
    {
      type: 'fetchUrl',
      url: `https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=too`,
    },
    response => {
      const doc = new DOMParser().parseFromString(response, 'text/html')
      console.log(doc)
      const bingConfig = getDefaultProfile().dicts.all.bing
      const transform = null

      if (doc.querySelector('.client_def_hd_hd')) {
        console.log('handleLexResult(doc, bingConfig.options, transform)', handleLexResult(doc, bingConfig.options, transform))

        return handleLexResult(doc, bingConfig.options, transform)
      }

      if (doc.querySelector('.client_trans_head')) {
        console.log('handleMachineResult(doc, transform)', handleMachineResult(doc, transform))
        return handleMachineResult(doc, transform)
      }

      if (bingConfig.options.related) {
        if (doc.querySelector('.client_do_you_mean_title_bar')) {
          console.log('handleRelatedResult(doc, bingConfig, transform)', handleRelatedResult(doc, bingConfig, transform))
          return handleRelatedResult(doc, bingConfig, transform)
        }
      }
    }
  )
})

function main() {
  render(<SaladBowlContainer />, document.createElement('div'))
  render(<DictPanelContainer />, document.createElement('div'))
}

main()
