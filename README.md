# AdaSkills

<p align="center">
  <strong>Application web de gestion de competences par categorie</strong><br>
  Ajouter, afficher et supprimer des competences avec un niveau de maitrise.
</p>

<p align="center">
  <a href="https://skills-patphiletas.vercel.app/">Voir la demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-E86A33?style=for-the-badge" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-1F6E8C?style=for-the-badge" alt="Backend">
  <img src="https://img.shields.io/badge/Database-PostgreSQL%20%7C%20Neon-2E8B57?style=for-the-badge" alt="Database">
  <img src="https://img.shields.io/badge/Deploy-Vercel%20%7C%20Render-111111?style=for-the-badge" alt="Deploy">
</p>

## Presentation

AdaSkills est un petit projet full-stack concu pour presenter des competences sous forme de categories claires et interactives. L'utilisateur peut ajouter une competence, definir son niveau de 0 a 100, puis la supprimer a tout moment depuis une interface simple et responsive.

L'application s'articule autour de trois univers :

- Backend
- Frontend
- Graphisme

## Demo

Application en ligne : [https://skills-patphiletas.vercel.app/](https://skills-patphiletas.vercel.app/)

## Fonctionnalites

- affichage dynamique des competences depuis l'API
- classement par categories
- ajout d'une competence avec un curseur de niveau
- suppression instantanee d'une competence
- gestion des messages de succes et d'erreur
- interface responsive et legere

## Stack Technique

- Frontend : HTML, CSS, JavaScript vanilla
- Backend : Node.js, Express
- Base de donnees : PostgreSQL
- Hebergement base de donnees : Neon
- Deploiement frontend : Vercel
- Deploiement backend : Render

## Architecture

```text
AdaSkills/
├── front/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── back/
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── test-pg.js
└── README.md
```

## API

Endpoints principaux :

- `GET /themes` : retourne les themes avec leurs competences associees
- `POST /skills` : ajoute une nouvelle competence
- `DELETE /skills/:id` : supprime une competence
- `GET /testdb` : verifie la connexion a la base PostgreSQL

## Installation Locale

### 1. Cloner le depot

```bash
git clone https://github.com/<ton-compte>/<ton-repo>.git
cd AdaSkills
```

### 2. Installer les dependances

```bash
cd back
npm install
```

### 3. Configurer l'environnement

Creer un fichier `back/.env` :

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

### 4. Lancer le serveur

```bash
cd back
node server.js
```

Le backend sera disponible sur `http://localhost:3000`.

### 5. Ouvrir le frontend

Ouvrir le fichier `front/index.html` dans le navigateur.

Le frontend detecte automatiquement :

- `http://localhost:3000` en local
- l'API de production Render une fois deploye

## Deploiement

- Frontend : [Vercel](https://skills-patphiletas.vercel.app/)
- Backend : API hebergee sur Render
- Database : Neon PostgreSQL

## Objectif Du Projet

Ce projet met en avant une base full-stack simple mais propre :

- consommation d'une API REST
- manipulation du DOM en JavaScript
- connexion a une base PostgreSQL
- separation front / back
- deploiement d'une application web complete

## Auteur

Patrice Philetas
