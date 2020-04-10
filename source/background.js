import 'webext-dynamic-content-scripts'
import localforage from 'localforage'
import { isEmpty } from './libs/utils'
import { renderBadge } from './libs/browser'
import optionsStorage from './libs/storage'

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL])

const sitesStore = localforage.createInstance({name: "sites"})
const entitiesStore = localforage.createInstance({name: "entities"})

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason !== 'install') {
    await sitesStore.clear()
  }
  const { default: data } = await import(/* webpackChunkName: "sites" */ '../data/sites.csv')
  for (const item of data) {
    await sitesStore.setItem(item.domain, [
      item.holder1,
      item.holder2,
      item.holder3,
      item.holder4
    ].filter(holder => holder !== ""))
  }

})

browser.runtime.onInstalled.addListener(async event => {
  if (event.reason !== 'install') {
    await sitesStore.clear()
  }
  const { default: data } = await import(/* webpackChunkName: "entities" */ '../data/entities.csv')
  for (const item of data) {
    await entitiesStore.setItem(item.name, item)
  }
})

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (!message || !message.action) {
    return
  }
  const site = await sitesStore.getItem(message.hostname)
  if (isEmpty(site)) {
    return
  }

  if (message.action === 'content') {
    await renderBadge(site.length.toString() || '', sender.tab.id)
    // await browser.tabs.insertCSS(sender.tab.id, { file: 'content.css' })

    const { enableContent } = await optionsStorage.getAll();

    if (!enableContent) {
      return
    }
  }

  return Promise.all(site.map(async name => ((await entitiesStore.getItem(name)) || {name})))
})
