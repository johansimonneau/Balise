# Balise

Site vitrine de Balise — service de création de sites internet par IA pour petites entreprises. Construit avec [Astro](https://astro.build) + Tailwind CSS 4, pensé pour le SEO classique et le GEO (référencement dans les réponses des IA génératives).

## Développement local

```bash
npm install
npm run dev
```

Le site est disponible sur `http://localhost:4321`.

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement (GitHub Pages)

Le déploiement est automatique via `.github/workflows/deploy.yml` à chaque push sur `main` :

1. Dans les paramètres du dépôt GitHub → **Settings → Pages**, choisir la source **GitHub Actions**.
2. Pousser sur `main` : le workflow build le site et le publie automatiquement.
3. **Important** : la branche par défaut du dépôt doit être `main` (Settings → General → Default branch), sinon l'environnement `github-pages` refuse le déploiement (échec instantané du job `deploy`, sans logs).
4. Le site est actuellement accessible sur **https://johansimonneau.github.io/Balise/** (pas encore de domaine personnalisé).

### Pourquoi `base: '/Balise'` dans `astro.config.mjs`

Tant qu'aucun domaine personnalisé n'est branché, GitHub Pages sert le site dans un sous-dossier portant le nom du dépôt (`/Balise/`), pas à la racine. `astro.config.mjs` déclare donc `site: 'https://johansimonneau.github.io'` et `base: '/Balise'`, et tous les liens internes du code utilisent `import.meta.env.BASE_URL` pour rester corrects quel que soit l'environnement (local, preview, production).

### Nom de domaine personnalisé

Le jour où un domaine (ex. `balise-web.fr`) est acheté et branché :

1. Achetez le domaine chez un registrar (OVH, Gandi, Namecheap...).
2. Ajoutez un fichier `public/CNAME` contenant uniquement votre domaine, ex. `balise-web.fr`.
3. Configurez chez votre registrar un enregistrement `ALIAS`/`ANAME` (ou 4 enregistrements `A` vers les IP GitHub Pages : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) et un `CNAME` `www` vers `johansimonneau.github.io`.
4. Dans **Settings → Pages**, renseignez le domaine personnalisé et activez "Enforce HTTPS".
5. Dans `astro.config.mjs` : remettez `site` sur le nouveau domaine (ex. `https://balise-web.fr`) et **supprimez la ligne `base`** (ou mettez-la à `'/'`) — un domaine personnalisé sert le site à la racine, plus besoin de sous-dossier.

## À personnaliser avant mise en ligne commerciale

- **`src/pages/mentions-legales.astro`** et **`src/pages/cgv.astro`** : remplacer les champs `[À COMPLÉTER]` (statut juridique, SIRET, adresse, registrar du nom de domaine). Une relecture par un professionnel du droit est recommandée pour les CGV.
- **`src/pages/contact.astro`** : le formulaire envoie déjà les demandes par e-mail à `johansimonneau.pro@gmail.com` via [FormSubmit](https://formsubmit.co) — aucun compte à créer, aucun nom de domaine requis. À la toute première soumission, FormSubmit envoie un e-mail d'activation à cette adresse : il faut cliquer une fois sur le lien de confirmation pour que les envois suivants partent automatiquement.
- **`public/og-balise.svg`** : image de partage réseaux sociaux actuellement en SVG. Pour une compatibilité maximale (Facebook, LinkedIn), exportez une version PNG 1200x630 (par exemple via Canva) et remplacez la référence dans `src/components/SEO.astro`.
- **`src/pages/realisations.astro`** : contient des exemples de structure de site, clairement labellisés comme tels. À remplacer progressivement par de vrais projets clients, avec leur accord.
- **`astro.config.mjs`** : `site` + `base` reflètent l'adresse temporaire `https://johansimonneau.github.io/Balise/` — à ajuster (voir section "Nom de domaine personnalisé" ci-dessus) une fois un domaine acheté.

## Structure du contenu

- `src/pages/` — toutes les pages du site (offre, tarifs, process, légal, landing pages métiers...)
- `src/content/blog/` — les 10 articles de blog en Markdown (collection de contenu Astro)
- `src/components/` — composants réutilisables (Header, Footer, PricingCard, FAQAccordion, NicheLanding...)
- `src/layouts/BaseLayout.astro` — layout global avec gestion SEO (meta, Open Graph, JSON-LD)

## SEO / GEO

- Sitemap généré automatiquement via `@astrojs/sitemap` (`/sitemap-index.xml`).
- `public/robots.txt` référence le sitemap.
- `public/llms.txt` résume l'activité du site à destination des agents IA (pratique émergente de GEO).
- Données structurées JSON-LD (Organization, Service, FAQPage, Article) injectées page par page via le composant `SEO.astro`.
