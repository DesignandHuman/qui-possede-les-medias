import 'webext-dynamic-content-scripts'
import select from 'select-dom'

import { safeElementReady, isEmpty } from './libs/utils'

// Add globals for easier debugging
window.select = select

function dataToString(data) {
  if (isEmpty(data)) {
    return  ''
  }
  if (!Array.isArray(data)) {
    return data
  }
  const lastEl = data.pop()
  return [data.join(', '), lastEl].join(' et ')
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
  box.innerHTML = `Ce média appartient
      aux groupes ${dataToString(boxData['group'])}
      et aux actionnaires ${dataToString(boxData['holders'])}.`
  select('body').append(box)
}

init()
