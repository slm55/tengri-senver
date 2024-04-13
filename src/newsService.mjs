import puppeteer from "puppeteer";

export async function scrapeNewsItems() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://tengrinews.kz/");

  // Extract data
  const newsItems = page.$$eval(".main-news_super_item", (divs) => {
    const items = Array.from(divs);

    return items.map((item) => {
      const link = item.querySelector("a").getAttribute("href");
      const imageUrl =
        "https://tengrinews.kz" + item.querySelector("img").getAttribute("src");
      const title = item
        .querySelector(".main-news_super_item_title")
        .textContent.trim();
      const publishTime = item.querySelector("time").textContent.trim();
      const viewsCount = item
        .querySelector(".content_item_meta_viewings span")
        .textContent.trim();
      const commentsCount = item
        .querySelector(".content_item_meta_comments span")
        .textContent.trim();

      return {
        link,
        imageUrl,
        title,
        publishTime,
        viewsCount,
        commentsCount,
      };
    });
  });

  const latestNewsItems = page.$$eval(
    "#content-1 .main-news_top_item",
    (divs) => {
      const items = Array.from(divs);

      return items.map((item) => {
        const link =
          item.querySelector("a").getAttribute("href");
        const title = item
          .querySelector(".main-news_top_item_title a")
          .textContent.trim();
        const publishTime = item.querySelector("time").textContent.trim();
        const viewsCount = item
          .querySelector(".content_item_meta_viewings span")
          .textContent.trim();
        const commentsCount = item
          .querySelector(".content_item_meta_comments span")
          .textContent.trim();

        return {
          link,
          title,
          publishTime,
          viewsCount,
          commentsCount,
        };
      });
    }
  );

  const popularNewsItems = page.$$eval(
    "#content-2 .main-news_top_item",
    (divs) => {
      const items = Array.from(divs);

      return items.map((item) => {
        const link =
          item.querySelector("a").getAttribute("href");
        const title = item
          .querySelector(".main-news_top_item_title a")
          .textContent.trim();
        const publishTime = item
          .querySelector(".main-news_top_item_meta span")
          .textContent.trim();
        const viewsCount = item
          .querySelector(".content_item_meta_viewings span")
          .textContent.trim();
        const commentsCount = item
          .querySelector(".content_item_meta_comments span")
          .textContent.trim();

        return {
          link,
          title,
          publishTime,
          viewsCount,
          commentsCount,
        };
      });
    }
  );

  const news = {
    topNews: await newsItems,
    latestNews: await latestNewsItems,
    popularNews: await popularNewsItems,
  };

  await browser.close();

  return news;
}

async function scrapeLatestNewsItems() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://tengrinews.kz/");

  // Extract data
  const newsItems = await page.$$eval(
    "#content-1 .main-news_top_item",
    (divs) => {
      const items = Array.from(divs);

      return items.map((item) => {
        const link =
          "https://tengrinews.kz" +
          item.querySelector("a").getAttribute("href");
        const title = item
          .querySelector(".main-news_top_item_title a")
          .textContent.trim();
        const publishTime = item.querySelector("time").textContent.trim();
        const viewsCount = item
          .querySelector(".content_item_meta_viewings span")
          .textContent.trim();
        const commentsCount = item
          .querySelector(".content_item_meta_comments span")
          .textContent.trim();

        return {
          link,
          title,
          publishTime,
          viewsCount,
          commentsCount,
        };
      });
    }
  );

  await browser.close();

  return newsItems;
}

async function scrapePopularNewsItems() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://tengrinews.kz/");

  // Extract data
  const newsItems = await page.$$eval(
    "#content-2 .main-news_top_item",
    (divs) => {
      const items = Array.from(divs);

      return items.map((item) => {
        const link =
          "https://tengrinews.kz" +
          item.querySelector("a").getAttribute("href");
        const title = item
          .querySelector(".main-news_top_item_title a")
          .textContent.trim();
        const publishTime = item
          .querySelector(".main-news_top_item_meta span")
          .textContent.trim();
        const viewsCount = item
          .querySelector(".content_item_meta_viewings span")
          .textContent.trim();
        const commentsCount = item
          .querySelector(".content_item_meta_comments span")
          .textContent.trim();

        return {
          link,
          title,
          publishTime,
          viewsCount,
          commentsCount,
        };
      });
    }
  );

  await browser.close();

  return newsItems;
}

export async function scrapeNewsItem(link) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://tengrinews.kz" + link);
  
    // Extract data
    const newsItem = await page.$eval(
      ".first",
      (container) => {
  
        function convertRefToLink(ref) {
          const reactLink = document.createElement("Link");
          const link = ref.href.split("https://tengrinews.kz")[1] ?? "";
          const text = ref.textContent;
          reactLink.textContent = text;
          reactLink.setAttribute("to", link);
          return reactLink;
        }
        
        function convertElementToString(element) {
          const refs = element.querySelectorAll("a");
          if (refs) {
              refs.forEach((ref) => {
               element.replaceChild(convertRefToLink(ref), ref);
              });
          }
          return element.outerHTML;
        }
  
        const publishTime= container.querySelector(".date-time").textContent;
  
        const title = container.querySelector(".head-single").textContent;
  
        const viewsCount = container.querySelector(".content_main_meta_stat_view span").textContent;
  
        const commentsCount = container.querySelector(".content_main_meta_stat_comm span").textContent;
  
        const imageUrl = "https://tengrinews.kz" + container.querySelector(".content_main_thumb_img img").src;
  
        const description = container.querySelector(".content_main_desc p").innerText;
  
        const mainTextNodes = Array.from(container.querySelector(".content_main_text").children).filter((node) => node.nodeName == "P" || node.nodeName == "BLOCKQUOTE");

        mainTextNodes.shift();
        mainTextNodes.pop();
        

        const mainText = mainTextNodes.map(node => convertElementToString(node)).join("");
  
        return {
          publishTime,
          title,
          viewsCount,
          commentsCount,
          imageUrl,
          description,
          mainText
        }
      }
    );
  
    await browser.close();
  
    return newsItem;
  }