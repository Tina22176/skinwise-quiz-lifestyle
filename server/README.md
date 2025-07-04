# Backend Proxy Server

Ce serveur proxy permet de contourner les problèmes CORS et d'ajouter des contacts à la liste Klaviyo.

## Configuration

Créez un fichier `.env` dans le dossier `server/` avec les variables suivantes :

```env
# Configuration Klaviyo
KLAVIYO_PRIVATE_KEY=your_klaviyo_private_key_here
KLAVIYO_LIST_ID=your_klaviyo_list_id_here

# Configuration du serveur
PORT=4000
```

## Variables d'environnement

- `KLAVIYO_PRIVATE_KEY` : Votre clé API privée Klaviyo (commence par `pk_`)
- `KLAVIYO_LIST_ID` : L'ID de votre liste Klaviyo où ajouter les contacts
- `PORT` : Port du serveur (défaut: 4000)

## Endpoints

### POST /api/klaviyo-track
Endpoint de tracking Klaviyo (existant)

### POST /api/klaviyo-subscribe
Nouvel endpoint pour ajouter des contacts à la liste Klaviyo

**Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "skinType": "normal"
}
```

## Démarrage

```bash
npm install
npm start
```

Le serveur sera accessible sur `http://localhost:4000` 