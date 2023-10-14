const {igApi} = require('insta-fetcher')
const cacheData = require('memory-cache')

const getConfig = require('next/config')
const { serverRuntimeConfig } = getConfig()

const CACHE_TIME = 60 * 60 * 24 * 1000 // 1 day in milliseconds
const CACHE_KEY = 'instagram'

const ig = new igApi(serverRuntimeConfig.instagramCookie)

export default async function handler(req, res) {
  try {
    const noCache = req.query.noCache === 'true' || false;
    let data = cacheData.get(CACHE_KEY)
    if (!data || noCache) {
      const posts = await ig.fetchUserPosts("cocoonluxuryproperties")
      data = posts.edges.map((it) => {
        const item = {
          id: it.node.id,
          owner_id: it.node.owner.id,
          shortcode: it.node.shortcode,
          display_url: it.node.display_url,
          thumbnail_src: it.node.thumbnail_src,
          likes: it.node.edge_liked_by.count,
          comments: it.node.edge_media_to_comment.count,
          timestamp: it.node.taken_at_timestamp,
          is_video: it.node.is_video,
          link: `https://www.instagram.com/p/${it.node.shortcode}/`,
        }
        if (it.node.edge_media_to_caption.edges.length > 0) {
          item.caption = it.node.edge_media_to_caption.edges[0].node.text
        }
        return item
      });
      cacheData.put(CACHE_KEY, data, CACHE_TIME)
    }

    res.status(200).json({
      message: "Successful",
      data,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error,
    });
  }
}
