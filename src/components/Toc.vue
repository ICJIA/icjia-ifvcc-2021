<template>
  <div
    class="toc mainToc"
    :class="{
      'pl-2': $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
      'pl-10':
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl,
      shaded: $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
    }"
    style=""
  >
    <div ref="anchorTitle" class="mb-4 hover" @click="$vuetify.goTo(0)">
      {{ tocHeading | upperCase }}
    </div>
    <div class="divider">
      <ul class="toc-list">
        <li
          v-for="(item, index) in toc"
          :key="index"
          @click="scrollTo(item.id)"
        >
          <span :id="`scrollTo-${item.id}`" class="tocItem">{{
            item.text
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toc: [],
    };
  },
  props: {
    selector: {
      type: String,
      default: "#scrollArea",
    },
    tocHeading: {
      type: String,
      default: "NAVIGATION",
    },
    top: {
      type: String,
      default: "#baseContentTop",
    },
    mini: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(id) {
      //console.log(id);
      this.$vuetify.goTo(`#${id}`, { offset: 20 });
    },
    setToc() {
      const sections = Array.from(document.querySelectorAll("h2"));
      sections.forEach((section) => {
        let obj = {};
        obj.text = section.innerText;
        obj.id = section.id;
        this.toc.push(obj);
      });
    },
  },
  async mounted() {
    await this.setToc();
    var section = document.querySelectorAll("h2");
    if (section) {
      var sections = {};
      var i = 0;
      this.$refs["anchorTitle"].classList.add("visible");
      section.forEach((e) => {
        sections[e.id] = e.offsetTop - 20;
      });

      window.onscroll = () => {
        var scrollPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        const tocItems = document.querySelectorAll(".tocItem");

        if (scrollPosition < 100) {
          tocItems.forEach((toc) => {
            toc.classList.remove("visible");
          });
          this.$refs["anchorTitle"].classList.add("visible");
        } else {
          this.$refs["anchorTitle"].classList.remove("visible");
        }
        //console.log(scrollPosition);
        for (i in sections) {
          if (sections[i] <= scrollPosition) {
            const sectionItem = document.getElementById(`scrollTo-${i}`);

            tocItems.forEach((toc) => {
              toc.classList.remove("visible");
            });
            sectionItem.classList.add("visible");
          }
        }
      };
    }
  },
  beforeDestroy() {
    window.onscroll = () => {};
  },
};
</script>

<style>
.mainToc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 115px !important;
  font-size: 13px;
}
.divider {
  border-left: 1px solid #ccc;
}

.visible {
  color: #0d4474;
  font-weight: bold;
}
.anchorTitle {
  padding: 2px 5px 2px 5px;
}
.anchorTitle:hover {
  color: #0d4474;
  background: #eee;
}

.shaded {
  background: #eee;
  padding: 15px;
  margin-bottom: 25px;
}

.toc {
}

ul.toc-list {
  list-style-type: none;
}

ul.toc-list li {
  color: #333;

  padding: 2px 5px 2px 5px;
  cursor: pointer;
  margin-bottom: 3px;
  font-size: 14px;
}

ul.toc-list li:hover {
  color: #aaa;
  background: #eee;
}
@media only screen and (max-width: 1024px) {
  .divider {
    border-left: 0px solid #ccc;
  }

  ul.toc-list li:hover {
    color: #fff;
    background: #aaa;
  }
}
</style>
