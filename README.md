# Test Your French Quiz

Un quiz interactif pour tester votre niveau de français, conçu comme une Progressive Web App (PWA).

## Description

Test Your French Quiz est une application web interactive permettant aux utilisateurs d'évaluer leurs connaissances en français à travers un quiz de 10 questions. L'application est conçue comme une PWA, ce qui signifie qu'elle peut être installée sur un appareil mobile ou un ordinateur et fonctionner hors ligne.

## Fonctionnalités

- Quiz interactif de 10 questions pour tester les connaissances de base en français
- Interface responsive adaptée à tous les appareils (mobile, tablette, desktop)
- Support audio pour certaines questions
- Feedback immédiat après chaque réponse avec explications
- Calcul automatique du score et évaluation du niveau selon le CECRL (A1, A2, etc.)
- Certificat de niveau généré à la fin du quiz
- Mode sombre automatique (selon les préférences système)
- Fonctionnalité de partage des résultats
- Installation possible sur l'appareil (PWA)
- Fonctionnement hors-ligne

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS, animations, mode sombre, media queries)
- JavaScript (Vanilla JS)
- Service Workers pour le fonctionnement hors-ligne
- Web App Manifest pour l'installation sur l'appareil

## Installation

Aucune installation n'est requise pour utiliser l'application en ligne. Pour l'installer sur votre appareil :

1. Visitez l'application dans votre navigateur
2. Sur mobile : appuyez sur "Ajouter à l'écran d'accueil" dans le menu du navigateur
3. Sur desktop : recherchez l'icône d'installation dans la barre d'adresse ou utilisez le bouton d'installation qui apparaît dans l'application

## Structure du projet

- `index.html` - Structure principale de l'application
- `style.css` - Styles et mise en page
- `sw.js` - Service Worker pour le fonctionnement hors-ligne
- `manifest.json` - Manifest pour l'installation PWA
- `/audio` - Fichiers audio pour les questions d'écoute
- `/icons` - Icônes de l'application pour différentes tailles d'écran

## Auteur

Carole Stromboni - 2025

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## Remerciements

README créé avec l'assistance de Claude AI.
