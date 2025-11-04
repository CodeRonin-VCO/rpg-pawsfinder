[en développement]

# Mini RPG : PawsFinder

## 🐉 RPG narratif et combat animé

PawsFinder est un mini-RPG en React qui mêle narration interactive, énigmes à choix multiples et combats animés dans un univers décalé peuplé de cochons belliqueux, de potions douteuses et de répliques bien senties.

Vous incarnez un avatar personnalisé, confronté à des ennemis hauts en couleur. Chaque interaction — qu’il s’agisse d’un duel, d’un dialogue ou d’une énigme — est orchestrée par un pipeline d’événements qui gère la logique de jeu, les animations et les dialogues de manière fluide et modulaire.

## ⚔️ Fonctionnalités clés

    - 🎯 Pipeline de combat modulaire Attaques, contre-attaques, soins, esquives, coups critiques, effets visuels et dialogues sont gérés étape par étape via un moteur de combat extensible.

    - 🧠 IA configurable par profil Chaque ennemi suit un profil d’IA (boss, minion…) avec des priorités d’action, des seuils de soin, et des attaques spéciales limitées.

    - 🧪 Narration interactive & énigmes Le joueur progresse à travers des scènes scénarisées avec choix multiples, dialogues dynamiques et énigmes intégrées.

    - 💬 Système de dialogues contextuels Chaque ennemi dispose de répliques personnalisées selon l’action (attaque, esquive, blessure, mort), injectées dynamiquement dans le pipeline.

    - 🎨 Animations CSS synchronisées Les attaques, sorts et transitions de combat déclenchent des animations CSS fluides, synchronisées avec les événements du pipeline.

    - 🧩 Architecture modulaire & scalable

        - Composants React réutilisables

        - Données des ennemis en JSON

        - Séparation claire entre logique, interface et données

        - Gestion d’état atomique avec Jotai pour un contrôle précis du joueur, des ennemis et de l’interface

## 🛠️ Technologies utilisées

    - React (Vite)

    - Jotai pour la gestion d’état

    - CSS Modules pour les animations

    - JavaScript ES6+ structuré en pipelines et steps

    - JSON pour la configuration des ennemis et des dialogues

## 📁 Structure du projet
```
src/
├── components/         # Composants UI (Avatar, Combat, Dialogue, etc.)
├── engine/             # Moteur de combat (pipelines, steps, AI)
├── data/               # Données JSON des ennemis, dialogues, énigmes
├── hooks/              # Hooks personnalisés
├── styles/             # Animations CSS
└── App.jsx             # Point d’entrée principal
```