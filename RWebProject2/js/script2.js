
// Fonction permettant la création des graphiques
var creationRendu = function (donnees) {
    "use strict";
    
    var colTous, table, tabOptions, colChart, barChart, pieChart, barOptions, pieOptions;
    
    // Couleur des barres verticales
    colTous = "#007777";  

    // Création du diagramme en barres horizontales
    barChart = new google.visualization.BarChart(document.getElementById("barChart"));
    barOptions = {
        title: 'Le nombre de fans des artistes du moment',
        legend: 'none',
        colors: [colTous]
    };
  
    pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
    pieOptions = { title: 'Le pourcentage de fans des artistes du moment', is3D: true};
    
    // Affichage de tous les graphiques à l'état initial (sans sélection et selon le regroupement choisi)
    function initialisation() {
        barOptions.colors = [colTous];
        barChart.draw(donnees, barOptions);
        pieChart.draw(donnees, pieOptions);
    }
    
    // on affiche tout ca
    initialisation();

};

// Fonction permettant de charger les données puis de créer les graphiques
function go() {
    "use strict";

    // Chargement des données
    $.getJSON("resources/data.json", 
        function (dataa) {
        // Création d'une DataTable compatible pour Google Charts
        var don = new google.visualization.DataTable();
        don.addColumn('string','Artiste');
        don.addColumn('number', 'Nombre de fans');

        dataa.data.forEach(function (item, index) {
            don.addRows([[item.name, item.nb_fan]]);
        });

        // Appel de la fonction créant les graphiques
        creationRendu(don); 
    });
}