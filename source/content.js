import 'webext-dynamic-content-scripts'
import select from 'select-dom'
import elementReady from 'element-ready'

import {isEmpty, renderText} from './libs/utils'

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

  await elementReady('body', {
    stopOnDomReady: false
  })
  document.documentElement.classList.add('qui-possede-les-medias')

  const box = document.createElement('div')
  box.className = 'qui-possede-les-medias-box'

  const button = document.createElement('button')
  button.className = 'qui-possede-les-medias-button'
  button.innerHTML = '✖'
  button.addEventListener('click', (e) => e.currentTarget.parentNode.remove())
  box.appendChild(button)

  box.appendChild(renderText(boxData))

  select('body').append(box)
}

init()
