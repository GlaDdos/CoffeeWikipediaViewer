var searchItem = "";
$(document).ready(function(){

$(".search").hover(function(){$(".info").html("<h2>Search wiki.</h1>");}, function(){ $(".info").html("");});
$(".random").hover(function(){$(".info").html("<h2>Random wiki article.</h1>");}, function(){ $(".info").html("");});

  $(".search").on("click",function(){

    $(".random, .search").hide(300, function(){
      $('.searchField').show(300);
    });

  $('.ion-close-round').on("click", function(){
    $(".searchField").hide(300, function(){
      $(".artList").html("");
      $(".artList").remove();
      $(".container").css('height', '80vh');
      $(".random, .search").show(300);
    });
  });

$(".searchInput").keypress(function(key){
    searchItem = "";

    if(key.which == 13){

      $(".container").css('height', 'auto');

      searchItem = $(".searchInput").val();

      $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
          action: 'opensearch',
          search: searchItem,
        },
        dataType: 'jsonp',
        type: 'POST',
        headers: { 'Api-User-Agent': 'Example/1.0' },
        success:function(data){
          console.log(data);
          $(".artList").html("");
          $(".artList").remove();
          if(data[1].length === 0){
            $('body').append("<div class='artList' style='text-align: center'><h3>Couldn't find any results. Try something different.</h3></div>");
          }
            else{

              for(var i = 0; i < data[1].length; i++){
                $('body').append("<a href=" + data[3][i] + " target='_blank'>"+ "<div class='artList artList" + i +"'></div></a>");

                for(var j = 1; j < data.length - 1; j++){
                  $('a > .artList' + i + "").append("<h" + j + ">" + data[j][i] + "</h" + j + ">");
                }
              }
              data = 0;
            }

          }

      });

    }
    else {

    }
});


  });
});
