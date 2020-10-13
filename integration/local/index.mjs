import puppeteer from "puppeteer";
import dappeteer from "dappeteer";
import { transferHolder } from "./transfer-holder.mjs";
import { surrender } from "./surrender.mjs";

const main = async () => {
  const browser = await dappeteer.launch(puppeteer, {
    executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
    headless: false,
    defaultViewport: null,
  });
  const metamask = await dappeteer.getMetamask(browser, {
    seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
  });

  await metamask.switchNetwork("localhost");

  await transferHolder(metamask, browser);
  await surrender(metamask, browser);

  // await browser.close();
};

main();
