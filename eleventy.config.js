import markdownItAnchor from "markdown-it-anchor";

const MOIS_RC = ["zanvié", "févrié", "mars", "avril", "mé", "zin", "zuyé", "out", "sèktanm", "oktob", "novanm", "désanm"];

export default function (eleventyConfig) {
  // Ancres automatiques sur les titres (ex. /nous-soutenir/#adherer)
  eleventyConfig.amendLibrary("md", (md) =>
    md.use(markdownItAnchor, { slugify: (s) => eleventyConfig.getFilter("slugify")(s) })
  );

  // Fichiers copiés tels quels
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");

  const trier = (a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99);
  const publie = (p) => !p.data.brouillon;

  // Actions en français
  eleventyConfig.addCollection("actions", (api) =>
    api.getFilteredByGlob("src/actions/*.md").filter(publie).sort(trier)
  );
  // Actions en créole : version kréol si elle existe, sinon la version française
  eleventyConfig.addCollection("actions_rc", (api) => {
    const rc = new Map(api.getFilteredByGlob("src/rc/actions/*.md").map((p) => [p.fileSlug, p]));
    return api
      .getFilteredByGlob("src/actions/*.md")
      .filter(publie)
      .map((fr) => {
        const k = rc.get(fr.fileSlug);
        if (!k || !publie(k)) return fr;
        // photo, ordre et « projet phare » viennent de la fiche française
        for (const c of ["image", "phare", "ordre"]) if (k.data[c] === undefined || k.data[c] === "") k.data[c] = fr.data[c];
        if (!k.data.image_alt) k.data.image_alt = fr.data.image_alt;
        return k;
      })
      .sort(trier);
  });
  eleventyConfig.addCollection("actualites", (api) =>
    api.getFilteredByGlob("src/actualites/*.md").filter(publie).sort((a, b) => b.date - a.date)
  );

  // Dates : « 18 septembre 2026 » / « 18 sèktanm 2026 »
  eleventyConfig.addFilter("dateFr", (d, lang = "fr") => {
    const x = new Date(d);
    if (lang === "rc") return `${x.getUTCDate()} ${MOIS_RC[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
    return x.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // Lien interne dans la bonne langue : /actions/aril/ -> /rc/actions/aril/
  eleventyConfig.addFilter("lien", (url, lang) => {
    if (!url || lang !== "rc" || !url.startsWith("/")) return url;
    if (url.startsWith("/rc/") || url.startsWith("/assets/") || url.startsWith("/admin")) return url;
    if (/^\/actualites\/.+/.test(url)) return url; // les articles restent en français
    return "/rc" + url;
  });

  // Adresse de la même page dans l'autre langue (ou l'accueil si elle n'existe pas)
  eleventyConfig.addFilter("autreLangue", function (url, lang, all) {
    const cible = lang === "rc" ? url.replace(/^\/rc(\/|$)/, "/") : "/rc" + url;
    const existe = (all || []).some((p) => p.url === cible);
    return existe ? cible : lang === "rc" ? "/" : "/rc/";
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
