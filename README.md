# Les Jardins de Marie

Site vitrine pour le maraicher bio "Les Jardins de Marie", situe pres de Lille. Le projet met en avant l'offre de legumes de saison, le savoir-faire artisanal et un parcours d'achat simple via un panier en ligne.

## Fonctionnalites principales
- Page d'accueil avec mise en avant des produits du moment et de l'histoire de la ferme.
- Pages dediees pour le savoir-faire, les differents produits et la prise de contact.
- Header partage charge dynamiquement pour garantir une navigation coherente.
- Panier client cote front (fichier `asset/js/cart.js`) pour suivre les produits selectionnes.

## Structure du projet
- `index.html` : page d'accueil du site.
- `html/` : pages internes (`savoir-faire`, `produits`, fiches produit, `contact`...).
- `html/header.html` : gabarit HTML injecte dans chaque page.
- `asset/css/styles.css` : feuille de style principale responsive.
- `asset/js/` : scripts pour le layout (`layout.js`) et la gestion du panier (`cart.js`).
- `asset/img/` : images optimisees (formats 480px/960px).

## Arborescence
```text
fil-rouge-EFFICOM/
├── asset
│   ├── css
│   │   └── styles.css
│   ├── img
│   │   ├── Basilic-Frais-480.jpg
│   │   ├── Basilic-Frais-960.jpg
│   │   ├── Basilic-Frais.webp
│   │   ├── betteraves-rouge-480.jpg
│   │   ├── betteraves-rouge-960.jpg
│   │   ├── betteraves-rouge.webp
│   │   ├── bio-3-480.jpg
│   │   ├── bio-3-960.jpg
│   │   ├── bio-3.webp
│   │   ├── bio-4-480.jpg
│   │   ├── bio-4-960.jpg
│   │   ├── bio-4.webp
│   │   ├── carottes-multicolores-480.jpg
│   │   ├── carottes-multicolores-960.jpg
│   │   ├── carottes-multicolores.webp
│   │   ├── choux-verts-480.jpg
│   │   ├── choux-verts-960.jpg
│   │   ├── choux-verts.webp
│   │   ├── ciboulette-fraiche-480.jpg
│   │   ├── ciboulette-fraiche-960.jpg
│   │   ├── ciboulette-fraiche.webp
│   │   ├── courges-du-jardin-480.jpg
│   │   ├── courges-du-jardin-960.jpg
│   │   ├── courges-du-jardin.webp
│   │   ├── courgettes-vertes-480.jpg
│   │   ├── courgettes-vertes-960.jpg
│   │   ├── courgettes-vertes.webp
│   │   ├── epinard-frais-480.jpg
│   │   ├── epinard-frais-960.jpg
│   │   ├── epinard-frais.webp
│   │   ├── logo-jardin-de-marie-192.png
│   │   ├── logo-jardin-de-marie-96.png
│   │   ├── logo-jardin-de-marie.ico
│   │   ├── logo-jardin-de-marie.png
│   │   ├── Persil-plat-480.jpg
│   │   ├── Persil-plat-960.jpg
│   │   ├── Persil-plat.webp
│   │   ├── pexels-photo-1656663.webp
│   │   ├── present.webp
│   │   ├── radis-roses-480.jpg
│   │   ├── radis-roses-960.jpg
│   │   ├── radis-roses.webp
│   │   ├── sac-de-courses-48.png
│   │   ├── sac-de-courses-96.png
│   │   ├── sac-de-courses.png
│   │   ├── salades-de-saison-480.jpg
│   │   ├── salades-de-saison-960.jpg
│   │   ├── salades-de-saison.webp
│   │   ├── tomate-ancienne-480.jpg
│   │   ├── tomate-ancienne-960.jpg
│   │   ├── tomate-ancienne.webp
│   │   ├── tracteur-480.jpg
│   │   ├── tracteur-960.jpg
│   │   └── tracteur.webp
│   └── js
│       ├── cart-page.js
│       ├── cart.js
│       └── layout.js
├── html
│   ├── Basilic-frais.html
│   ├── Choux-verts.html
│   ├── Ciboulette-fraîche.html
│   ├── contact.html
│   ├── epinards-frais.html
│   ├── footer.html
│   ├── header.html
│   ├── mentions-legales.html
│   ├── panier.html
│   ├── Persil-plat.html
│   ├── produit-betteraves.html
│   ├── produit-carottes-bio.html
│   ├── produit-courges.html
│   ├── produit-courgettes.html
│   ├── produit-radis.html
│   ├── produit-salades.html
│   ├── produit-tomates-anciennes.html
│   ├── produits.html
│   └── savoir-faire.html
├── .gitignore
├── index.html
└── README.md
```

## Technologies utilisees
- HTML5 semantique pour le contenu.
- CSS3 responsive avec grilles flexibles et variables.
- JavaScript vanilla pour le header dynamique et le panier.

## Prise en main
1. Cloner ou telecharger le depot.
2. Ouvrir `index.html` dans un navigateur pour parcourir le site.
3. Pour un rendu plus proche d'une mise en production, lancer un petit serveur local (exemple : `npx serve` ou `python -m http.server`) depuis la racine du projet.

## Personnalisation rapide
- Modifier les textes et visuels de la ferme dans `index.html` et les pages du dossier `html/`.
- Ajouter de nouveaux produits en dupliquant une carte dans la grille de `index.html` et en creant la fiche correspondante dans `html/`.
- Mettre a jour la palette, la typo ou les espacements dans `asset/css/styles.css`.

## Auteur
Projet pedagogique realise dans le cadre du Seminaire 5 EFFICOM.
