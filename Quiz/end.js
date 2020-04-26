const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

var name = localStorage.getItem("name");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText =
  "congrats! " + name + " you got " + mostRecentScore + " Marks";

saveHighScore = (e) => {
  console.log("clicked the save button!");
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
function updateform() {
  var name = localStorage.getItem("name");
  var org = localStorage.getItem("org");
  var cat = localStorage.getItem("cat");
  var email = localStorage.getItem("email");
  const score = localStorage.getItem("mostRecentScore");

  $.ajax({
    url:
      "https://docs.google.com/forms/d/e/1FAIpQLSf35ZQIoDmtD2yj1bv9hLBxKpzHvByLzGEK_oROJ_EGv2s-NQ/formResponse",
    data: {
      "entry.366261369": name,
      "entry.636711749": org,
      "entry.358051269": cat,
      "entry.325043293": email,
      "entry.1355833391": score,
    },
    type: "GET",
    dataType: "xml",
    success: function (d) {
      console.log("Sucess");
    },
    error: function (x, y, z) {
      console.log("error");
    },
  });
}
