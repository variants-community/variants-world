import type { JSX } from 'preact'

const replacer: (
  text: string,
  regex: RegExp,
  resolver: (m: RegExpExecArray) => JSX.Element | string,
  next?: (text: string) => (JSX.Element | string)[]
) => (JSX.Element | string)[] = (text, regex, resolver, next) => {
  const parts: (JSX.Element | string)[] = []
  let lastIndex = 0
  for (const m of text.matchAll(regex)) {
    const t = text.slice(lastIndex, m.index)
    if (next) parts.push(...next(t))
    else parts.push(t)
    parts.push(resolver(m))
    lastIndex = m.index + m[0].length
  }
  const t = text.slice(lastIndex)
  if (next) parts.push(...next(t))
  else parts.push(t)
  return parts
}

const postLinkReplacer = (text: string) =>
  replacer(text, /#(\d+)/g, m => (
    <a href={`/posts/${m[1]}`} class="link text-link-post bg-link-post">
      {m[0]}
    </a>
  ))

const gameLinkReplacer = (text: string) =>
  replacer(
    text,
    /g#(\d+)/gi,
    m => (
      <a href={`https://www.chess.com/variants/game/${m[1]}`} class="link text-link-game bg-link-game">
        #{m[1]}
      </a>
    ),
    postLinkReplacer
  )

const generalLinkReplacer = (text: string) =>
  replacer(
    text,
    /https?:\/\/[^\s]+/g,
    m => (
      <a href={m[0]} class="link text-link bg-link">
        {m[0]}
      </a>
    ),
    gameLinkReplacer
  )

export const highlightLinks = (content: string) => {
  return generalLinkReplacer(content)
}
