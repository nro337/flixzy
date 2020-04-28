// FAQ Scrolling Progress Bar
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    var windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (windowScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + '%';
}


//Suggestions Page Help Modal
var modal = document.getElementById("helpModal");
var modalButton = document.getElementById("helpButton");
var span = document.getElementsByClassName("close")[0];

if(window.location.href == 'http://127.0.0.1:3000/Suggestions.html'){
    $('#questions').hide();
    $(document).ready(function(){
        modalButton.onclick = function(){
            modal.style.display = "block";
        }
        
        span.onclick = function(){
            modal.style.display = "none";
        }
        
        window.onclick = function(event){
            if(event.target == modal) {
                modal.style.display = "none";
            }
        }
    });
}

//Suggestions Page 

$("#searchButton2").on("click", function () {
    $('#questions').toggle();
    var searchString2 = $('#searchField2').val();
    // window.location.replace("./SearchResults.html");
    $(document).ready(function(){
        var url = "http://api.tvmaze.com/search/shows?q=" + searchString2;
        $.ajax({
            url: url,
            type: 'get',
            success: function (data, status, jqXHR) {
                localStorage.clear();
                for (var i=0; i<data.length; i++){
                    localStorage.setItem('suggestionData' + i, data[i].show.name);
                    if(data[i].show.officialSite !== null){
                        localStorage.setItem('suggestionLink' + i, data[i].show.officialSite);
                    } else{
                        localStorage.setItem('suggestionLink' + i, "");
                    }

                    localStorage.setItem('suggestionGenres', data[i].show.genres);

                    if(data[i].show.genres !== null){
                        //console.log(data[i].show.genres[0]);
                        if($.inArray($('#genreSelect').val(), data[i].show.genres)){
                            console.log($('#genreSelect').val());
                            document.getElementById("questions").innerHTML += '<p>' + 	'&#8226; ' + localStorage.getItem('suggestionData' + i) + "  <a href=" + localStorage.getItem('suggestionLink' + i) + ">" + localStorage.getItem('suggestionLink' + i) + '</a></p>';
                        }
                        
                    }

                    
                    
                }

                $('#searchField2').val('');


                localStorage.clear();

            }
        });
    });
});

var results = document.getElementById("searchResult");
var divEntry = document.createElement('div');


//TV Show & Movie Search
//Window manipulation help from https://www.w3schools.com/js/js_window_location.asp
$(document).ready(function(){
    if (window.location.href == 'http://127.0.0.1:3000/SearchResults.html'){
        var filmImage = localStorage.getItem('filmImage');
        var filmTitle = localStorage.getItem('filmTitle');
        var filmSummary = localStorage.getItem('filmSummary');
        var filmRating = localStorage.getItem('filmRating');
        var filmNetwork = localStorage.getItem('filmNetwork');
        var filmWebChannel = localStorage.getItem('filmWebChannel');
        var filmRecommend1 = localStorage.getItem('filmRecommend1');
        var filmRecommend2 = localStorage.getItem('filmRecommend2');
        var filmRecommend3 = localStorage.getItem('filmRecommend3');
        var filmGenres = localStorage.getItem('filmGenres');
        document.getElementById('movieTitle').innerHTML += filmTitle;
        document.getElementById('movieDescription').innerHTML += filmSummary;
        document.getElementById("searchedShowImage").src =filmImage; 
        document.getElementById("ratingStars").innerHTML += "  " + filmRating;

        if (filmNetwork == null){
            document.getElementById('filmPlatform').innerHTML += "  " + filmWebChannel;
        } else{
            document.getElementById('filmPlatform').innerHTML += "  " + filmNetwork;
        }


        document.getElementById('movieGenres').innerHTML += "  " + filmGenres; 


        document.getElementById('recommendedFilm1').src = filmRecommend1;
        document.getElementById('recommendedFilm2').src = filmRecommend2;
        document.getElementById('recommendedFilm3').src = filmRecommend3;
        


        // console.log(filmImage);
        // console.log(filmTitle);
        // console.log(filmSummary);
        localStorage.clear();
    }
});

//Persistent Data help from https://stackoverflow.com/questions/29986657/persist-variables-between-page-loads

$("#searchButton").on("click", function () {
    var searchString = $('#searchField').val();
    // window.location.replace("./SearchResults.html");
    $(document).ready(function(){
        var url = "http://api.tvmaze.com/search/shows?q=" + searchString;
        $.ajax({
            url: url,
            type: 'get',
            success: function (data, status, jqXHR) {
                localStorage.clear();

                //Handles if there is only 1 search result
                if(data[1] !== null){
                    localStorage.setItem('filmTitle', data[0].show.name);
                    if (data[0].show.image !== null){
                        localStorage.setItem('filmImage', data[0].show.image.medium);
                    }
                    localStorage.setItem('filmSummary', data[0].show.summary);
    
                    //Get rating
                    if(data[0].show.rating !== null){
                        localStorage.setItem('filmRating', data[0].show.rating.average);
                    }
                    
                    //Get Network
                    if (data[0].show.network !== null){
                        localStorage.setItem('filmNetwork', data[0].show.network.name);
                    }
                    
                    //Get Internet publisher
                    if (data[0].show.webChannel !== null){
                        localStorage.setItem('filmWebChannel', data[0].show.webChannel.name);
                    }

                    //Get genres
                    if (data[0].show.genres !== null) {
                        localStorage.setItem('filmGenres', data[0].show.genres);
                    }

                    window.location.replace("./SearchResults.html");
                }

                // Main API Response

                localStorage.setItem('filmTitle', data[0].show.name);
                localStorage.setItem('filmImage', data[0].show.image.medium);
                localStorage.setItem('filmSummary', data[0].show.summary);

                //Get rating
                if(data[0].show.rating !== null){
                    localStorage.setItem('filmRating', data[0].show.rating.average);
                }
                
                //Get Network
                if (data[0].show.network !== null){
                    localStorage.setItem('filmNetwork', data[0].show.network.name);
                }
                
                //Get Internet publisher
                if (data[0].show.webChannel !== null){
                    localStorage.setItem('filmWebChannel', data[0].show.webChannel.name);
                }

                //Get Recommended 1 Image
                if (data[1].show.image !== null){
                    localStorage.setItem('filmRecommend1', data[1].show.image.medium);
                }
                //Get Recommended 2 Image
                if (data[2].show.image !== null){
                    localStorage.setItem('filmRecommend2', data[2].show.image.medium);
                }

                //Get Recommended 3 Image
                if (data[3].show.image !== null){
                    localStorage.setItem('filmRecommend3', data[3].show.image.medium);
                }

                //Get genres
                if (data[0].show.genres !== null){
                    localStorage.setItem('filmGenres', data[0].show.genres);
                }

                
                window.location.replace("./SearchResults.html");

            }
        });
    });
});

//Testing GET REST API availability: From Dr. Haynes' tutorial on 4/23
$.ajax({
   type: 'GET',
   url: "http://127.0.0.1:4200/filmreviews",
   success: function(data){
       console.log("Successful call to get");
   } 
});


// Runs functions when page is loaded
$(document).ready(function(){
    loadReviewList();
});

//Load Existing Reviews onto the Reviews page
var reviewIDs = [];
var ratings = [];
var tot = 0;

function loadReviewList() {
    reviewIDs = [];
    ratings = [];
    $.ajax({
        url: "http://127.0.0.1:4200/filmreviews",
        success: function (data) {
            //Empty existing reviews list
            $('.reviewName').each(function(){
                $('.reviewName').empty();
                $('.reviewContent').empty();
                $('.rating-reviews').empty();
            });

            //Load reviews list
            var reviewList = document.getElementsByClassName("reviewName");
            var reviewContents = document.getElementsByClassName("reviewContent");
            var reviewRatings = document.getElementsByClassName("rating-reviews");
            for (var j=0; j<reviewList.length; j++){
                if(typeof(data[j].title) !== null){
                    reviewIDs.push(data[j]._id);
                    ratings.push(data[j].rating);
                    tot += parseInt(ratings[j]);
                    var reviewTitle = data[j].title;
                    var reviewContent = data[j].content;
                    var reviewRating = data[j].rating;
                    reviewList[j].innerHTML = reviewTitle;
                    reviewContents[j].innerHTML = reviewContent;
                    reviewRatings[j].innerHTML = reviewRating + "/10" + "<span class='fa fa-star checked-review'></span>";
                } else{
                    reviewList[j].innerHTML = "";
                    reviewContents[j].innerHTML = "";
                    reviewRatings[j].innerHTML = "";
                }
                //Updating Overall Rating Score
                document.getElementById("fraction").innerHTML = (tot/ratings.length).toFixed(2);
            }
            
        },
        error: function(data){
            alert("error" + data.error);
        }
    });
}

//Posting a new review to the DB
$(document).ready(function(){
    $("#reviewForm").submit(function(e){
        var newTitle = $('#userName').val();
        var newContent = $("#movieFeedback").val();
        var newMovie = $('#movieName').val();
        var newRating = $('#movieRating').val();
        e.preventDefault();
        var data = {};
        data.title = newTitle;
        data.content = newContent;
        data.movie = newMovie;
        data.rating = newRating;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://127.0.0.1:4200/filmreviews',
            success: function(data){
                document.getElementById("reviewForm").reset();
                window.location.replace("http://127.0.0.1:3000/reviews");
                $(document).ready(function(){
                    loadReviewList();
                });

            },
            error: function(data){
                alert("error" + data.error);
            }
        })
    });
})

// Edit Review fields functionality

// Help from https://stackoverflow.com/questions/10262393/javascript-add-input-element-to-current-div
$('.edit1').on('click', function(e){
    // e.preventDefault();
    console.log(reviewIDs[0]);

    document.getElementById('reviewName').innerHTML += "<input id='titleInput1' name='titleInput1'/>";
    document.getElementById('feedback').innerHTML += "<input id='contentInput1' name='contentInput1' />";

});

$('.edit2').on('click', function(e){
    // e.preventDefault();
    console.log(reviewIDs[1]);

    document.getElementsByClassName('reviewName2')[0].innerHTML += "<input id='titleInput2' name='titleInput2'/>";
    document.getElementsByClassName('feedback2')[0].innerHTML += "<input id='contentInput2' name='contentInput2' />";

});

$('.edit3').on('click', function(e){
    // e.preventDefault();
    console.log(reviewIDs[2]);

    document.getElementsByClassName('reviewName3')[0].innerHTML += "<input id='titleInput3' name='titleInput3'/>";
    document.getElementsByClassName('feedback3')[0].innerHTML += "<input id='contentInput3' name='contentInput3' />";

});

//Get text from input from https://stackoverflow.com/questions/4088467/get-the-value-in-an-input-text-box
//PUT request sample from https://stackoverflow.com/questions/31038132/ajax-put-with-jquery-to-mongodb

$(document).ready(function(){
    $(".submitReviewEdit").click(function(e){
        e.preventDefault();
        var data = {};
        data.title = $('#titleInput1').val();
        data.content = $('#contentInput1').val();
    
        $.ajax({
            type: "PUT",
            url: "http://127.0.0.1:4200/filmreviews/" + reviewIDs[0],
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data){
                location.reload();
            },
            error: function(data){
                alert("error" + data.error);
            }
        });
    });
});

$(document).ready(function(){
    $(".submitReviewEdit2").click(function(e){
        e.preventDefault();
        var data = {};
        data.title = $('#titleInput2').val();
        data.content = $('#contentInput2').val();
    
        $.ajax({
            type: "PUT",
            url: "http://127.0.0.1:4200/filmreviews/" + reviewIDs[1],
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data){
                location.reload();
            },
            error: function(data){
                alert("error" + data.error);
            }
        });
    });
});

$(document).ready(function(){
    $(".submitReviewEdit3").click(function(e){
        e.preventDefault();
        var data = {};
        data.title = $('#titleInput3').val();
        data.content = $('#contentInput3').val();
    
        $.ajax({
            type: "PUT",
            url: "http://127.0.0.1:4200/filmreviews/" + reviewIDs[2],
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data){
                location.reload();
            },
            error: function(data){
                alert("error" + data.error);
            }
        });
    });
});


//Deleting a Review from the Reviews Page

$(document).ready(function(){
    $(".deleteReview1").click(function(e){
        e.preventDefault();
    
        $.ajax({
            type: "DELETE",
            url: "http://127.0.0.1:4200/filmreviews/" + reviewIDs[0],
            contentType: "application/json",
            success: function(data){
                location.reload();
            },
            error: function(data){
                alert("error" + data.error);
            }
        });
    });
});

$(document).ready(function(){
    $(".deleteReview2").click(function(e){
        e.preventDefault();
    
        $.ajax({
            type: "DELETE",
            url: "http://127.0.0.1:4200/filmreviews/" + reviewIDs[1],
            contentType: "application/json",
            success: function(data){
                location.reload();
            },
            error: function(data){
                alert("error" + data.error);
            }
        });
    });
});

$(document).ready(function(){
    $(".deleteReview3").click(function(e){
        e.preventDefault();
    
        $.ajax({
            type: "DELETE",
            url: "http://127.0.0.1:4200/filmreviews/" + reviewIDs[2],
            contentType: "application/json",
            success: function(data){
                location.reload();
            },
            error: function(data){
                alert("error" + data.error);
            }
        });
    });
});






