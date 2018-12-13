import localforage from 'localforage'
import { isEmpty } from './libs/utils'

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL])

const sitesStore = localforage.createInstance({name: "sites"})
const entitiesStore = localforage.createInstance({name: "entities"})

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason === 'install') {
    const { default: data } = await import(/* webpackChunkName: "sites" */ './data/sites.json')
    for (const site in data) {
      sitesStore.setItem(site, data[site])
    }
  }
})

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason === 'install') {
    const { default: data } = await import(/* webpackChunkName: "entities" */ './data/entities.json')
    for (const ref in data) {
      entitiesStore.setItem(ref, data[ref])
    }
  }
})

browser.runtime.onMessage.addListener(async message => {
  if (!message || message.action !== 'request') {
    return
  }
  const site = await sitesStore.getItem(message.hostname)
  if (isEmpty(site)) {
    return
  }
  // await browser.tabs.insertCSS({ file: 'content.css' })
  let dad = await Promise.all(site.map(async name => ((await entitiesStore.getItem(name)) || {name})))
  return dad
})
