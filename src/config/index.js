const IS_DEVELOPMENT = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

const NETWORK = process.env.NET || "ropsten";
const IS_MAINNET = NETWORK === "mainnet";
const NETWORK_NAME = IS_MAINNET ? "homestead" : NETWORK;
const ETHERSCAN_SUBDOMAIN = IS_MAINNET ? "" : `${NETWORK_NAME}.`;
const GA_MEASUREMENT_ID_DEVELOPMENT = "G-13GYPPVD4Y";
const GA_MEASUREMENT_ID_PRODUCTION = "G-7YL3CX08LM";
const GA_MEASUREMENT_ID = IS_MAINNET ? GA_MEASUREMENT_ID_PRODUCTION : GA_MEASUREMENT_ID_DEVELOPMENT;

module.exports = {
  ETHERSCAN_BASE_URL: `https://${ETHERSCAN_SUBDOMAIN}etherscan.io/`,
  GA_MEASUREMENT_ID,
  GA_CONFIG_OPTION: {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    debug_mode: IS_DEVELOPMENT,
  },
  INFURA_API_KEY: process.env.INFURA_API_KEY || "bb46da3f80e040e8ab73c0a9ff365d18",
  INFURA_PROJECT_ID: "1f1ff2b3fca04f8d99f67d465c59e4ef",
  IS_DEVELOPMENT,
  IS_MAINNET,
  MAGIC_API_KEY: process.env.MAGIC_API_KEY || "pk_test_AB1F885AF848182E",
  NETWORK,
  NETWORK_NAME,
  NETWORK_ID: IS_MAINNET ? "1" : "3",
};
