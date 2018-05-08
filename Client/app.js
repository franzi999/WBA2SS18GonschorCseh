function populate(){
    if(quiz.isEnded()){
        showScores();      
    }
    else {
        var element = document.getElementById("questions");
        elemt.innerHTML = quiz.getQuestionIndex().text;
        
        var choices = quiz.getQuestionIndex().choices;
        for(var i=0; i < choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i] );
            
        }
        showProgress();
        
    }
}

function guess(id, guess){
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
    
}

function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + i;
    var element = document.getElementById("progress");
    element.innerHTML = "Question" + currentQuestionNumber + "of" + quiz.questions.length;
    
}

function showScores(){
    var gameOverHtml ="<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your score" + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
    
}

var questions = [
    new Question("In welchem Bundesland liegt Köln?", ["Nordrhein-Westfalen", "Schleswig-Holstein", "Bayern", "Sachsen"]),
    new Question("Welche Farbe hat eine Aubergine?", ["lila", "grün", "gelb", "rot"])
];

var quiz = new Quiz(questions);
populate();