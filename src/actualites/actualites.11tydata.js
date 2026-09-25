// Adresse propre (sans accents ni apostrophes) pour chaque actualité
const propre = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default {
  layout: "actualite.njk",
  lang: "fr",
  eleventyComputed: {
    permalink: (d) => (d.brouillon ? false : `/actualites/${propre(d.page.fileSlug)}/`),
  },
};
