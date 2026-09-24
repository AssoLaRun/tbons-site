# Site TBONS : guide de mise en ligne et d'utilisation

Ce dossier contient le site complet de To Be or Not Subir. Il se compose de deux parties.

- **Le site public** : accueil, actions, espace lycéen, actualités, soutien, contact, mentions légales. Il s'affiche bien sur ordinateur et sur mobile.
- **Une interface d'administration** à l'adresse `/admin/` : les membres du bureau y modifient les textes, les chiffres, les photos, les actions et les actualités, sans écrire de code.

Coût : **0 €**. Il n'y a pas d'autre dépense que le nom de domaine, que vous avez déjà.

---

## Étape 1. Créer le compte GitHub de l'association (5 min)

GitHub garde tous les fichiers du site et l'historique de chaque modification. On peut donc toujours revenir en arrière.

1. Créez un compte sur https://github.com, idéalement avec une adresse de l'association.
2. Cliquez sur **New repository**, nommez-le `tbons-site` et choisissez **Private** ou **Public** (les deux fonctionnent).
3. Sur la page du dépôt vide, cliquez sur **uploading an existing file**. Glissez-y **tout le contenu** de ce dossier, sans le dossier `node_modules` s'il existe, puis validez avec **Commit changes**.

## Étape 2. Indiquer le nom du dépôt à l'admin (1 min)

Sur GitHub, ouvrez `src/admin/config.yml`, cliquez sur le crayon, puis remplacez la ligne :

```
repo: VOTRE-COMPTE-GITHUB/tbons-site
```

par le nom réel du dépôt, par exemple `repo: tbons974/tbons-site`. Validez avec **Commit changes**.

## Étape 3. Mettre le site en ligne avec Netlify (5 min)

1. Créez un compte sur https://www.netlify.com avec **Sign up with GitHub**.
2. Cliquez sur **Add new project**, puis **Import an existing project**, puis **GitHub**, et choisissez `tbons-site`.
3. Netlify lit les réglages tout seul grâce au fichier `netlify.toml`. Cliquez sur **Deploy**.
4. Au bout d'environ une minute, le site est en ligne à une adresse du type `https://tbons-xxxx.netlify.app`.

## Étape 4. Activer la connexion à l'admin (5 min)

L'admin se connecte avec un compte GitHub. Il faut autoriser Netlify à faire le lien.

1. Sur GitHub, allez dans votre photo de profil, puis **Settings**, **Developer settings**, **OAuth Apps** et **New OAuth App**.
   - *Application name* : `Admin site TBONS`
   - *Homepage URL* : l'adresse de votre site (celle de Netlify ou `https://tobeornot-subir.com`)
   - *Authorization callback URL* : `https://api.netlify.com/auth/done`
2. Cliquez sur **Register application**, notez le **Client ID**, puis cliquez sur **Generate a new client secret** et notez aussi le secret.
3. Dans Netlify, ouvrez votre projet, puis **Project configuration**, **Access & security**, **OAuth**, **Install provider**, et choisissez **GitHub**. Collez le Client ID et le secret.
4. Allez sur `https://votre-site/admin/` et cliquez sur **Login with GitHub**. L'admin s'ouvre.

**Ajouter d'autres éditeurs** (membres du bureau) : chacun crée un compte GitHub gratuit. Vous l'ajoutez ensuite dans le dépôt, via **Settings**, **Collaborators** et **Add people**.

## Étape 5. Brancher tobeornot-subir.com (10 min, puis jusqu'à 24 h d'attente)

1. Dans Netlify, ouvrez **Domain management**, puis **Add a domain**, et tapez `tobeornot-subir.com`.
2. Chez le gestionnaire du domaine (OVH, IONOS, Google…), dans la zone DNS, ajoutez ou modifiez **seulement** ces deux lignes :
   - `A` pour `@` (la racine), avec la valeur `75.2.60.5`
   - `CNAME` pour `www`, avec la valeur `votre-site.netlify.app`

   Netlify affiche les valeurs exactes à utiliser : fiez-vous à elles.
3. ⚠️ **Ne touchez pas aux lignes `MX` ni `TXT`** : ce sont elles qui font fonctionner les adresses e-mail de l'association.
4. Le HTTPS (cadenas) s'active automatiquement quand le domaine est reconnu.
5. Mettez ensuite à jour la *Homepage URL* de l'application OAuth de l'étape 4 avec le nouveau domaine.

---

## Utiliser l'admin au quotidien

Allez sur `https://tobeornot-subir.com/admin/`.

| Rubrique | Ce qu'on y modifie |
|---|---|
| **Infos clés & page d'accueil**, puis *Infos clés* | Logo, e-mail, téléphone, adresse, liens HelloAsso (don et adhésion), réseaux sociaux, kit presse |
| **Infos clés & page d'accueil**, puis *Page d'accueil* | Titre et grande photo, chiffres clés, 3 engagements, bloc lycéens, bloc soutien |
| **Infos clés & page d'accueil**, puis *Partenaires* | Logos et noms des partenaires, liste des lycées ARIL |
| **Nos actions** | Une fiche par projet : photo, résumé, texte détaillé. Cocher « Projet phare » affiche la grande carte sur l'accueil. |
| **Actualités & presse** | Événements, articles de presse, interventions, communiqués. Pour un article de presse, collez le lien : la carte renverra directement vers le média. |
| **Pages** | Qui sommes-nous, Espace lycéen, Nous soutenir, Contact, Mentions légales |

- **Photos** : cliquez sur le champ image, puis sur *Téléverser*. Préférez du JPG de moins de 500 Ko, 1600 px de large au maximum. Vous pouvez les compresser sur https://squoosh.app.
- **Publier** : cliquez sur **Publier**, puis **Publier maintenant**. Le site se met à jour en 1 à 2 minutes.
- **Brouillon** : cochez « Brouillon » pour préparer une fiche sans l'afficher sur le site.
- **Emplacements vides** : tant qu'aucune photo n'est ajoutée, le site affiche un cadre beige « Photo à ajouter ».
- **Textes entre crochets** : les `[À compléter]`, `[NB]` et `[Lycée 1]` sont à remplacer avant d'annoncer le site.

### ⚠️ Limite du plan gratuit Netlify

Chaque clic sur **Publier** reconstruit le site. Le plan gratuit permet **environ 20 publications par mois**. Au-delà, le site reste en ligne, mais les nouvelles modifications attendent le mois suivant. **Astuce** : faites plusieurs modifications, puis publiez-les ensemble, par exemple une séance de mise à jour par semaine. Si cela devient trop juste, on pourra passer à un hébergement sans cette limite (GitHub Pages ou Cloudflare Pages).

---

## Pour aller plus loin (facultatif, pour une personne à l'aise avec l'informatique)

- **Couleurs et polices** : les variables se trouvent en haut de `src/assets/css/style.css` (`--lagon`, `--flamboyant`, `--sable`…).
- **Travailler en local** : installez Node.js 22, puis lancez `npm install` et `npm start`. Le site s'ouvre sur http://localhost:8080.
- **Tester l'admin en local** : décommentez `local_backend: true` dans `src/admin/config.yml`, lancez `npx decap-server` dans un autre terminal, puis ouvrez http://localhost:8080/admin/.
- **Outils utilisés** : [Eleventy](https://www.11ty.dev) (générateur de site) et [Decap CMS](https://decapcms.org) (interface d'administration).

### Où est quoi

```
src/
  _data/site.json          → infos clés
  _data/accueil.json       → contenus de la page d'accueil
  _data/partenaires.json   → partenaires et lycées
  actions/*.md             → une fiche par action
  actualites/*.md          → une fiche par actualité
  pages/*.md               → pages simples
  assets/img/uploads/      → photos ajoutées depuis l'admin
  admin/config.yml         → réglages de l'interface d'administration
```
