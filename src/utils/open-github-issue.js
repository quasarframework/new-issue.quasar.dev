export default function openGithubIssue (rawTitle, rawBody, repo) {
  const title = encodeURIComponent(rawTitle).replace(/%2B/gi, '+')
  const body = encodeURIComponent(rawBody).replace(/%2B/gi, '+')
  window.open(
    `https://github.com/${repo}/issues/new?title=${title}&body=${body}`)
}
