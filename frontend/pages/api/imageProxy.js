import fetch from 'isomorphic-unfetch'
import stream, { Stream } from 'stream'
import UserAgent from 'user-agents'

const WHITELISTED_PATTERNS = [/^https?:\/\/(.*).fbcdn.net/]

export default async function handler(req, res) {
  const url = new URL(req.query.imageUrl);

  Object.keys(req.query).map((key) =>
    url.searchParams.append(key, req.query[key]),
  );

  const imageUrl = url.href;

  if (!imageUrl || (imageUrl && Array.isArray(imageUrl))) {
    res.status(400).send({ message: options.messages.wrongFormat })
    return
  }

  const isAllowed = isUrlWhitelisted(imageUrl, WHITELISTED_PATTERNS)

  if (!isAllowed) {
    res.status(422).send({ message: options.messages.notWhitelisted })
    return
  }

  const imageBlob = await fetchImageBlob(imageUrl)

  pipeImage(res, imageBlob)
}

function pipeImage(res, imageBlob ) {
  const passThrough = new Stream.PassThrough()

  stream.pipeline(imageBlob, passThrough, (err) => {
    if (err) {
      console.log(err)
    }
  })
  passThrough.pipe(res)
}

async function fetchImageBlob(url) {
  return await fetch(url, {
    headers: { 'user-agent': new UserAgent().toString() },
  }).then((data) => data.body)
}

function isUrlWhitelisted(url, whitelistedPatterns) {
  return whitelistedPatterns.some((singleHost) => {
    return url.match(singleHost)
  })
}
