const cacheData = require("memory-cache")

const { fetchInstagramPosts, fetchMediaList } = require("../../lib/api");

const CACHE_TIME = 60 * 60 * 1000 // 1 hour
const CACHE_KEY = "instagram3"

export default async function handler(req, res) {
  try {
    const noCache = req.query.noCache === "true" || false
    let data = cacheData.get(CACHE_KEY)
    if (!data || noCache) {
      const response = await fetchInstagramPosts(4);
      let imageMediaIds = []
      for (let i = 0; i < response.length; i++) {
        imageMediaIds.push(response[i].acf.image)
      }
      const mediaList = await fetchMediaList(imageMediaIds)
      for (let i = 0; i < response.length; i++) {
        response[i].acf.image = mediaList.find((media) => media.id === response[i].acf.image)?.source_url
      }
      data = response
      cacheData.put(CACHE_KEY, data, CACHE_TIME)
    }
    res.status(200).json({
      message: "Successful",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  } 
}
