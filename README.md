# Movie Watchlist — Corrections du cours Vue.js

Ce dépôt contient les corrections du cours Vue.js, organisées en branches Git progressives. Chaque chapitre correspond à une branche qui s'appuie sur la précédente.

## Structure des branches

| Branche | Chapitre | Contenu |
|---|---|---|
| `main` | — | Scaffold Vite + Vue initial |
| `03-bases` | Bases | Réactivité, directives, cycle de vie |
| `04-composants` | Composants | Props, emits, slots, TypeScript |
| `05-design-system` | Design System | Naive UI |
| `06-routing` | Routing | Vue Router, navigation guards |
| `07-api` | Appels API | fetch natif, variables d'environnement |
| `08-composables` | Composables | Pattern useX, useMovies |
| `09-store` | Store Pinia | useAuthStore, storeToRefs |
| `10-socket` | Temps réel | Socket.io, useNotificationsStore |

Il est conseillé de suivre les chapitres dans l'ordre.

## Installation

```sh
git clone https://github.com/vfourny/vuejs-courses.git
cd vuejs-courses
npm install
```

## Commandes

```sh
npm run dev      # Démarrer le serveur de développement (http://localhost:5173)
npm run build    # Compiler pour la production
npm run preview  # Prévisualiser la build
```

## Variables d'environnement

Copier `.env.example` en `.env` et renseigner les valeurs :

```sh
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001  # À partir du chapitre 10
```

## Technologies

- **Vue 3** — Framework frontend progressif
- **TypeScript** — Typage statique
- **Vite** — Build tool ultra-rapide
- **Naive UI** — Design system (ch5+)
- **Vue Router** — Navigation SPA (ch6+)
- **Pinia** — Gestion d'état global (ch9+)
- **Socket.io** — Temps réel (ch10+)
