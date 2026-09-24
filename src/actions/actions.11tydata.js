export default {
  layout: "action.njk",
  eleventyComputed: {
    permalink: (d) => (d.brouillon ? false : `/actions/${d.page.fileSlug}/`),
  },
};
