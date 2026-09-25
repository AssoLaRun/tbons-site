export default {
  layout: "action.njk",
  lang: "fr",
  eleventyComputed: {
    permalink: (d) => (d.brouillon ? false : `/actions/${d.page.fileSlug}/`),
  },
};
