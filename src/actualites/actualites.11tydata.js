export default {
  layout: "actualite.njk",
  eleventyComputed: {
    permalink: (d) => (d.brouillon ? false : `/actualites/${d.page.fileSlug}/`),
  },
};
