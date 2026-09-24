import markdownItAnchor from "markdown-it-anchor";

export default function (eleventyConfig) {
  // Ancres automatiques sur les titres (ex. /nous-soutenir/#adherer)
  eleventyConfig.amendLibrary("md", (md) =>
    md.use(markdownItAnchor, { slugify: (s) => eleventyConfig.getFilter("slugify")(s) })
  );

  // Fichiers copiés tels quels
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");

  // Collections alimentées depuis l'interface d'administration
  eleventyConfig.addCollection("actions", (api) =>
    api
      .getFilteredByGlob("src/actions/*.md")
      .filter((p) => !p.data.brouillon)
      .sort((a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99))
  );
  eleventyConfig.addCollection("actualites", (api) =>
    api
      .getFilteredByGlob("src/actualites/*.md")
      .filter((p) => !p.data.brouillon)
      .sort((a, b) => b.date - a.date)
  );

  // Date en français : « 18 septembre 2026 »
  eleventyConfig.addFilter("dateFr", (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("moisFr", (d) =>
    new Date(d).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("where", (arr, key, val) => (arr || []).filter((x) => x.data[key] === val));
  eleventyConfig.addFilter("whereNot", (arr, key, val) => (arr || []).filter((x) => x.data[key] !== val));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
