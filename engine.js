(function() {
  /************************ OBJECTS & ARRAYS ************************/

  // Class constructor for questions
  var Question = function(text, ansArr, corrAns) {
    return {
      content: text,
      answear: ansArr,
      correctAnswear: ansArr[corrAns]
        ? corrAns
        : console.log("Błędna odpowiedź"),
      displayQuestion: function(numberOfQuestion) {
        document.getElementById("question").innerHTML =
          questions[numberOfQuestion].content;
      }
    };
  };
  var SCORE = 0;
  // Array to store questions
  var questions = new Array();
  // Array to store answears (in case if every question has just two answears);
  var answears = ["Tak", "Nie", "Może"];

  var numberOfQuestion = 0;

  /************************ ENGINE ************************/

  // Bunch of Questions pushed into the Array
  questions.push(new Question("Tak ?", answears, 0));
  questions.push(new Question("Nie ?", answears, 1));
  questions.push(new Question("A może ?", answears, 2));

  document.getElementById("exit-btn").addEventListener("click", function() {
    exit();
  });
  printQuestionAndAnswears();

  /************************ FUNCTIONS ************************/
  function printQuestionAndAnswears() {
    askQuestion(questions);
    var childNodesList = document.createElement("ul");
    answears.forEach(function(answ) {
      childNodesList.appendChild(addOptionToAnswears(answ));
      document.getElementById("answears").appendChild(childNodesList);
    });
  }

  function addOptionToAnswears(answear) {
    var childNode = document.createElement("li");
    childNode.innerHTML = answear;
    childNode.addEventListener("click", function() {
      childNode.classList.add("checked");
      setTimeout(function() {
        isItCorrect(answears.indexOf(answear), numberOfQuestion)(SCORE);
        childNode.classList.remove("checked");
      }, 400);
    });
    return childNode;
  }
  function pickQuestion(questions) {
    var pickedQuestion = Math.floor(Math.random() * questions.length);
    return pickedQuestion;
  }
  function exit() {
    updateScore(SCORE);
    if (SCORE > 0) {
      document.querySelector(".row__container").classList.add("game-won");
      window.alert("You Won !");
    } else {
      document.querySelector(".row__container").classList.add("game-lost");
      window.alert("You Lost !");
    }
    document.getElementById("exit-btn").classList.add("disabled");
    document.getElementById("exit-btn").setAttribute("disabled", true);
    var old_element = document.getElementById("answears");
    var new_element = old_element.cloneNode(true);
    var childLiList = new_element.children[0].children;
    for (var i = 0; i < childLiList.length; i++) {
      childLiList[i].classList.add("li--disabled");
    }
    old_element.parentNode.replaceChild(new_element, old_element);
  }
  function isItCorrect(ans, numberOfQuestion) {
    ans == questions[numberOfQuestion].correctAnswear
      ? (function() {
          document.getElementById("current-result").innerHTML = "CORRECT";
          document
            .getElementById("current-result")
            .classList.remove("incorrect");
          document.getElementById("current-result").classList.add("correct");
          SCORE++;
        })(SCORE)
      : (function() {
          document.getElementById("current-result").innerHTML = "WRONG";
          document.getElementById("current-result").classList.remove("correct");
          document.getElementById("current-result").classList.add("incorrect");
          SCORE--;
        })(SCORE);
    return function(SCORE) {
      updateScore(SCORE);
      askQuestion(questions);
    };
  }

  function updateScore(SCORE) {
    document.getElementById("result").innerHTML = SCORE + " pkt";
  }

  function askQuestion(questions) {
    numberOfQuestion = pickQuestion(questions);
    questions[numberOfQuestion].displayQuestion(numberOfQuestion);
  }
})();
