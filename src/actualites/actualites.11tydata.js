export default {
  layout: "actualite.njk",
  lang: "fr",
  eleventyComputed: {
    permalink: (d) => (d.brouillon ? false : `/actualites/${d.page.fileSlug}/`),
  },
};
