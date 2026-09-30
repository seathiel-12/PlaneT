# PlaneT

PlaneT est une application de démonstration frontend de réservation de vols, construite avec React, TypeScript et Vite. Elle présente un parcours de recherche, de saisie des voyageurs, de paiement simulé et de consultation des réservations sauvegardées dans le navigateur.

> **Périmètre de démonstration :** l’authentification, les comptes, les réservations et le paiement ne sont pas sécurisés par un serveur. Les données sont stockées dans le navigateur et peuvent être modifiées par son utilisateur. Ne saisissez pas de véritables informations de paiement ou de passeport.

## Prérequis

- Node.js compatible avec Vite 7 et npm.
- Un navigateur récent.

## Installation et démarrage

```sh
npm install
npm run dev
```

Pour disposer des résultats de vols de démonstration, lancer aussi le serveur JSON dans un second terminal :

```sh
npm run serve
```

Le serveur JSON écoute sur `http://localhost:3000` et lit `public/db.json`. En développement, l’application utilise cette URL par défaut; une URL alternative peut être fournie avec `VITE_APP_BASE_BACKEND_URL`. Vite copie le fichier dans le build sous `/db.json`.

## Production

Construire l’application pour un hébergement statique :

```sh
npm run build
```

Le build écrit l’application dans `dist/` sans démarrer de serveur. Vite copie `public/db.json` à la racine du build sous `/db.json`. En production, l’application charge ce fichier JSON statique et applique les filtres de vols dans le navigateur; l’hébergeur doit donc publier tout le contenu de `dist/`.
## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Démarre Vite en mode développement. |
| `npm run serve` | Démarre l’API JSON locale sur le port 3000. |
| `npm run build` | Vérifie les types TypeScript et construit les fichiers de production sans démarrer de serveur. |
| `npm run preview` | Sert localement le dernier build. |
| `npm run lint` | Exécute ESLint sur le dépôt. |

## Fonctionnalités

- Pages d’accueil, destinations, présentation et contact.
- Recherche et affichage des vols de démonstration.
- Parcours de réservation à plusieurs étapes, formulaires validés par Zod et état de réservation géré par Zustand.
- Interface en français et en anglais, avec choix mémorisé dans `localStorage`.
- Comptes locaux de démonstration : création de compte, vérification des identifiants, identifiant unique par compte, session et déconnexion.
- Réservations conservées dans `localStorage`, rattachées à l’identifiant du compte et affichées sur « My bookings ».
- Téléchargement du récapitulatif de billet au format TXT, CSV ou JSON.
- Envoi facultatif d’un e-mail de confirmation via EmailJS après configuration (voir [EMAIL_SETUP.md](docs/EMAIL_SETUP.md)).

## Routes

| URL | Page |
| --- | --- |
| `/` et `/home` | Accueil |
| `/about` | À propos |
| `/contact` | Contact |
| `/destinations` | Résultats/destinations |
| `/book-flight` | Réservation |
| `/book-flight/booked` | Confirmation |
| `/sign-in` | Connexion locale |
| `/create-account` | Création de compte locale |
| `/my-bookings` | Réservations sauvegardées (session requise) |

## Organisation du code

```text
src/
├── Components/
│   ├── Features/       # Recherche, authentification locale et réservation
│   ├── Layout/         # Habillages des pages
│   ├── Pages/          # Écrans associés aux routes
│   └── Presentation/   # Sections de présentation réutilisées
├── contexts/           # Session et langue
├── locales/            # Dictionnaires français et anglais
├── Utils/
│   ├── Components/     # Composants génériques d’interface
│   └── Functions/      # API, formats, cache, exports, mailer et références
├── mocks/              # Données statiques de démonstration
└── types.ts            # Modèles partagés
```

`src/Components/router.ts` déclare les routes. `src/main.tsx` monte les fournisseurs globaux. `src/Components/Features/BookFlight/store.ts` contient l’état du parcours de réservation. `public/db.json` est la source de données de l’API locale.

## Configuration locale

Créer un fichier `.env.local` à la racine pour remplacer les valeurs par défaut. Les variables préfixées `VITE_` sont incorporées au code client : elles doivent donc être considérées comme publiques.

```dotenv
VITE_APP_BASE_BACKEND_URL=http://localhost:3000
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Les variables `VITE_EMAILJS_*` servent uniquement aux envois directs en développement. En production, la fonction Node Vercel lit les variables `EMAILJS_*` côté serveur; elles ne sont pas intégrées au bundle du frontend. Consulte [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md) pour configurer le service, son modèle et chaque environnement.

## Limites connues

- L’authentification est une simulation strictement locale. Le mot de passe est salé et haché avec Web Crypto avant stockage, mais le stockage client et la session simulée ne remplacent pas un fournisseur d’identité ni une session serveur.
- Le paiement ne contacte aucun prestataire : la confirmation est une simulation d’interface.
- Les réservations sont enregistrées dans le `localStorage` du navigateur associé au compte. Elles ne sont ni partagées entre appareils ni sauvegardées côté serveur.
- Si une écriture de session ou de réservation échoue faute d’espace, PlaneT demande confirmation avant de supprimer le cache de réservations, de fermer la session et de rediriger vers la connexion. Le registre des comptes locaux est conservé.
- Les confirmations par e-mail ne sont envoyées qu’après configuration volontaire d’EmailJS et d’un modèle compatible. Le forfait gratuit EmailJS affiche actuellement une limite de 200 requêtes par mois et deux modèles; consulter la [page tarifaire EmailJS](https://www.emailjs.com/pricing/) pour les conditions à jour.
- Les exports contiennent un récapitulatif de démonstration. Ils ne constituent pas un billet émis par une compagnie aérienne.

## Qualité du code

Les fonctions utilitaires exportées documentent leur contrat en JSDoc. Les formulaires de réservation et d’authentification utilisent React Hook Form et Zod; ESLint et TypeScript servent aux vérifications locales.
