$(function () {
  $("#search").click(function () {
    $("form").submit(function (e) {
      e.preventDefault();
    });

    console.log($(document.activeElement).val());

    var av = {
      shr: [
        {
          link: "https://www.gutenberg.org/files/102/102-0.txt",
          fname: "102",
        },
        {
          link: "https://www.gutenberg.org/files/103/103-0.txt",
          fname: "103",
        },
        {
          link: "https://www.gutenberg.org/files/107/107-0.txt",
          fname: "107",
        },
        {
          link: "https://www.gutenberg.org/files/108/108-0.txt",
          fname: "108",
        },
        {
          link: "https://www.gutenberg.org/files/110/110-0.txt",
          fname: "110",
        },
      ],
    };
    console.log(av.shr[0].link);
    console.log(av.shr.length);

    var a = $("#form-search").val();
    var searchres = "We found " + a + " in";
    $.getJSON("reducer.json", function (data) {
      myItems = data;
      //console.log(myItems);
      a = a.toLowerCase();
      if (a != null && a != "") {
        console.log(myItems[a]);
        if (myItems[a] != undefined) {
          var b = myItems[a];
          b.sort(function (a, b) {
            return b[1] - a[1];
          });
          var l = Object.keys(b).length;
          for (let i = 0; i < l; i++) {
            for (let j = 0; j < av.shr.length; j++) {
              if (av.shr[j].fname == b[i][0]) {
                searchres =
                  searchres +
                  "<br> document : " +
                  "<a target='_blank' href=" +
                  av.shr[j].link +
                  ">" +
                  av.shr[j].link +
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
  });

  $("#ad-search").click(function () {
    $("form").submit(function (e) {
      e.preventDefault();
    });
    console.log($(document.activeElement).val());
    window.open("/ad-search.html", "_blank");
  });
});
