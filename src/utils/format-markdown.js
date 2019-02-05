import marked from 'marked'

export default function (markdown) {
  // This is here because marked for some reason refuses to
  // render some line breaks
  markdown = markdown.replace(/\n/g, '\n\n')

  const renderer = new marked.Renderer({
    gfm: true,
    tables: true,
    breaks: true,
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

  return marked(markdown, { renderer })
}
