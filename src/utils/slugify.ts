export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()
  const from = 'áàäâãéèëêíìïîóòöôõúùüûñç'
  const to = 'aaaaaeeeeiiiiooooouuuunc'
  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}
