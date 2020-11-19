<template>
  <v-container fill-height fluid class="px-0" style="margin-top: -12px">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <router-link to="/council">
          <v-card
            dark
            :color="colors.box1"
            height="100%"
            class="elevation-0 px-10 py-8 box"
          >
            <h2 class="text-center box-head">Find a Council</h2>

            <v-card-text class="px-2 font-weight-light box-text">
              Councils provide professional education and prevention; coordinate
              interventions and services for victims and perpetrators; and
              contribute to both the improvement of the legal system and the
              administration of justice.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" md="4">
        <router-link to="/about-the-ifvcc">
          <v-card
            dark
            :color="colors.box2"
            height="100%"
            class="elevation-0 px-10 py-8 box"
          >
            <h2 class="text-center box-head">About the IFVCC</h2>
            <v-card-text class="px-2 font-weight-light box-text">
              Family Violence Coordinating Councils, at both the state and
              local/circuit levels, provide a forum to improve the
              institutional, professional and community response to family
              violence.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" md="4">
        <router-link to="/news">
          <v-card
            dark
            :color="colors.box3"
            height="100%"
            class="elevation-0 px-10 py-8 box"
          >
            <h2 class="text-center box-head">News & Events</h2>
            <v-card-text class="px-2 font-weight-light box-text">
              Local Councils provide opportunities for communication between
              criminal justice professionals and community service providers.
              Find out the latest news and information from the Illinois Family
              Violence Coordinating Councils.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colors: {
        box1: "#442B99",
        box2: "#7655E4",
        box3: "#9274F7",
      },
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
.box:hover {
  background: #ccc !important;
}
.box:hover > * {
  color: #444;
  cursor: pointer;
}
.box-head {
  font-size: 28px;
  text-transform: uppercase;
  color: #fff;
}
.box-text {
  font-size: 18px;
  margin-top: 8px;
  color: #fff;
}
.rule {
  border-bottom: 1px solid #ccc !important;
  border-top: 1px solid #ccc !important;
}

.v-sheet.v-card {
  border-radius: 0px;
}
</style>
