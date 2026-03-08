# Plan d'Implémentation — Les Arcanes de Mélanie

## Site web de tirages de cartes de Tarot

> Basé sur le PRD v1.0 – Mars 2026

---

## Vue d'ensemble

Site vitrine + e-commerce pour tarologue indépendante. Stack : HTML5/CSS3/JS Vanilla, Stripe/PayPal, Calendly (V1), serverless functions.

---

## Phase 1 — Setup & Fondations (Semaine 1)

### 1.1 Structure du projet

```
les-arcanes-de-Melanie/
├── index.html
├── mon-histoire.html
├── prestations.html
├── reservation.html
├── contact.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   └── pages.css
├── js/
│   ├── main.js
│   ├── calendar.js
│   ├── cart.js
│   └── payment.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── functions/
│   └── create-checkout-session.js
├── sitemap.xml
├── robots.txt
└── mentions-legales.html
```

### 1.2 Tâches

| # | Tâche | Fichiers | Priorité |
|---|-------|----------|----------|
| 1.1 | Créer `variables.css` avec les design tokens (couleurs, typo, espacement, ombres, transitions) | `css/variables.css` | P0 |
| 1.2 | Créer `base.css` : reset CSS, styles globaux, header sticky responsive, footer, menu hamburger mobile | `css/base.css` | P0 |
| 1.3 | Créer `components.css` : boutons (primaire/secondaire), cards glassmorphism, inputs, accordions, animations | `css/components.css` | P0 |
| 1.4 | Créer `main.js` : toggle menu mobile, animations scroll (IntersectionObserver), smooth scroll | `js/main.js` | P0 |
| 1.5 | Configurer Google Fonts : Playfair Display, Cormorant Garamond, Montserrat (preload + font-display: swap) | Tous les HTML | P0 |
| 1.6 | Créer les favicon et assets de base (séparateurs SVG dorés, motifs célestes) | `assets/` | P1 |

### Critères de validation Phase 1
- [ ] Header/footer responsive fonctionnels
- [ ] Menu hamburger mobile animé
- [ ] Variables CSS appliquées correctement
- [ ] Polices chargées avec font-display: swap
- [ ] Lighthouse Performance > 90

---

## Phase 2 — Pages Vitrine (Semaines 2-3)

### 2.1 Page Accueil (`index.html`)

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 2.1.1 | Hero section plein écran | Fond sombre #1A1A2E, titre "Les Arcanes de Mélanie" en Playfair Display doré, sous-titre Cormorant Garamond crème, CTA "Réserver une séance" (bouton primaire doré), animation fade-in + slide-up | P0 |
| 2.1.2 | Section aperçu prestations | 3 cards glassmorphism (fond rgba semi-transparent, bordure dorée fine, backdrop-filter blur). Layout : 1 colonne mobile → 3 colonnes desktop. Chaque card : icône (lune/étoile/soleil), titre, description courte, prix, bouton "En savoir plus" | P0 |
| 2.1.3 | Section témoignages | Carousel horizontal avec autoplay + pause au hover. Swipe mobile (touch events). Bulle témoignage : guillemets dorés, nom, note étoiles | P2 |
| 2.1.4 | Section CTA final | Bandeau fond Violet #6C3483, texte d'accroche, bouton doré vers réservation | P0 |
| 2.1.5 | Particules étoilées (hero) | Canvas léger en fond avec effet étoiles | P2 |

### 2.2 Page Mon Histoire (`mon-histoire.html`)

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 2.2.1 | Hero portrait | Photo avec overlay gradient sombre, titre "Mon Histoire" superposé | P1 |
| 2.2.2 | Timeline parcours | Verticale (mobile) / alternée (desktop). Ligne dorée, points-étapes avec date + titre + paragraphe | P1 |
| 2.2.3 | Section philosophie | 2 colonnes desktop / 1 mobile. Citation Playfair Display italique, bordure gauche dorée | P1 |
| 2.2.4 | Section valeurs | 3 blocs icône + titre + texte (Bienveillance, Confidentialité, Authenticité) | P1 |

### 2.3 Page Contact (`contact.html`)

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 2.3.1 | Section coordonnées | Icônes dorées Phosphor Icons : téléphone (tel:), email (mailto:), réseaux sociaux | P0 |
| 2.3.2 | Formulaire contact | Champs : Prénom, Email, Sujet (select), Message (textarea). Bordure basse violet, focus or. Validation HTML5 + JS | P0 |
| 2.3.3 | Intégration Formspree/Netlify Forms | Envoi formulaire + message confirmation in-page | P0 |
| 2.3.4 | Section horaires | Tableau élégant des disponibilités | P0 |

### Critères de validation Phase 2
- [ ] 3 pages fonctionnelles et responsive (mobile/tablette/desktop)
- [ ] Animations scroll fade-in avec IntersectionObserver
- [ ] Formulaire contact fonctionnel
- [ ] Navigation entre pages fluide
- [ ] SEO : meta title/description uniques par page

---

## Phase 3 — Page Prestations (Semaine 4)

### 3.1 Page Prestations (`prestations.html`)

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 3.1.1 | Section introduction | Texte expliquant la démarche et les bénéfices d'un tirage | P0 |
| 3.1.2 | Cards catalogue | Cards détaillées par prestation : titre, durée, description, prix (Or gros), badge format (Visio/Écrit/Présentiel), CTA "Réserver cette prestation". Layout : 1 col mobile → 2 col tablette → 3 col desktop | P0 |
| 3.1.3 | Section FAQ | Accordion natif (details/summary HTML5). Questions fréquentes sur les tirages. Flèche à droite, animation d'ouverture | P0 |

### Prestations à implémenter

| Prestation | Durée | Prix | Format |
|-----------|-------|------|--------|
| Tirage Flash | 15 min | 25€ | Visio |
| Tirage Guidance | 30 min | 45€ | Visio |
| Tirage Approfondi | 60 min | 75€ | Visio |
| Tirage Écrit | 48h livraison | 55€ | Email |

### Critères de validation Phase 3
- [ ] Cards prestations avec tous les détails
- [ ] FAQ accordion fonctionnel
- [ ] CTA "Réserver" redirige vers réservation avec prestation pré-sélectionnée
- [ ] Schema.org Service markup

---

## Phase 4 — Réservation & Paiement (Semaines 5-7)

### 4.1 Page Réservation (`reservation.html`)

C'est la page la plus complexe. Parcours en 3 étapes avec stepper visuel.

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 4.1.1 | Stepper visuel | 3 étapes : Prestation → Date → Paiement. Étape active en or, complétées en vert | P0 |
| 4.1.2 | Étape 1 : choix prestation | Cards interactives avec sélection par clic. Card sélectionnée : bordure or pleine + check doré. Stockage sessionStorage | P0 |
| 4.1.3 | Étape 2 : calendrier | **V1 : Embed Calendly** (simple, rapide). V2 future : FullCalendar.js avec backend. Affichage créneaux disponibles, sélection date/heure, fuseau horaire auto | P0 |
| 4.1.4 | Étape 3 : récapitulatif + paiement | Récap complet (prestation + date/heure + prix). Formulaire client (Prénom, Nom, Email, Téléphone optionnel, Question textarea) | P0 |

### 4.2 Intégration Paiements

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 4.2.1 | Stripe Checkout | Serverless function (`functions/create-checkout-session.js`). Crée une Checkout Session. Redirection vers Stripe. Webhook pour confirmation | P0 |
| 4.2.2 | PayPal Smart Buttons | PayPal JS SDK côté client. Validation serveur via API PayPal Orders | P0 |
| 4.2.3 | Page confirmation | Après paiement réussi : récapitulatif, message de confirmation, email auto | P0 |
| 4.2.4 | `cart.js` | Gestion panier/session : stockage sessionStorage, récap, validation données client | P0 |
| 4.2.5 | `payment.js` | Orchestration paiement : choix méthode, appel serverless, gestion erreurs, redirection | P0 |

### 4.3 Emails automatiques

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 4.3.1 | Email confirmation client | Via SendGrid/Resend API. Template HTML avec récap réservation | P1 |
| 4.3.2 | Email notification praticienne | Alerte nouvelle réservation avec détails client + question | P1 |

### Critères de validation Phase 4
- [ ] Parcours 3 étapes fluide (Prestation → Date → Paiement)
- [ ] Paiement Stripe fonctionnel en mode sandbox
- [ ] Paiement PayPal fonctionnel en mode sandbox
- [ ] SessionStorage gère correctement le panier
- [ ] Emails de confirmation envoyés
- [ ] Gestion erreurs paiement (refus, timeout)

---

## Phase 5 — Tests, SEO & Lancement (Semaine 8)

### 5.1 Tests

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 5.1.1 | Tests responsive | iPhone SE, iPhone 14, iPad, Desktop (1440px). Vérifier tous les breakpoints | P0 |
| 5.1.2 | Tests cross-browser | Chrome, Safari, Firefox, Edge | P0 |
| 5.1.3 | Tests paiement sandbox | Cartes test Stripe, compte sandbox PayPal | P0 |
| 5.1.4 | Tests formulaires | Validation, soumission, messages erreur, accessibilité | P0 |

### 5.2 SEO & Performance

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 5.2.1 | Schema.org markup | LocalBusiness + Service sur chaque page | P0 |
| 5.2.2 | `sitemap.xml` + `robots.txt` | Génération et configuration | P0 |
| 5.2.3 | Open Graph meta tags | Pour partage réseaux sociaux (image, titre, description) | P1 |
| 5.2.4 | Optimisation images | WebP + fallback, lazy loading, srcset | P0 |
| 5.2.5 | Minification CSS/JS | Build de production | P0 |
| 5.2.6 | Lighthouse audit | Cible 90+ sur toutes métriques | P0 |

### 5.3 RGPD & Légal

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 5.3.1 | Mentions légales | Page dédiée avec infos légales obligatoires | P0 |
| 5.3.2 | Politique de confidentialité | Page dédiée | P0 |
| 5.3.3 | CGV | Conditions Générales de Vente (obligatoire pour vente en ligne) | P0 |
| 5.3.4 | Bannière cookies | Si analytics non exempté, consentement granulaire | P1 |

### 5.4 Déploiement

| # | Tâche | Détails | Priorité |
|---|-------|---------|----------|
| 5.4.1 | Configuration hébergement | Netlify ou Vercel (site statique + serverless functions) | P0 |
| 5.4.2 | HTTPS | Certificat SSL via hébergeur | P0 |
| 5.4.3 | Google Search Console | Configuration et soumission sitemap | P1 |
| 5.4.4 | Analytics | Plausible ou Matomo (RGPD-friendly) | P1 |

### Critères de validation Phase 5
- [ ] Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] Tests paiement sandbox OK (Stripe + PayPal)
- [ ] Emails de confirmation fonctionnels
- [ ] Responsive OK sur tous les devices cibles
- [ ] Mentions légales, CGV, politique de confidentialité en place
- [ ] HTTPS actif
- [ ] Analytics fonctionnel

---

## Spécifications Techniques Transversales

### Responsive Design (Mobile First)

| Breakpoint | Taille | Adaptations |
|-----------|--------|-------------|
| Mobile (base) | < 768px | 1 colonne, hamburger menu, touch-friendly 48px min, cards empilées |
| Tablette | 768-1024px | 2 colonnes, menu dépliant, grille 2x |
| Desktop | > 1024px | max-width 1200px centré, nav horizontale, 3 colonnes |

### Accessibilité (WCAG 2.1 AA)

- Contraste minimum 4.5:1 (Crème #FFF8E7 sur Noir #1A1A2E)
- Navigation clavier complète (focus visible, skip links)
- Alt text sur toutes les images
- Labels associés aux champs, messages d'erreur clairs, aria-live

### Charte Graphique — Rappel

| Élément | Valeur |
|---------|--------|
| Fond principal | #1A1A2E (Noir Mystique) |
| Violet Royal | #6C3483 |
| Violet Clair | #9B59B6 |
| Or Ancien | #D4A017 |
| Or Clair | #F5D76E |
| Crème | #FFF8E7 |
| Titres | Playfair Display |
| Corps | Cormorant Garamond |
| UI/Boutons | Montserrat |
| Icônes | Phosphor Icons (line-art, couleur Or) |

---

## Dépendances Externes

| Service | Usage | Phase |
|---------|-------|-------|
| Google Fonts | Typographies | Phase 1 |
| Phosphor Icons | Iconographie | Phase 1 |
| Formspree / Netlify Forms | Formulaire contact | Phase 2 |
| Calendly | Calendrier réservation (V1) | Phase 4 |
| Stripe | Paiement CB | Phase 4 |
| PayPal JS SDK | Paiement PayPal | Phase 4 |
| SendGrid / Resend | Emails transactionnels | Phase 4 |
| Plausible / Matomo | Analytics RGPD | Phase 5 |

---

## Ordre d'implémentation recommandé

```
Phase 1: variables.css → base.css → components.css → main.js → header/footer
    ↓
Phase 2: index.html → contact.html → mon-histoire.html
    ↓
Phase 3: prestations.html (cards + FAQ)
    ↓
Phase 4: reservation.html → cart.js → payment.js → serverless functions → emails
    ↓
Phase 5: tests → SEO → RGPD → déploiement
```

---

## Maquettes Stitch — Récupérées et Analysées

Les maquettes Google Stitch ont été **exportées** (screenshots PNG + code HTML) dans `assets/mockups/`.

| Écran | Fichiers | Dimensions |
|-------|----------|-----------|
| Accueil Desktop | `accueil-desktop.png` + `.html` | 2560x6030px |
| Accueil Mobile | `accueil-mobile.png` + `.html` | 780x7810px |
| Mon Histoire Mobile | `mon-histoire-mobile.png` + `.html` | 780x3714px |
| Prestations Mobile | `prestations-mobile.png` + `.html` | 780x4400px |
| Réservation Mobile | `reservation-mobile.png` + `.html` | 780x3548px |
| Contact Mobile | `contact-mobile.png` + `.html` | 780x2566px |
| Menu Mobile | `menu-mobile.png` + `.html` | 780x1768px |

### Observations clés des maquettes (écarts avec le PRD)

1. **Nom du site dans Stitch** : "L'Arcane Sacrée" / "Tarot Destiny" → A remplacer par **"Les Arcanes de Mélanie"**
2. **Couleur or Stitch** : `#d39e17` (proche du PRD `#D4A017`) → Utiliser `#D4A017` du PRD
3. **Fond Stitch** : `#211d11` (brun foncé) et `#1A1A2E` (bleu nuit) → Utiliser `#1A1A2E` du PRD
4. **Polices Stitch mobile** : Playfair Display + Cormorant Garamond + Montserrat (conforme PRD)
5. **Polices Stitch desktop** : Manrope uniquement → Aligner sur les polices PRD
6. **Icônes Stitch** : Material Symbols Outlined → Remplacer par Phosphor Icons (PRD)
7. **Navigation mobile Stitch** : Bottom nav bar fixe (Home/Tirages/Boutique/Profil) → A adapter selon PRD (pas de boutique/profil)
8. **Prestations Stitch** : Différentes du PRD
   - Stitch : Passé/Présent/Futur (45€), Harmonie Relationnelle (55-65€), Roue de l'Année (80-120€)
   - PRD : Tirage Flash (25€), Guidance (45€), Approfondi (75€), Écrit (55€)
   - → **A confirmer avec la cliente**

### Éléments de design à conserver des maquettes

- **Glass cards** : `background: rgba(108, 52, 131, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(211, 158, 23, 0.3)`
- **Stepper réservation** : 3 cercles avec icônes (style/calendar/payments), ligne de connexion, étape active remplie
- **Séparateurs mystiques** : `✩ ☽ ✩` entre sections
- **Menu mobile overlay** : Plein écran, liens centrés, réseaux sociaux en bas (Instagram, Pinterest, YouTube)
- **Section témoignages** : Guillemets dorés (`format_quote`), avatar rond, nom en uppercase tracking-widest
- **Cards prestations** : Image en haut (aspect 3/4), titre, description, prix + flèche, hover scale sur image
- **Page contact** : "Get in Touch" + icônes call/email cliquables + formulaire + "Sacred Hours"
- **Page Mon Histoire** : Timeline avec étapes datées + section philosophie avec citation + 3 valeurs (Intuition, Éthique, Clarté)
- **Page réservation** : Stepper → Cards sélection avec check doré → Calendrier mini + créneaux → Récap + PayPal/CB

### Ressources visuelles Stitch (URLs images hébergées)

Les images générées par Stitch sont disponibles aux URLs `lh3.googleusercontent.com/aida-public/...` dans les fichiers HTML exportés. Ces images sont **temporaires** et devront être remplacées par les vraies photos de la praticienne.

---

*Plan généré le 2026-03-08 — Basé sur PRD v1.0 + Maquettes Stitch exportées*
