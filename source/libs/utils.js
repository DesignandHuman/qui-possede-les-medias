export const isEmpty = variable => (!variable || variable.length === 0 || Object.getOwnPropertyNames(variable).length === 0)

export const renderData = (data) => [
  renderPlural(data.filter(entity => entity.type === 'group'), 'du groupe', 'des groupes'),
  renderPlural(data.filter(entity => entity.type === 'holder'), 'appartient à', 'appartient à'),
].join(' ')

export const renderPlural = (data, preSingular, prePlural) => {
  if (data.length < 1) {
    return null
  }
  data = data.map(entity => entity.link
    ? `<a href="${entity.link}" rel="noopener noreferrer" target="_blank">${entity.name}</a>`
    : entity.name
  )
  if (data.length === 1) {
    return `${preSingular} ${data.pop()}`
  }
  if (typeof Intl !== 'undefined' && Intl.ListFormat) {
    const lf = new Intl.ListFormat('fr')
    return `${prePlural} ${lf.format(data)}`
  }
  const last = data.pop()
  return prePlural + ' ' + [
    data.join(', '),
    last
  ].join(' et ')
}
