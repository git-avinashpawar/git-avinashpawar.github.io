$(function () {
  $("#search").click(function () {
    $("form").submit(function (e) {
      e.preventDefault();
    });
    console.log($(document.activeElement).val());

    var key = $("#form-search").val();
    key = key.toLowerCase();
    var data = $("#form-links").val();
    data = data.replaceAll(" ", "");

    links = data.split(",");

    var av = {
      files: [],
    };
    for (i = 0; i < links.length; i++) {
      var f = 100 + i;
      av.files.push({ link: links[i], fname: f });
    }
    console.log(key, links);
    console.log(links.length);
    console.log(av);
    $("#res").html("--------------------------------------------<p>Result</p>");
    var ini = "You are searching for " + key + " in :";

    for (let j = 0; j < links.length; j++) {
      ini =
        ini +
        "<br> document : " +
        "<a target='_blank' href=" +
        links[j] +
        ">" +
        links[j] +
        "</a>";
    }
    $("#init").html("<p>" + ini + "</p>");
    jQuery.ajax({
      url: "https://us-central1-avinash-pawar-fall2021.cloudfunctions.net/cloudMapReduce",
      type: "GET",
      data: av,
      success: function (response) {
        console.log(response);
      },
    });

    setTimeout(function () {
      jQuery.ajax({
        url: "https://us-central1-avinash-pawar-fall2021.cloudfunctions.net/cloudMapReduce",
        type: "GET",
        data: av,
        success: function (response) {
          console.log(response);
        },
      });
    }, 10000);
    setTimeout(function () {
      jQuery.ajax({
        url: "https://us-central1-avinash-pawar-fall2021.cloudfunctions.net/cloudMapReduce",
        type: "GET",
        data: av,
        success: function (response) {
          console.log(response);
        },
      });
    }, 20000);
    setTimeout(function () {
      var url = "https://storage.googleapis.com/ecc-a-data/reducer-data.json";
      var searchres = "We found " + key + " in";
      var a = key;
      $.getJSON(url, function (json) {
        myItems = json;
        //console.log(myItems);
        a = a.toLowerCase();
        if (a != null && a != "") {
          console.log(myItems[a]);
          if (myItems[a] != undefined) {
            var b = myItems[a];
            b.sort(function (a, b) {
              return a[0] - b[0];
            });

            var c = [];

            var l = Object.keys(b).length;
            for (let j = 0; j < l - 1; j++) {
              if (b[j][0] != b[j + 1][0]) {
                c.push(b[j]);
              }
            }
            c.push(b[l - 1]);

            b = c;
            b.sort(function (a, b) {
              return b[1] - a[1];
            });
            console.log(c, b);
            l = Object.keys(b).length;
            for (let i = 0; i < l; i++) {
              for (let j = 0; j < av.files.length; j++) {
                if (av.files[j].fname == b[i][0]) {
                  searchres =
                    searchres +
                    "<br> document : " +
                    "<a target='_blank' href=" +
                    av.files[j].link +
                    ">" +
                    av.files[j].link +
                    "</a>" +
                    ", " +
                    b[i][1] +
                    " times.";
                }
              }
            }
          } else {
            searchres =
              "Sorry: Your searchKey does not matches any of document results.";
          }
        } else {
          searchres = "Error : Please enter searchkey";
        }
        console.log(b);

        $("#res").html(
          "--------------------------------------------<p>Result</p>"
        );

        $("#result").html("" + searchres);
      });
    }, 90000);
  });
});
