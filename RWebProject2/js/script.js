
// Fonction permettant la création des graphiques
var creationRendu = function (donnees) {
    "use strict";
    
    var colTous, table, tabOptions, colChart, colOptions, vueDureeChanson;
    

    // Couleur des barres verticales
    colTous = "#007777";
     
    //Création de la vue pour le diagramme
    vueDureeChanson = new google.visualization.DataView(donnees);
    vueDureeChanson.hideColumns([1,2,4]);
   
    
    // Création du tableau
    table = new google.visualization.Table(document.getElementById('tab'));
    tabOptions = {
        showRowNumber: true,
        sort: 'disable'
    };
    
    // Création du diagramme en barres verticales
    colChart = new google.visualization.ColumnChart(document.getElementById("columnChart"));
    colOptions = {
        title: 'La durée des 10 musiques du moment (en secondes)',
        colors: [colTous]
    };
  
    
    // Affichage de tous les graphiques à l'état initial (sans sélection et selon le regroupement choisi)
    function initialisation() {
        table.draw(donnees, tabOptions);
        colChart.draw(vueDureeChanson, colOptions);
    }
    
    // Procédure de sélection ou déselection des éléments dans chaque graphique
    function selection(titre) {
        if (titre !== undefined) {
            table.setSelection([{row: titre, column: null}]);
            colChart.setSelection([{row: titre, column: 1}]);
        } else {
            table.setSelection([]);
            colChart.setSelection([]);
        }
    }
    
    function selectionCellule() {
        var cellule = table.getSelection()[0];
        if (cellule) {
            selection(cellule.row);
        } else {
            selection();
        }
    }
    google.visualization.events.addListener(table, 'select', selectionCellule);

    function selectionVBarre() {
        var barre = colChart.getSelection()[0];
        if (barre) {
            selection(barre.row);
        } else {
            selection();
        }
    }
    google.visualization.events.addListener(colChart, 'select', selectionVBarre);
   
    // on affiche tout ca
    initialisation();
};

// Fonction permettant de charger les données puis de créer les graphiques
function go() {
    "use strict";
    
    // Chargement des données
    $.getJSON("resources/text.json", 
        function (dataa) {
        // Création d'une DataTable compatible pour Google Charts
        var don = new google.visualization.DataTable();
        don.addColumn('string', 'Titre');
        don.addColumn('string','Artiste');
        don.addColumn('string','Album');
        don.addColumn('number', 'Durée');
        don.addColumn('string', 'Lien');

        dataa.data.forEach(function (item, index) {
            don.addRows([[item.title, item.artist.name, item.album.title, item.duration, item.link ]]);
        });

        // Appel de la fonction créant les graphiques
        creationRendu(don); 
    });
}