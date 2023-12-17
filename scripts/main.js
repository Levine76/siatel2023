function resultform(input) {
    
    var raison_sociale = def_raison_sociale(input);
    var civilite =def_civilite(input);
    var prenom_nom = def_prenom_nom(input,prenomscsv);
    var fonction = def_fonction(input);
    var service = def_service(input);
    var l_adresse = def_l_adresse(input);
    var cp = def_cp(input);
    var ville = def_ville(input); 

    var output = (raison_sociale + civilite + prenom_nom + fonction + service + l_adresse + cp + ville) ;
    // Vérifier si les variables nécessaires sont vides
    if (!raison_sociale || !cp || !ville) {
        // Si l'une des variables est vide, renvoyer un message d'erreur
        output = "Les informations nécessaires (Raison sociale, Code postal, Ville) ne sont pas complètes.";
    }

    return output;
  }
 