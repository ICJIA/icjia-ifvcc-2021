/* eslint-disable no-unused-vars */

const slug = require("slug");
const axios = require("axios");
const dotenv = require("dotenv").config();

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer " + process.env.JWT,
  },
};

function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

function truncate(str, max = 10) {
  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? "..." : "";
  return array.slice(0, max).join(" ");
}

(async function () {
  let { data } = await axios.get(process.env.MOCKAROO_POSTS_API);

  const posts = data.map((post) => {
    post.title = titleCase(post.title);
    delete post.isPublished;
    post.splash = null;
    post.slug = slug(post.title);
    post.summary = truncate(post.body);
    return post;
  });

  posts.forEach(async (post) => {
    let response = await axios.post(
      `${process.env.BASE_API}/posts`,
      JSON.stringify(post),
      axiosConfig
    );
    console.log(response.data);
  });

  // console.log(posts);
})();
