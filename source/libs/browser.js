export const renderBadge = (text, tabId) => {
  browser.browserAction.setBadgeText({text, tabId})
}
