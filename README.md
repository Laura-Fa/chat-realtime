# Projet de Chat utilisant NextJS, NestJS et OpenAI API

Ce projet est un chat en temps réel, construit avec NextJS et NestJS, et intégrant des fonctionnalités basées sur l'API d'OpenAI. Ce chat fait appel à l'API d'OpenAI pour différentes opérations comme la traduction de messages, la validation des informations et la suggestion de réponses.

## Installation

Dans les répertoires chat-api et chat-front, exécutez la commande
`npm install`

Pour exécuter le projet localement, créer un fichier .env à la racine de chat-api avec les informations suivantes :

```
OPENAI_API_KEY="your_api_key"
OPENAI_API_MODEL="openai_model"
```

Dans le répertoire chat-api, lancer la commande `nest start --watch` et dans chat-front, lancer la commande ` npm run dev`.

Ouvrez http://localhost:4000/chat dans votre navigateur pour voir le projet.
