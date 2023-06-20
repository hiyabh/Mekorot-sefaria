// $(document).ready(function () {
//   $("#source-form").on("submit", function (e) {
//     e.preventDefault();
//     var source = $("#source").val();

//     $("#response").html("הלכנו להביא את המקור, אנא המתן...");

//     $.ajax({
//       url:
//         "https://www.sefaria.org/api/texts/" +
//         source +
//         "?context=0&pad=0&lang=he",
//       type: "GET",
//       success: function (data) {
//         if (data.error) {
//           console.log("data.error: ", data.error);
//           $("#response").html("המקור לא נמצא, אנא הכנס מקור אחר.");
//         } else {
//           $("#response").html(data.he, null, 2);
//         }
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         console.log("error: ", JSON.stringify(jqXHR));
//         $("#response").html("Error: " + errorThrown);
//       },
//     });
//   });
// });

 $(document).ready(function () {
   $("#source-form").on("submit", function (e) {
     e.preventDefault();
     var source = $("#source").val();
     var commentary = $("#commentary").is(":checked") ? 1 : 0;

     $("#response").html("הלכנו להביא את המקור, אנא המתן...");

     $.ajax({
       url:
         "https://www.sefaria.org/api/texts/" +
         source +
         "?context=0&pad=0&lang=he&commentary=" +
         commentary,
       type: "GET",
       success: function (data) {
         if (data.error) {
           $("#response").html("המקור לא נמצא, אנא הכנס מקור אחר.");
         } else {
           $("#response").html(data.he, null, 2);
           if (data.commentary) {
             $("#commentaries").empty();
             data.commentary.forEach(function (item) {
               var title = item.collectiveTitle.he;
               var text = Array.isArray(item.he)
                 ? item.he.join(" ")
                 : item.he;
               if (text && text.trim() !== "") {
                 $("#commentaries").append(
                   "<div><h2>" + title + "</h2><p>" + text + "</p></div>"
                 );
               }
             });
           }
         }
       },
       error: function (jqXHR, textStatus, errorThrown) {
         console.log("error: ", JSON.stringify(jqXHR));
         $("#response").html("Error: " + errorThrown);
       },
     });
   });
 });