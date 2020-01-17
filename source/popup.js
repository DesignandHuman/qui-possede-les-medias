import { isEmpty, renderText } from './libs/utils'

async function init () {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  })

  const boxData = await browser.runtime.sendMessage({
    action: 'popup',
    hostname: tabs[0].url.split('/')[2].split('.').slice(-2).join('.')
  })

  const box = document.createElement('div')
  box.className = 'qui-possede-les-medias-box'

  box.appendChild(renderText(boxData))

  document.querySelector('body').append(box)
}

init()
