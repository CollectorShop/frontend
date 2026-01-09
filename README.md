# 🚀 Frontend Collector - Startup MVP
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Vue 3 + Vite + Bootstrap 5 + Pinia** - Application frontend pour collectorshop startup avec DevSecOps SonarCloud.


## 📋 Développement testé sur windows
| Outil | Version |
|-------|---------|
| **Node.js** | `24.12.0` |
| **npm** | `11.6.2` |
| **IDE** | VS Code |

## 🚀 Démarrage rapide (Windows + Node 24 recommandé)

### Installation du projet
```bash
# Clone + installation (Node >=24.12.0 requis)
git clone https://github.com/CollectorShop/frontend.git
cd frontend
npm install
```

### Développement (Hot-Reload)
```bash
npm run dev
# → http://localhost:5173
```

### Production
```bash
npm run build
```

### Tests unitaires ([Vitest](https://vitest.dev/))
```bash
npm run test:unit
```

### Lint ([ESLint](https://eslint.org/))
```bash
npm run lint
```

### Prévisualisation build
```bash
npm run preview
```

### Formatage (Prettier)
```bash
npm run format
```

## Commandes utiles
### Lister les paquets npm globaux
```bash
npm list -g --depth=0 
```

## 🔧 Configuration IDE recommandée
[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 🌐 Configuration navigateur recommandée

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 🔤 Support TypeScript pour les imports `.vue`

TypeScript ne gère pas nativement les types des fichiers `.vue` . Nous utilisons `vue-tsc` pour le typage et [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)  dans l'éditeur.

## ⚙️ Configuration personnalisée

Consultez la [réference Vite](https://vite.dev/config/).
