// Menu mobile + filtres des actualités
document.addEventListener("DOMContentLoaded", () => {
  const entete = document.querySelector(".entete");
  const burger = document.querySelector(".burger");
  if (entete && burger) {
    const basculer = (ouvert) => {
      entete.classList.toggle("est-ouvert", ouvert);
      burger.setAttribute("aria-expanded", String(ouvert));
      burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    };
    burger.addEventListener("click", () => basculer(!entete.classList.contains("est-ouvert")));
    entete.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => basculer(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") basculer(false); });
  }

  const filtres = document.querySelectorAll(".filtre");
  filtres.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const cat = bouton.dataset.filtre;
      filtres.forEach((b) => b.setAttribute("aria-pressed", String(b === bouton)));
      document.querySelectorAll(".actu[data-categorie]").forEach((carte) => {
        carte.hidden = cat !== "" && carte.dataset.categorie !== cat;
      });
    });
  });
});
