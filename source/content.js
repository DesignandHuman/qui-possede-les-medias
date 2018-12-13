import 'webext-dynamic-content-scripts'
import select from 'select-dom'

import { safeElementReady, isEmpty } from './libs/utils'

// Add globals for easier debugging
window.select = select

function dataToString(data) {
  return data.reduce((acc, entity) => entity.link ? `${acc} <a href="${entity.link}">${entity.name}</a>,` : `${acc} ${entity.name},`, '')
}

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
  box.innerHTML = `Ce média appartient à ${dataToString(boxData)}.`
  select('body').append(box)
}

init()
