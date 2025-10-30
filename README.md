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
|-- index.html
|-- README.md
|-- .gitignore
|-- asset/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   |-- layout.js
|   |   |-- cart.js
|   |   `-- cart-page.js
|   `-- img/
|       `-- (... fichiers .jpg / .webp / .png / .ico)
|-- html/
|   |-- header.html
|   |-- footer.html
|   |-- contact.html
|   |-- produits.html
|   |-- panier.html
|   |-- savoir-faire.html
|   |-- epinards-frais.html
|   |-- Persil-plat.html
|   |-- Basilic-frais.html
|   |-- Choux-verts.html
|   |-- produit-carottes-bio.html
|   |-- produit-salades.html
|   |-- produit-betteraves.html
|   |-- produit-courgettes.html
|   |-- produit-courges.html
|   |-- produit-radis.html
|   |-- produit-tomates-anciennes.html
|   `-- Ciboulette-fraîche.html
`-- .git/
    `-- (... configuration Git)
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
