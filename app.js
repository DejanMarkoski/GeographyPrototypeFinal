var timetaken = 1;
var timeTaken = setInterval(function(){
    if(timetaken <= 0){
        clearInterval(timeTaken);
    } else {
        document.getElementById("count").innerHTML = timetaken + " seconds taken";
    }
    timetaken += 1;
}, 1000);

function convertToMinAndSec(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return (minutes<1 ? seconds+" seconds" : minutes + " minute"+(minutes===1?" ":"s ")+seconds + " seconds");
}

function populate() {
    if(quiz.isEnded()) {
        showScore();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var choices = quiz.getQuestionIndex().choices;
        for(var i=0; i<choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScore(){
    var gameOverHtml = "<h1>Result: </h1>";
        gameOverHtml += "<h2 id='score'>Your score: " + quiz.score + "</h2>";
        gameOverHtml += "<h2 id='timeTaken'>Time taken: " + convertToMinAndSec(timetaken) + " </h2>";
    if(quiz.score <= 0){
        gameOverHtml += "<h2 id='timeTaken'>Hmm, that doesn't look too good...<br/><br/> Maybe <a href='quiz.html'>try again?</a></h2>";
    } else if (quiz.score > 10 && quiz.score!=questions.length){
        gameOverHtml += "<h2 id='timeTaken'>Good job!</h2>";
    }
    if(quiz.score == questions.length){
        gameOverHtml += "<h2 id='timeTaken'>Perfect! Congratulations, you got maximum points!</h2>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
    var btns = document.getElementById("endQuizButtons")
    btns.style.display = 'block';
};



var questions = [
    new Question("<img src=./img/mkd.PNG style='margin-left: 200px;max-height: 200px; max-width: 200px'>", ["Macedonia", "Slovenia", "Estonia", "Moldova"], "Macedonia"),
    new Question("<img src=./img/swe.png style='margin-left: 200px;max-height: 200px; max-width: 200px'>", ["Finland", "Sweden", "Denmark", "Ukraine"], "Sweden"),
    new Question("<img src=./img/monaco.png style='margin-left: 200px;max-height: 150px; max-width: 200px'>", ["Switzerland", "Poland", "Monaco", "Austria"], "Monaco"),
    new Question("Which of the following countries has the highest gross domestic product (GDP) in Europe?", ["Italy", "Netherlands", "USA", "Germany"], "Germany"),
    new Question("Which of the following countries is the second most populated in the world?", ["China", "India", "Brazil", "Russia"], "India"),
    new Question("Which of the following countries has the largest territory?", ["Russia", "USA", "China", "India"], "Russia"),
    new Question("<img src=./img/jap.png style='margin-left: 200px;max-height: 200px; max-width: 200px'>", ["South Korea", "China", "Japan", "Taiwan"], "Japan"),
    new Question("<img src=./img/kr.png style='margin-left: 200px;max-height: 200px; max-width: 200px'>", ["North Korea", "Japan", "Thailand", "South Korea"], "South Korea"),
    new Question("Which of the following is the longest mountain range in the world? (7000+ km)", ["Ural Mts", "Andes", "Himalayas", "Rocky Mts"], "Andes"),
    new Question("With a height of over 8800 meters, the world's tallest peak is: ", ["Mt Everest", "Makalu", "Cho Oyu", "Manaslu"], "Mt Everest"),
    new Question("<img src=./img/sp.png style='margin-left: 200px;max-height: 150px; max-width: 200px'>", ["Portugal", "Andorra", "Spain", "Malta"], "Spain"),
    new Question("Which of the following cities is the capital of Japan?", ["Tokyo", "Seoul", "Hong Kong", "Kyoto"], "Tokyo"),
    new Question("Which of the following cities is the capital of USA?", ["New York", "Washington D.C.", "Florida", "California"], "Washington D.C."),
    new Question("On which continent can you locate the 'Great Barrier Reef'?", ["Africa", "N. America", "Europe", "Australia"], "Australia"),
    new Question("<img src=./img/ita.png style='margin-left: 200px;max-height: 150px; max-width: 200px'>", ["Ireland", "Hungary", "Italy", "Bulgaria"], "Italy"),
    new Question("<img src=./img/Africa.png style='margin-left: 200px;max-height: 150px; max-width: 200px'>", ["S. America", "Asia", "Europe", "Africa"], "Africa"),
    new Question("In the world there are ___ continents.", ["7", "6", "8", "5"], "7"),
    new Question("The world's largest tropical rainforest - Amazon Rainforest, is mostly located at:", ["Argentina", "Brazil", "Ecuador", "Chile"], "Brazil"),
    new Question("Stockholm is the capital city of ___.", ["Germany", "Australia", "Sweden", "Canada"], "Sweden"),
    new Question("At which of the following countries can you find the Nile river?", ["Morocco", "South Africa", "Chad", "Egypt"], "Egypt"),
];

const shuffleQuestions = questions => {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions;
};

shuffleQuestions(questions);
var quiz = new Quiz(questions);
populate();



