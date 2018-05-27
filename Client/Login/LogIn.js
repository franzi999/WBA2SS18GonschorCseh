var attempt = 3; // Variable zählt die Anzahl der Versuche
// Funktion wird beim Klick auf Button ausgeführt und überprüft Daten auf Gültigkeit
function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == "Formget" && password == "formget#123"){
        alert ("Login successfully");
        window.location = "success.html"; // Bei erfolgreicher Eingabe, erfolgt hier die Weiterleitung auf die nächste Seite
        return false;
    }
    else{
        attempt --;
        alert("You have left "+attempt+" attempt;");
// Bei 3 versäumten Versuchen werden die Felder deaktiviert
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}

