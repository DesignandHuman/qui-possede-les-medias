import 'webext-dynamic-content-scripts'
import select from 'select-dom'

import { safeElementReady } from './libs/document'
import { isEmpty, renderData } from './libs/utils'

// Add globals for easier debugging
window.select = select

async function init () {
  const boxData = await browser.runtime.sendMessage({
    action: 'content',
    hostname: location.hostname.split('.').slice(-2).join('.')
  })

  if (isEmpty(boxData)) {
    return
  }

  await safeElementReady('body')
  document.documentElement.classList.add('qui-possede-les-medias')

  const box = document.createElement('div')
  box.className = 'qui-possede-les-medias-box'

  const button = document.createElement('button')
  button.className = 'qui-possede-les-medias-button'
  button.innerHTML = '✖'
  button.addEventListener('click', (e) => e.currentTarget.parentNode.remove())
  box.appendChild(button)

  const text = document.createElement('p')
  text.className = 'qui-possede-les-medias-text'
  text.innerHTML = `Ce média appartient à ${renderData(boxData)}.`
  box.appendChild(text)

  select('body').append(box)
}

init()
