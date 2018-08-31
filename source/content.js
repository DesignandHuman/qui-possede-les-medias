import 'webext-dynamic-content-scripts'
import select from 'select-dom'

import { safeElementReady, isEmpty } from './libs/utils'

// Add globals for easier debugging
window.select = select

async function init () {
  const boxData = await browser.runtime.sendMessage({
    action: 'request',
    hostname: location.hostname.split('.').slice(-2).join('.')
  })

  if (isEmpty(boxData)) {
    return
  }

  await safeElementReady('body')
  document.documentElement.classList.add('capitext')

  const box = document.createElement('p')
  box.className = 'capitext-box'
  box.innerHTML = `Ce média appartient
      ${boxData['group'] ? 'au groupe ' + boxData['group'] + ' et' : ''}
      aux actionnaires ${boxData['holders'].join(', ')}.`
  select('body').append(box)
}

init()
