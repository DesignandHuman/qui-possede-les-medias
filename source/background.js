import localforage from 'localforage'
import { isEmpty } from './libs/utils'
import { renderBadge } from './libs/browser'

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL])

const sitesStore = localforage.createInstance({name: "sites"})
const entitiesStore = localforage.createInstance({name: "entities"})

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason === 'install') {
    const { default: data } = await import(/* webpackChunkName: "sites" */ './data/sites.json')
    for (const site in data) {
      await sitesStore.setItem(site, data[site])
    }
  }
})

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason === 'install') {
    const { default: data } = await import(/* webpackChunkName: "entities" */ './data/entities.json')
    for (const ref in data) {
      await entitiesStore.setItem(ref, data[ref])
    }
  }
})

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (!message) {
    return
  }
  const site = await sitesStore.getItem(message.hostname)
  if (isEmpty(site)) {
    return
  }

  if (message.action === 'content') {
    renderBadge(site.length.toString() || '', sender.tab.id)
  }
  // await browser.tabs.insertCSS(sender.tab.id, { file: 'content.css' })
  return Promise.all(site.map(async name => ((await entitiesStore.getItem(name)) || {name})))
})
