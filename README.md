# Weather App

## Structure du Projet

Le projet est divisé en deux parties : le backend (API) et le frontend (interface utilisateur).

### Backend (Dossier `back`)

Le backend est construit avec Node.js et Express. Il sert d'API pour fournir des données météorologiques à l'interface utilisateur. Assurez-vous de suivre les étapes ci-dessous pour configurer l'environnement.

#### Configuration de l'Environnement

Créez un fichier `.env` dans le dossier `back` et ajoutez les clés nécessaires :

```env
METEO_API_KEY=VOTRE_CLE_API_METEO
```

#### Installation et Exécution

```bash
cd back
npm install
npm run start
```
L'API sera accessible à l'adresse http://localhost:3000

### Frontend (Dossier front)

Le frontend est construit avec React et TypeScript en utilisant Vite pour initialiser le projet et principalement Chakra UI pour la mise en forme.

#### Installation et Exécution

```bash
cd front
npm install
npm run dev
```

L'interface utilisateur sera accessible à l'adresse http://localhost:5173

### Configuration de l'API Météo

Assurez-vous de configurer la clé d'API pour l'accès à l'API météo. Vous pouvez obtenir une clé API sur https://meteo-concept.com

### Développement

Pendant le développement, veuillez exécuter le backend et le frontend simultanément.

#### Backend

```bash
cd back
npm run start
```

#### Frontend

```bash
cd front
npm run start
```

### Notes Supplémentaires

Assurez-vous que les ports par défaut (3000 pour le backend et 5173 pour le frontend) ne sont pas utilisés par d'autres applications sur votre machine.

Assurez-vous d'avoir une connexion Internet active pour accéder à l'API météo.
