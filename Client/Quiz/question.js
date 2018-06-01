function Question(text, choices, answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

Question.prototype.correctAnswer = function(choices){
    return choice == this.answer;
};