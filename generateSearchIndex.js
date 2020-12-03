/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const jsonfile = require("jsonfile");
const myConfig = require("./src/config.json");
const fs = require("fs");
const apiDir = "./src/api";
const dotenv = require("dotenv").config();
const JWT = process.env.JWT;
const endpoint = myConfig.api.baseGraphQL;
const cheerio = require("cheerio");
const Fuse = require("fuse.js");
const toc = require("./lib/markdown-toc-fork");

const utils = require("./lib/utils");
const blacklist = [
  ".DS_Store",
  "placeholder.png",
  "placeholder.json",
  "placeholder.md",
];

const md = require("markdown-it")({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: false,
  quotes: "“”‘’",
  highlight: function (/*str, lang*/) {
    return "";
  },
})
  .use(require("markdown-it-attrs"))
  .use(require("markdown-it-named-headers"));

const { GraphQLClient, gql } = require("graphql-request");
const { Headers } = require("cross-fetch");
global.Headers = global.Headers || Headers;

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
    news: posts {
      id
      title
      summary
      slug
      body
      pathPrefix
    }

    pages {
      id
      title
      summary
      slug
      body
      pathPrefix
    }

    circuits: councils {
      id
      title
      slug
      body
      pathPrefix
    }

    counties {
      id
      title: name
      slug
      pathPrefix
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
      searchObj.title = item.title || item.name;
      searchObj.contentType = section;
      searchObj.type = "html";
      searchObj.section = section;
      searchObj.slug = item.slug;
      let markdown = item.body || "";
      searchObj.html = md.render(markdown);
      let $ = cheerio.load(searchObj.html);
      searchObj.markdown = markdown;
      let headings = [];
      $("h2").filter(function () {
        let data = $(this);
        let text = data.text();
        headings.push(text);
      });
      searchObj.headings = headings;
      searchObj.rawText = searchObj.html
        .replace(/<[^>]*>?/gm, "")
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/ +(?= )/g, "");

      searchObj.route = `${item.pathPrefix}${searchObj.slug}/`;

      searchObj.summary = item.summary || "";

      if (myConfig.publicPath === "/") {
        searchObj.url = `${myConfig.clientURL}${searchObj.route}`;
      } else {
        searchObj.url = `${myConfig.clientURL}${myConfig.publicPath}${searchObj.route}`;
      }

      // searchObj.toc = toc(markdown).json;

      return searchObj;
    });
    return items;
  });

  let siteMeta = index.flat();
  siteMeta = utils.filterUndefined(siteMeta);
  // const fuseIndex = Fuse.createIndex(myConfig.search.keys, siteMeta);
  // fs.writeFileSync(
  //   "./public/fuse-index.json",
  //   JSON.stringify(fuseIndex.toJSON())
  // );
  // console.log(`Fuse search index created: ./public/fuse-index.json"`);

  utils.saveJson(siteMeta, "./public/site-meta.json");
  console.log(`Site meta created: ./public/site-meta.json"`);
  //console.log(siteMeta);
}

main();
