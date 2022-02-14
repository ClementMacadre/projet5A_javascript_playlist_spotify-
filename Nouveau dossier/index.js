 /* DÉBUT DU FICHIER index.js
Excuse de le mettre en plein texte. Le commentaire ne passe pas quand je mets ce bloc de code en Jscript dans l'éditeur de Openclassrooms
*/
const express = require("express");
const path = require("path");
const app = express();
//
/*
 Pour dire qu'on va recevoir du JSON
 Souviens-toi du "application/json"
 dans le fichier send-request.js
*/
app.use(express.json());
//
/*
 Pour dire à express, que nos fichiers statiques (css,
 images, javascript) seront dans le dossier "public"
*/
app.use(express.static(path.join(__dirname, "public")));
//
// Si quelqu'un accede à la page d'accueil, on lui fait voir notre index.html
app.get("/", (req, res) => {
  const indexFile = path.join(__dirname, "index.html");
  res.sendFile(indexFile);
});
//
// Si on recoit une requête à l'adresse /update
app.post("/update", (req, res) => {
  // Tu peux accéder aux données comme ceci:
  const volt = req.body.volt;
  // Mets à jour la base de données ici...
  // ... renvoie une réponse au navigateur
  res
    .status(200)
    .send({ message: "Tension mise à jour à " + volt + "V avec succès" });
});
//
// Si on reçoit une requête à l'adresse /create
app.post("/create", (req, res) => {
  // Tu peux accéder aux données comme ceci:
  const volt = req.body.volt;
  // Inserts dans la base de données ici...
  // ... renvoie une réponse au navigateur
  res.status(200).send({ message:  "Tension à "+ volt +"V créée avec succès" });
});
//
/*
 Si on recoit une requête à une autre adresse qu'on n'a
 pas configuré, on retourne que la page est introuvable
*/
app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});
const port = 8080;
app.listen(port, () => console.log("Serveur écoute sur le port "+port));
 /* FIN DU FICHIER index.js */