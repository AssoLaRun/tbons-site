// Menu mobile + filtres des actualités
document.addEventListener("DOMContentLoaded", () => {
  const entete = document.querySelector(".entete");
  const burger = document.querySelector(".burger");
  if (entete && burger) {
    const basculer = (ouvert) => {
      entete.classList.toggle("est-ouvert", ouvert);
      burger.setAttribute("aria-expanded", String(ouvert));
      burger.setAttribute("aria-label", ouvert ? burger.dataset.fermer : burger.dataset.ouvrir);
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

  // Événements : masque l'inscription une fois la date passée
  const aujourdhui = new Date(); aujourdhui.setHours(0, 0, 0, 0);
  document.querySelectorAll(".actu--evenement[data-date]").forEach((el) => {
    const passe = new Date(el.dataset.date + "T23:59:59") < aujourdhui;
    const bouton = el.querySelector(".actu__inscription");
    if (bouton) bouton.hidden = passe;
    const etiquette = el.querySelector(".etiquette-evt");
    if (etiquette) {
      etiquette.textContent = passe ? etiquette.dataset.passe : etiquette.dataset.aVenir;
      etiquette.classList.toggle("est-passe", passe);
    }
  });

  // Carrousel du bureau
  const piste = document.querySelector(".bureau__piste");
  if (piste) {
    const membres = [...piste.querySelectorAll(".membre")];
    const pas = () => (membres[0] ? membres[0].getBoundingClientRect().width + 20 : 320);
    const prec = document.querySelector('[data-bureau="prec"]');
    const suiv = document.querySelector('[data-bureau="suiv"]');
    const maj = () => {
      if (prec) prec.disabled = piste.scrollLeft < 8;
      if (suiv) suiv.disabled = piste.scrollLeft + piste.clientWidth > piste.scrollWidth - 8;
    };
    prec && prec.addEventListener("click", () => piste.scrollBy({ left: -pas() }));
    suiv && suiv.addEventListener("click", () => piste.scrollBy({ left: pas() }));
    piste.addEventListener("scroll", maj, { passive: true });
    window.addEventListener("resize", maj);
    maj();
    membres.forEach((m) => {
      const carte = m.querySelector(".membre__carte");
      const detail = m.querySelector(".membre__detail");
      if (!detail) return;
      carte.addEventListener("click", () => {
        const ouvrir = !m.classList.contains("est-ouvert");
        membres.forEach((x) => {
          x.classList.remove("est-ouvert");
          const d = x.querySelector(".membre__detail");
          if (d) d.hidden = true;
          x.querySelector(".membre__carte").setAttribute("aria-expanded", "false");
        });
        if (ouvrir) {
          m.classList.add("est-ouvert");
          detail.hidden = false;
          carte.setAttribute("aria-expanded", "true");
          m.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
        maj();
      });
    });
  }
});
