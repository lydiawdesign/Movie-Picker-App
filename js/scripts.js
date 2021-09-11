
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
// var 
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
    // console.log($genreInput.data);
    easyPie(userSearchGenre, userSearchyear);
    document.location.href='results.html?q='+userSearchGenre+'&'+userSearchyear;
})

generateYears();


$genreInput.change(function(){
    var saveThisGenre = $(this).find(":selected").data("genre")
    // saveThisGenre = saveThisGenre.replace('"', '');
    window.localStorage.setItem("savedGenre", JSON.stringify(saveThisGenre));
});
