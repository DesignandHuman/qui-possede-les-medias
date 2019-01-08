import { isEmpty, renderData } from './libs/utils'

async function init () {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  })

  const boxData = await browser.runtime.sendMessage({
    action: 'popup',
    hostname: tabs[0].url.split('/')[2].split('.').slice(-2).join('.')
  })

  if (isEmpty(boxData)) {
    return
  }

  const box = document.createElement('div')
  box.className = 'qui-possede-les-medias-box'

  const text = document.createElement('p')
  text.className = 'qui-possede-les-medias-text'
  text.innerHTML = `Ce média appartient à ${renderData(boxData)}.`
  box.appendChild(text)

  document.querySelector('body').append(box)
}

init()
