export const renderBadge = async (text, tabId) => {
  try {
    return browser.browserAction.setBadgeText({text, tabId})
  } catch (error) {
    console.log(error)
    return false
  }
}

export const queryPermission = async (permission) => {
  try {
    return browser.permissions.contains({permissions: [permission]})
  } catch (error) {
    console.log(error)
    return false
  }
}

export const requestPermission = async (permission) => {
  try {
    return browser.permissions.request({origins: [permission]})
  } catch (error) {
    console.log(error)
    return false
  }
}
