import config from "@/config.json";

import siteMeta from "../../public/site-meta.json";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

let myApp = {
  config,
  computedPublicPath,
  siteMeta,
};

export { myApp };
