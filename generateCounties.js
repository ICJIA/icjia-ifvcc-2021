/* eslint-disable no-unused-vars */
const counties = require("./public/counties.json");
const _ = require("lodash");
var slug = require("slug");
const axios = require("axios");
const dotenv = require("dotenv").config();

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer " + process.env.JWT,
  },
};
(async function () {
  let data = counties.geometries.map((county) => {
    let obj = {};
    obj.name = county.properties.NAME;
    obj.slug = slug(county.properties.NAME);
    return obj;
  });

  data.forEach(async (item) => {
    let response = await axios.post(
      `${process.env.BASE_API}/counties`,
      JSON.stringify(item),
      axiosConfig
    );
    console.log(response.data);
  });
})();
