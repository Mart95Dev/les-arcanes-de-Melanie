# Les Arcanes de Melanie

Site vitrine et e-commerce pour une tarologue independante. Tirages de Tarot personnalises avec reservation en ligne, paiement securise et dashboard d'administration.

## Stack technique

- **Frontend** : HTML5 + CSS3 + JavaScript Vanilla (ES6+)
- **Paiement** : Stripe Checkout + PayPal Smart Buttons (a integrer)
- **Calendrier** : Cal.com (placeholder, a connecter)
- **Hebergement** : Netlify / Vercel (site statique)

## Pages du site

| Page | Fichier | Description |
|------|---------|-------------|
| Accueil | `index.html` | Hero, apercu prestations, temoignages, newsletter |
| Prestations | `prestations.html` | Catalogue des 4 tirages avec prix, FAQ |
| Mon Histoire | `mon-histoire.html` | Parcours, timeline, philosophie, valeurs |
| Reservation | `reservation.html` | Parcours 4 etapes : Prestation > Date > Infos > Paiement |
| Contact | `contact.html` | Formulaire, coordonnees, horaires |
| CGV | `cgv.html` | Conditions Generales de Vente |
| Mentions Legales | `mentions-legales.html` | Mentions obligatoires |
| Politique Confidentialite | `politique-confidentialite.html` | RGPD |
| Politique Annulation | `politique-annulation.html` | Grille remboursement + formulaire retractation |
| Dashboard Admin | `dashboard.html` | KPIs, gestion RDV, remboursements, clients, emails |
| Login Admin | `login.html` | Authentification SHA-256 pour le dashboard |

## Prestations

| Tirage | Duree | Prix | Format |
|--------|-------|------|--------|
| Flash | 15 min | 25 EUR | Visio |
| Guidance | 30 min | 45 EUR | Visio |
| Approfondi | 60 min | 75 EUR | Visio + compte-rendu |
| Ecrit | 48h | 55 EUR | Email |

## Architecture CSS (Mobile First)

```
css/
  variables.css    # Design tokens (couleurs, fonts, espacements)
  base.css         # Reset, header, footer, nav, bottom-nav, animations
  components.css   # Boutons, cards, forms, accordion, badges, stepper
  pages.css        # Styles specifiques par page
  dashboard.css    # Styles du dashboard admin
  rgpd.css         # Banniere cookies
```

### Breakpoints
- **Mobile** (base) : < 768px — 1 colonne, hamburger, bottom-nav
- **Tablette** : >= 768px — 2 colonnes, nav desktop, bottom-nav masquee
- **Desktop** : >= 1024px — 3 colonnes, max-width 1200px

## Dashboard Admin

Le dashboard est protege par une page de connexion (`login.html`).
Les identifiants sont dans le fichier `.credentials` (non commite, voir `.gitignore`).

### Modules
- **Tableau de bord** : KPIs (CA, RDV, clients, note), graphique CA, repartition prestations
- **Rendez-vous** : Liste avec badges statut (Confirme, En attente, Annule, Rembourse)
- **Remboursements** : Grille automatique (>48h = 100%, 24-48h = 50%, <24h = 0%)
- **Clients** : Fiches, historique seances, total depense
- **Emails** : Templates (confirmation, rappel, remboursement, newsletter)
- **Reseaux sociaux** : Templates posts Instagram, Facebook, TikTok

### Securite
- Authentification par hash SHA-256 (Web Crypto API)
- Session via `sessionStorage` avec expiration auto 8h
- Redirect automatique vers login si non authentifie

## Charte graphique

| Element | Valeur |
|---------|--------|
| Fond principal | `#1A1A2E` (bleu nuit) |
| Or | `#D4A017` |
| Violet | `#6C3483` |
| Texte | `#FFF8E7` (creme) |
| Titres | Playfair Display |
| Corps | Cormorant Garamond |
| UI/Boutons | Montserrat |
| Icones | Phosphor Icons |

## Conformite legale

- RGPD : banniere cookies avec consentement granulaire
- CGV conformes au droit francais de la consommation
- Politique d'annulation avec formulaire de retractation (art. L221-18, L221-28)
- Checkbox CGV obligatoire avant paiement
- Mentions legales completes

## Developpement local

```bash
# Cloner le repo
git clone https://github.com/Mart95Dev/les-arcanes-de-Melanie.git
cd les-arcanes-de-Melanie

# Ouvrir dans le navigateur
open index.html
```

Aucune dependance ni build necessaire — c'est du HTML/CSS/JS pur.
