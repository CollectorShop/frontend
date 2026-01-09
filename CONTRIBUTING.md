# 🤝 Comment contribuer

## Workflow

1. **Fork** le projet
2. **Cloner** votre fork en local
3. Créer une branche de travail :
   ```bash
   git checkout -b feat/front/nom-ticket
   ```
4. Développer : code → tests → lint
5. Commit :
   ```bash
   git commit -m "feat: description courte"
   ```
6. Push :
   ```bash
   git push origin feat/front/nom-ticket
   ```
7. Ouvrir une Pull Request vers main (ou develop si présent)


## 🛠️ Standards de développement

### Outils obligatoires
| Outil | Rôle | script |
|-------|------|----------|
| ESLint 9 | Lint + auto-fix | `lint` |
| Prettier 3 | Formatage | `format` |
| TypeScript | Typage | `type-check` |
| Vitest 4 | Tests | `test:unit` |

### Checklist PR
- [ ] Lint + auto-fix
    ```bash
    npm run lint
    ```
- [ ] Formatage
    ```bash
    npm run format
    ```
- [ ] Typage
    ```bash
    npm run type-check
    ```
- [ ] Tests
    ```bash
    npm run test:unit
    ```
- [ ] Documentation mise à jour
- [ ] SonarCloud Quality Gate

## 📚 Architecture technique

### Structure des dossiers
```text
src/
├── components/ # Composants réutilisables
├── views/ # Pages Vue Router
├── stores/ # Pinia stores (state)
├── router/ # Configuration routes
├── types/ # Interfaces TypeScript
├── utils/ # Utilitaires
└── composables/ # Composables Vue 3
```


### Stack technique
- **Frontend** : Vue 3.5 + TypeScript + Vite 7
- **UI** : Bootstrap 5.3 (responsive)
- **State** : Pinia (store)
- **Routing** : Vue Router 4
- **PWA** : Vite PWA Plugin


## Nomenclature

### Nommage des branches
| Commande git (depuis main ou develop)   | Description                              |
| --------------------------------------- | ---------------------------------------- |
| git checkout -b feat/front/nom_ticket   | Nouvelle fonctionnalité frontend         |
| git checkout -b fix/front/nom_ticket    | Correction de bug frontend               |
| git checkout -b chore/devops/nom_ticket | Tâches DevOps (CI, SonarCloud, scripts…) |

### Convention de style de codage
[**Règles et conventions de vue 3**](https://vue3-fr.netlify.app/style-guide/)  

### [Commits](https://arunkumarvallal.medium.com/become-a-pro-at-commit-messages-using-commitlint-56dab86333b3)

![](https://miro.medium.com/v2/resize:fit:750/format:webp/1*naLIcn5hr9OiBwmopSLucQ.png)


## 📝 Convention de messages de commit

Format recommandé :

```text
type(scope): message court à l’infinitif
```

Exemples :

```text
feat(home): ajouter la page d accueil
fix(auth): corriger la redirection après login
docs(readme): documenter le setup Windows
chore(ci): activer le workflow SonarCloud
```

### Types disponibles

| **Type** | **Description** |
|---|---|
| `build` | Changements qui affectent le système de build ou les dépendances externes (exemples : gulp, broccoli, npm) |
| `ci` | Changements apportés aux fichiers et scripts de configuration CI (exemples | Travis, Circle, BrowserStack, SauceLabs) |
| `chore` | Changements qui ne modifient pas le code source ou les tests, par exemple des modifications du processus de build, des outils auxiliaires et des bibliothèques |
| `docs` | Modifications de la documentation uniquement |
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction d'un bug |
| `perf` | Changement de code qui améliore les performances |
| `refactor` | Changement de code qui ne corrige pas un bug et n'ajoute pas de fonctionnalité |
| `revert` | Annulation d'un changement précédent |
| `style` | Changements qui n'affectent pas la signification du code (espaces, formatage, points-virgules manquants, etc.) |
| `test` | Ajout de tests manquants ou correction de tests existants |
