function HTMLtoPDF() {
  var name = localStorage.getItem("name");
  var w = document.getElementById("HTMLtoPDF").offsetWidth;
  var h = document.getElementById("HTMLtoPDF").offsetHeight;
  html2canvas(document.getElementById("HTMLtoPDF"), {
    // Adjusts your resolution
    onrendered: function (canvas) {
      var img = canvas.toDataURL("image/jpeg", 1);
      var doc = new jsPDF("L", "px", [w, h]);
      doc.addImage(img, "JPEG", 0, 0, w, h);

      name = "Certificate of " + name + ".pdf";
      doc.save(name);

      setTimeout(function () {
        alert("Downloaded Look into Your Downloads folder");
      }, 1000);
    },
  });
}

function update() {
  var name = localStorage.getItem("name");
  var org = localStorage.getItem("org");

  if (name == "" || name == null) {
    alert("Please fill information on start of quiz");
  }

  const score = localStorage.getItem("mostRecentScore");

  name = name.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  org = org.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  const name1 = document.getElementById("name");
  const org1 = document.getElementById("org");
  const score1 = document.getElementById("score");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  name1.innerHTML = name;
  org1.innerHTML = org;
  score1.innerHTML = "On " + today + ", With Score of " + score + "%.";

  if (name.length > 25) {
    name1.style.fontSize = "40px";
    score1.style.marginTop = "110px";
  }
  if (org.length > 45) {
    org1.style.fontSize = "22px";
    score1.style.marginTop = "118px";
  }

  $("body").css({ overflow: "hidden" });
  $(document).bind("scroll", function () {
    window.scrollTo(0, 0);
  });

  if (name == "" || name == null) {
    alert("Please fill information on start of quiz to generate certificate");
  } else {
    document.getElementById("cert").disabled = false;
    document.getElementById("cert1").disabled = false;
  }
}
