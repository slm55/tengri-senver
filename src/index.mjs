import express from "express";
import { scrapeNewsItems, scrapeNewsItem } from "./newsService.mjs";
import puppeteer from "puppeteer";


const app = express();

app.get("/", async (req, res) => {
    const newsItems = await scrapeNewsItems();
    res.send(newsItems);
});

app.get("/news", async (req, res) => {
  const link = req.query.link;
  const newsItem = await scrapeNewsItem(link);
  res.send(newsItem);
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Running on Port ${PORT}`);
});
