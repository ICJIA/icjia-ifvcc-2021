/* eslint-disable no-unused-vars */
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const { GraphQLClient, gql } = require("graphql-request");
const { Headers } = require("cross-fetch");
const myConfig = require("./src/config.json");
const endpoint = myConfig.api.baseGraphQL;
const utils = require("./lib/utils");
const fs = require("fs");

global.Headers = global.Headers || Headers;

const manualRoutes = ["/circuits/all/"];

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    // Authorization: `Bearer ${JWT}`,
  },
});

Object.defineProperty(Array.prototype, "flat", {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  },
});

const query = gql`
  query {
    posts {
      slug
      pathPrefix
      updatedAt
    }
    pages {
      slug
      pathPrefix
      updatedAt
    }
    councils {
      slug
      pathPrefix
      updatedAt
    }
    counties {
      slug
      pathPrefix
      updatedAt
    }
  }
`;

async function main() {
  const data = await graphqlClient.request(query);
  const sections = Object.keys(data);
  console.log(sections);

  let index = sections.map((section) => {
    let items = data[section].map((item) => {
      let searchObj = {};

      if (myConfig.publicPath === "/") {
        searchObj.url = `${myConfig.clientURL}${item.pathPrefix}${item.slug}/`;
      } else {
        searchObj.url = `${myConfig.clientURL}${myConfig.publicPath}${item.pathPrefix}${item.slug}/`;
      }
      searchObj.changefreq = "daily";
      searchObj.priority = 0.3;
      searchObj.lastmod =
        item.updatedAt || new Date().toJSON().substring(0, 10);

      return searchObj;
    });

    return items;
  });

  let links = index.flat();
  links = utils.filterUndefined(links);

  let manualLinks = manualRoutes.map((route) => {
    let routeObj = {
      url: route,
      changefreq: "daily",
      priority: 0.3,
      lastmod: new Date().toJSON().substring(0, 10),
    };
    return routeObj;
  });

  const sitemapInfo = [...links, ...manualLinks];

  const stream = new SitemapStream({
    hostname: `${myConfig.clientURL}`,
  });

  let sitemap = await streamToPromise(Readable.from(sitemapInfo).pipe(stream));
  fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
  console.log(`Created: ./public/sitemap.xml`);
}

main();
