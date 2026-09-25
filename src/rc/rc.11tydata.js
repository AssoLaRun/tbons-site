// Version en créole réunionnais : tout ce qui est dans src/rc/ est publié sous /rc/
export default {
  lang: "rc",
  eleventyComputed: {
    layout: (d) => (d.page.inputPath.includes("/rc/actions/") ? "action.njk" : "page.njk"),
    permalink: (d) => {
      if (d.brouillon) return false;
      if (d.page.inputPath.includes("/rc/actions/")) return `/rc/actions/${d.page.fileSlug}/`;
      return `/rc/${d.page.fileSlug}/`;
    },
  },
};
