
Chart.defaults.global.defaultFontFamily = 'Roboto';
Chart.defaults.global.defaultFontColor = '#333';

//var id = 2;
function makeChart(students, id, type) {

  var labels = students[0][id].reponses[type].map(function(d) {return d.prop});
  var weeksData = students[0][id].reponses[type].map(function(d) {return +d.importance});
  var colors = students[0][id].reponses[type].map(function(d) {

    switch(d.expression){
      case 'Besoin urgent':
        return '#BB2C0D';
      case 'Besoin d\'approfondissement':
        return '#3B0F06';
      case 'Pas besoin':
        return '#936960';
      case 'je ne connais pas du tout':
        return '#DF961E';
      case 'je connais un peu':
        return '#B2740D';
      case 'je vonnais bien':
        return '#7D1231';
      case 'je suis expert(e)':
        return '#DCA973';



//"je ne connais pas du tout":1,"je connais un peu":5,"je vonnais bien":10,"je suis expert(e)"
     // case 'Besoin urgent':
        //return '#215F36';
      }
    //return d.expression === 'Besoin urgent' ? '#F15F36' : '#19A0AA';
  });

  var chart = new Chart('chart', {
    type: 'doughnut',
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    },
    data: {
      labels: labels,
      datasets: [
      {
        data: weeksData,
        backgroundColor: colors
      }
      ]
    }

  })
  //console.log(players);

}

// Request data using D3

//d3.csv('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2814973/atp_wta.csv').then(makeChart);
//d3.csv('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2814973/atp_wta.csv', makeChart);


var values = {"Pas besoin":1, "Besoin d'approfondissement":5, "Besoin urgent":10, "je ne connais pas du tout":1,"je connais un peu":5,"je vonnais bien":10,"je suis expert(e)":20};


/*var q = */
var queue = d3.queue()
.defer(d3.csv, "data.csv")
.awaitAll(function(error, results) {
  if (error) throw error;
  setData(results);

/*$(document).ready(function(){

  $('.dropdown-menu').change(function() 
{ 
    var selectedValue = parseInt(jQuery(this).id());
    console.log(selectedValue);
    //Depend on Value i.e. 0 or 1 respective function gets called. 
   makeChart(results, 2);
});

});*/
  //makeChart(results, id);


$('#besoins').on('click', function(e){
   d3.select(".etudiants")
   .selectAll("a")
   .on('click', function(e, i)
   {
    document.getElementById("chart-wrapper").innerHTML = "";
    document.getElementById("chart-wrapper").innerHTML = "<canvas id=\"chart\"></canvas>";
          //console.log(j);
          makeChart(results, i, "besoins");


        });
    });




  $('#outils').on('click', function(e){
   d3.select(".etudiants")
   .selectAll("a")
   .on('click', function(e, i)
   {
    document.getElementById("chart-wrapper").innerHTML = "";
    document.getElementById("chart-wrapper").innerHTML = "<canvas id=\"chart\"></canvas>";
          //console.log(j);
          makeChart(results, i, "outils");


        });
    });   
});



function setData(data){

  data[0].forEach(function(d, j){


    document.querySelector(".etudiants").innerHTML += "<a href='#" + j +"'" + " class=dropdown-item>" + d['Votre nom'] + "</a>";

    d.reponses = {'besoins':[],'competences':[],'outils':[]};
    for (let i in d) {
      var prop = i.substring(i.indexOf("[")+1,i.indexOf("]")); 
      var v = d[i];
      var n = values[v];
      if(i.indexOf("besoins")>0){
        d.reponses.besoins.push({'prop':prop,'importance':n,'expression':v,'id':j});
      }
      if(i.indexOf("compétences")>0){
        d.reponses.competences.push({'prop':prop,'importance':n,'expression':v,'id':j});
      }
      if(i.indexOf("outils utilisez")>0){
        d.reponses.outils.push({'prop':prop,'importance':n,'expression':v,'id':j});
      }             
    }

//console.log(d);
}); 

}




