import marked from 'marked'

export default function (markdown) {
  const renderer = new marked.Renderer({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  })

  // Extend linkRenderer to return links that open in a new tab
  const linkRenderer = renderer.link
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text)
    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
  }

  return marked(markdown, {renderer})
}
