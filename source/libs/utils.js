export const isEmpty = variable => (!variable || variable.length === 0 || Object.getOwnPropertyNames(variable).length === 0)

export const renderData = (data) => {
  if (data.length < 1) {
    return null
  }
  data = data.map(entity => entity.link
    ? `<a href="${entity.link}" rel="noopener noreferrer" target="_blank">${entity.name}</a>`
    : entity.name
  )
  if (data.length === 1) {
    return data.pop()
  }
  if (typeof Intl !== 'undefined' && Intl.ListFormat) {
    const lf = new Intl.ListFormat('fr')
    return lf.format(data)
  }
  const last = data.pop()
  return [
    data.join(', '),
    last
  ].join(' et ')
}

export const renderText = (data) => {
  const text = document.createElement('p')
  text.className = 'qui-possede-les-medias-text'
  if (data && data.length > 0) {
    text.innerHTML = `Ce média appartient à ${renderData(data)}.`
  } else {
    text.innerHTML = 'Aucune donnée d’appartenance concernant ce média n’est disponible.'
  }
  return text
}
