var fs = require('fs');
const chalk = require('chalk');

function zahlenvergleich(a,b){
    return a.population-b.population;
}


fs.readFile(__dirname+'/staedte.json','utf8',(err,data) => {
    var jsonobj = JSON.parse(data);

    jsonobj.cities.sort(zahlenvergleich);
    var string = JSON.stringify(jsonobj, null, 2);

    fs.writeFile(__dirname + "/staedte_liste.json", string, function (err) {
        if (err) throw err;

        for (var i = 0; i < data.length; i++) {
            console.log(chalk.styles.blue.open + "________________________________________" + chalk.styles.blue.close + "\n"
                + chalk.styles.green.open + "Name: " + chalk.styles.green.close + data.cities[i].name + "\n"
                + chalk.styles.green.open + "Land: " + chalk.styles.green.close + data.cities[i].country + "\n"
                + chalk.styles.green.open + "Bevölkerung: " + chalk.styles.green.close + data.cities[i].population + "\n"
            );
        };


    });
});