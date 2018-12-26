import domLoaded from 'dom-loaded'
import elementReady from 'element-ready'

/**
 * Automatically stops checking for an element to appear once the DOM is ready.
 *
 * @license MIT Sindre Sorhus
 */
export const safeElementReady = selector => {
  const waiting = elementReady(selector)

  // Don't check ad-infinitum
  domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()))

  // If cancelled, return null like a regular select() would
  return waiting.catch(() => null)
}

export const isEmpty = variable => (!variable || variable === {})

export const renderBadge = (text, tabId) => {
	browser.browserAction.setBadgeText({text, tabId})
}

export const renderData = (data) => data
  .filter(entity => entity.type === 'holder')
  .map(entity => entity.link ? `<a href="${entity.link}" rel="noopener noreferrer" target="_blank">${entity.name}</a>` : entity.name)
  .join(', ')
