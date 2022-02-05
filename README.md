# Projet javascript Joly Dylan, Macadré Clément, Gomond Ronan

## TODO

- drag vertical pour changer l'ordre des chansons
- faire le lien avec le back et l'API spotify

## Fonctionnel

- Drag & drop d'une zone à l'autre
- Ajout et suppression d'une chanson
- Bouton de lecture de la chanson

## Doc code JS front

fonctions:
- `addSong(div, imgSrc, title, artist)` pour ajouter une chanson avec en argument l'url de l'image à afficher, le titre de la chanson et l'artiste
- exemple : `addSong('leftzone', 'Pictures/lctc.jpg', 'London Calling', 'The Clash');`
- L'ajout d'une chanson à une des divs est géré par la fonction `cloneImage`, il faudra ajouter les requêtes au serveur ici.
- `updateDrag` qui met à jour les éléments qui peuvent bouger


## Génération de playlist à l'aide de l'api Spotify

### Développement d'une interface graphique permettant de créer des playlists à partir d'une session d'écoute de groupe.

Les participants se connectent avec leurs comptes Spotify via l'api Spotify pour que l'application ait accès à leurs activités.
Un historique des musiques jouées est créé pendant cette session de groupe.
Les utilisateurs peuvent ensuite sélectionner les musiques qui leur ont plu et les ajouter à un panier.
À partir de ce panier, les utilisateurs peuvent ajouter les musiques à différentes playlists personnelles.

### L'appli devra :
- Interroger la base de données Spotify pour récupérer des informations sur les titres joués
- Sauvegarder dans un Json ou une base de données les informations nécessaires
- Afficher de manière intuitive ces informations sur une page web.

### Détails :
- Les interactions se feront à base de glisser-déposer.
- Création d'un dépôt git pour favoriser le versionning et la coopération
