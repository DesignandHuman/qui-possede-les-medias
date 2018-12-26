export const isEmpty = variable => (!variable || variable.length === 0 || Object.getOwnPropertyNames(variable).length === 0)

export const renderData = (data) => data
  .filter(entity => entity.type === 'holder')
  .map(entity => entity.link ? `<a href="${entity.link}" rel="noopener noreferrer" target="_blank">${entity.name}</a>` : entity.name)
  .join(', ')
