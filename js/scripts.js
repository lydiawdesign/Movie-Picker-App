
// $(function() {
//     $("#year").datepicker({
//         changeYear: true,
//         yearRange: "-100:+0",
//         dateFormat: "yy",
//     })
//     // console.log("Help")
// });

var $searchButton = $("#search-btn");
var $yearInput = $("#year-select");
var $genreInput = $("#genre-select");

function generateYears() {
    for (var i=2021; i>1950; i--) {
        $("<option>").text(i).val(i).appendTo("#year-select");
    }
}

$("#search-btn").on("click", function(event){
    event.preventDefault();
    userSearchGenre = $genreInput.val();
    // console.log(userSearchGenre);
    userSearchyear = $yearInput.val();
    // console.log(userSearchyear);
    easyPie(userSearchGenre, userSearchyear);
    document.location.href='Results.html?q='+userSearchGenre+'&'+userSearchyear;
})

generateYears();

