export function autolink(text: string) {
  const regTag: RegExp = new RegExp('/#[^s]+/', 'g');
  const regURL: RegExp = new RegExp('(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)', 'gi');

  return text
    .replace(regTag, (match) => {
      return `<a href=/search/?q=${match.replace('#', '')}>${match}</a>`;
    })
    .replace(regURL, (match) => {
      return `<a href='${match}' target='_blank'>${match}</a>`;
    });
}
