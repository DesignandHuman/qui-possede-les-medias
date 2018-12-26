import 'webext-dynamic-content-scripts'
import select from 'select-dom'

import { safeElementReady, isEmpty } from './libs/utils'

// Add globals for easier debugging
window.select = select

function dataToString(data) {
  return data
    .filter(entity => entity.type === 'holder')
    .map(entity => entity.link ? `<a href="${entity.link}" rel="noopener nofollow" target="_blank">${entity.name}</a>` : entity.name)
    .join(', ')
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
