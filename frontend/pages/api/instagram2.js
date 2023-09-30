import puppeteer from "puppeteer"
const cacheData = require("memory-cache")

const CACHE_TIME = 60 * 60 * 24 * 1000 // 1 day in milliseconds
const CACHE_KEY = "instagram2"

export default async function handler(req, res) {
  try {
    const noCache = req.query.noCache === "true" || false
    let data = cacheData.get(CACHE_KEY)
    if (!data || noCache) {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      await page.goto("https://www.instagram.com/cocoonluxuryproperties")
      await page.setViewport({ width: 1080, height: 1024 })

      await page.waitForSelector('a[href^="/p/"]')
      data = await page.$$eval('a[href^="/p/"]', (links) => {
        let items = []
        for (const link of links) {
          const img = link.querySelector("img")
          const src = img.getAttribute("src")
          const alt = img.getAttribute("alt")
          const href = link.getAttribute("href")
          items.push({
            thumbnail_src: src,
            thumbnail_alt: alt,
            link: `https://www.instagram.com${href}`,
          })
        }
        return items
      })
      cacheData.put(CACHE_KEY, data, CACHE_TIME)
      await browser.close()
    }

    res.status(200).json({
      message: "Successful",
      data,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error,
    })
  }
}
