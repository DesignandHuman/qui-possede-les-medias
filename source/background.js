import localforage from 'localforage'
import { isEmpty } from './libs/utils'

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL])

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason === 'install') {
    const { default: data } = await import(/* webpackChunkName: "data" */ './data.json')
    for (let site in data) {
      localforage.setItem(site, data[site])
    }
  }
})

browser.runtime.onMessage.addListener(async message => {
  if (!message || message.action !== 'request') {
    return
  }
  const data = await localforage.getItem(message.hostname)
  if (isEmpty(data)) {
    return
  }
  // await browser.tabs.insertCSS({ file: 'content.css' })
  return data
})
