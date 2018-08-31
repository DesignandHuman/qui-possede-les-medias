import localforage from 'localforage'
import { isEmpty } from './libs/utils'

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL])

browser.runtime.onInstalled.addListener(event => {
  if (event.reason === 'install') {
    const data = require('./data.json')
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
