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
3. Le site est accessible sur `https://<votre-compte>.github.io/<nom-du-repo>/` par défaut.

### Nom de domaine personnalisé

Pour utiliser un domaine comme `balise-web.fr` :

1. Achetez le domaine chez un registrar (OVH, Gandi, Namecheap...).
2. Ajoutez un fichier `public/CNAME` contenant uniquement votre domaine, ex. `balise-web.fr`.
3. Configurez chez votre registrar un enregistrement `ALIAS`/`ANAME` (ou 4 enregistrements `A` vers les IP GitHub Pages : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) et un `CNAME` `www` vers `<votre-compte>.github.io`.
4. Dans **Settings → Pages**, renseignez le domaine personnalisé et activez "Enforce HTTPS".
5. Mettez à jour `site` dans `astro.config.mjs` avec votre domaine final (utilisé pour le sitemap et les URLs canoniques).

## À personnaliser avant mise en ligne commerciale

- **`src/pages/mentions-legales.astro`** et **`src/pages/cgv.astro`** : remplacer les champs `[À COMPLÉTER]` (statut juridique, SIRET, adresse, registrar du nom de domaine). Une relecture par un professionnel du droit est recommandée pour les CGV.
- **`src/pages/contact.astro`** : le formulaire envoie déjà les demandes par e-mail à `johansimonneau.pro@gmail.com` via [FormSubmit](https://formsubmit.co) — aucun compte à créer, aucun nom de domaine requis. À la toute première soumission, FormSubmit envoie un e-mail d'activation à cette adresse : il faut cliquer une fois sur le lien de confirmation pour que les envois suivants partent automatiquement.
- **`public/og-balise.svg`** : image de partage réseaux sociaux actuellement en SVG. Pour une compatibilité maximale (Facebook, LinkedIn), exportez une version PNG 1200x630 (par exemple via Canva) et remplacez la référence dans `src/components/SEO.astro`.
- **`src/pages/realisations.astro`** : contient des exemples de structure de site, clairement labellisés comme tels. À remplacer progressivement par de vrais projets clients, avec leur accord.
- **`astro.config.mjs`** : le champ `site` est réglé sur `https://balise-web.fr` à titre d'exemple — à ajuster selon le domaine réellement acheté.

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
