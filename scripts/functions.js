
function def_raison_sociale(input) {
  var titres_fct = ["president","vice-president", "presidente", "vice-presidente", "adjoint", "adjointe", "premier ministre","ministre", "depute", "deputee", "senateur", "senatrice", "maire", "prefet", "prefète","directrice","directeur"];
  var article = ["de","du","des"];
  // Divise la chaîne de caractères en lignes
    const lignes = input.split(/[\n]+/);
    // Parcours chaque mot dans l'input
    for (var k = 0; i < lignes.length; k++) {
      var motsInput = lignes[k].split(/[ \n]+/); 
      for (var i = 0; i < motsInput.length-2; i++) {
        //On regarde si la fonction est définie
        if (titres_fct.includes(motsInput[i].toLowerCase().replace("é","e")) && article.includes(motsInput[i+1])) {
          return `\nRaison sociale = ${motsInput.slice(i+2).join(" ").replace("l’").replace("le").replace("la")}`;
        }}}

  // Sinon on récupère la première ligne
  return `\nRaison sociale = ${lignes[0]}`;
}

function def_civilite(input) {
  // Liste des titres à rechercher
  var titresM = ["M.", "Mr", "Monsieur"];
  var titresMme = ["Mme", "Madame"];

  // On vérifie la présence de chaque titre dans la chaîne
  for (var i = 0; i < titresM.length; i++) {
    if (input.includes(titresM[i])) {
      return "\nCivilité = M.";
    }
  }

  for (var i = 0; i < titresMme.length; i++) {
    if (input.includes(titresMme[i])) {
      return "\nCivilité = Mme";
    }
  }
  return "\nCivilité =  ";
}

function def_prenom_nom(input, prenoms) {
  var prenom = "\nPrénom = ";
  var nom = "\nNom = ";
  let titres = ["M.", "Mr", "Monsieur","Mme", "Madame"];
  //let  regexUp = /\b([A-Z]+-[A-Z]+|[A-Z]+)\b/g;

  // Boucle sur chaque mot dans l'input
  const motsInput = input.split(/[ \n]+/); 
  let i= 0;
  while (i < (motsInput.length-2))  {

    if (titres.includes(motsInput[i])) {
      if (prenoms.includes(motsInput[i + 1].toLowerCase())){
        return  `\nPrénom = ${motsInput[i+1]}`.replace(",","") + `\nNom = ${motsInput[i+2]}`.replace(",","");
      }
      else if (prenoms.includes(motsInput[i + 2].toLowerCase())){
        return  `\nPrénom = ${motsInput[i+2]}`.replace(",","") + `\nNom = ${motsInput[i+1]}`.replace(",","");
      }
      else {
        return  prenom + `\nNom = ${motsInput[i + 1]}`.replace(",","");
      }}

    else if (prenoms.includes(motsInput[i].toLowerCase())){//& motsInput[i+1].match(regexUp) ){
      return  `\nPrénom = ${motsInput[i]}`.replace(",","") + `\nNom = ${motsInput[i+1]}`.replace(",","");
    }
      i++;
    }
  return  prenom+ nom;
  }

function def_fonction(input) {
  // Liste des titres à rechercher
  var titres_fct = ["president","vice-president", "presidente", "vice-presidente", "adjoint", "adjointe", "premier ministre","ministre", "depute", "deputee", "senateur", "senatrice", "maire", "prefet", "prefète","directrice","directeur"];

  // Parcours chaque mot dans l'input
  const motsInput = input.split(/[ \n]+/);
  for (const mot of motsInput) {
    if (titres_fct.includes(mot.toLowerCase().replace("é","e"))) {
      return `\nFonction = ${mot}`;
    }
  }
  return "\nFonction =  ";
}

function def_service(input){
  var titres_services= ["service","departement", "division"];
  // Divise la chaîne de caractères en lignes
    const lignes = input.split(/[\n]+/);
    // Parcours chaque mot dans l'input
    for (var k = 0; k < lignes.length; k++) {
      const ligne=lignes[k];
      var motsInput = ligne.split(/[ ]+/); 
      for (var i = 0; i < motsInput.length; i++) {
        //On regarde si le service est présent
        if (titres_services.includes(motsInput[i].toLowerCase().replace("é","e"))) {
          return `\nService = ${ligne}`;
        }}}
  //sinon on ne renvoie rien 
  return ""
}
function def_l_adresse(input) {
  // Liste des lignes dans l'input
  const lignes = input.split(/[\n]+/);
  var resultat = "";

  // On initialise un compteur pour chaque ligne d'adresse
  let k=0;

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i];


      // Vérifie si la ligne contient le code postal et la ville (supposant qu'il contient des chiffres)
      if (k>1 && /\d/.test(ligne)) {
          break; 
      }
      // Vérifie si la ligne commence par un chiffre (numéro de rue)
      if (k<1 && /\d/.test(ligne)) {
        k=1
    }
      // Ajoute la ligne à la liste des lignes d'adresse si nous sommes en train de récupérer
      if (k > 0 && k <4) {
        if (ligne!=" "){
          resultat=resultat+`\nLigne ${k} d’adresse = ${ligne}`;
        }
        k++;
      }

  }
  return resultat;
}

function def_cp(input) {
 // Par défaut, la fonction renvoie une chaîne vide bpour être sur qu'on a une adresse

 // Utilisation d'une expression régulière pour extraire les codes postaux
 const regexCodePostal = /\d{5}/g;

 // Recherche des correspondances dans la chaîne
 let adresse_short = input.replace(/\s/g, '');
 const correspondances = adresse_short.match(regexCodePostal);
 if (correspondances) {
     return `\nCode postal = ${correspondances[correspondances.length - 1]}`;
 }
 return "";
}
function def_ville(input) {
// Liste des mots dans l'input
const mots = input.trim().split(/\s+/);

// Vérifie si le dernier mot est "cedex"
if (mots.length > 0 && mots[mots.length - 1].toLowerCase() === "cedex") {
  // Si oui, regroupe les deux derniers mots en une seule chaîne de caractères
  const mots_ville = mots.slice(-2).join(' ');
  return `\nVille = ${mots_ville}`;
} else {
  // Sinon, renvoie le dernier mot tel quel
  return mots.length > 0 ? `\nVille = ${mots[mots.length - 1].toUpperCase()}` : null;
}
}