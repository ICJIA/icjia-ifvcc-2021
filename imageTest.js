const env = require("dotenv").config().parsed;
const ThumborUrlBuilder = require("thumbor-url-builder");
const thumborURL = new ThumborUrlBuilder(
  env.VUE_APP_THUMBOR_KEY,
  "https://image.icjia.cloud"
);

const link = thumborURL
  .setImagePath(`https://ilheals.com/connect-03.jpg`)
  .resize(500, 200)
  .smartCrop(false)
  .buildUrl();

console.log(link);
