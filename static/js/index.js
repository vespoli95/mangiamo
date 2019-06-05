$(document).ready(function(){
    let app_key = '8b0da9158df77edc612feef9e21d8b7f';
    let app_id = 'dd2f8137';
    let from = 0;
    let to = 25;

    function apiCall(appending){

        if ($('#tbRecipeSearch').val().length > 1) {
    
            let q = "https://api.edamam.com/search?q=" + $('#tbRecipeSearch').val();
            let num_results = "&from=" + from + "&to=" + to;
            let num_ingredients = $('#tbNumIngredients').val() ? "&ingr=" + $('#tbNumIngredients').val() : "";
    
            let url =  q + "&app_id=" + app_id + "&app_key=" + app_key + num_results + num_ingredients;
            
            $('#loader').empty().append("<img src='https://media3.giphy.com/media/sSgvbe1m3n93G/200w.webp?cid=790b76115ced8e3e567842422e986b52&rid=200w.webp' alt='loader'>")
            // fetch(url)
            // .then((res) => res.json())
            // .then((data) => {
            //     hits = data['hits'];
            //     console.log(hits);
            //     recipes = document.querySelector('#recipes');
            //     if (!appending)
            //         recipes.removeChild();
            //     //console.log(recipes);
            // });

            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: function(result){
                    //$('#loader').empty();
                    data = result['hits'];
                    if (!appending)
                        $('#recipes').empty();
                    for (let i = 0; i < data.length; i++){
                        $('#recipes').append("<div class='card-body'"
                            + "onclick='window.location = \"" + data[i]['recipe']['url'] + "\"'>"
                            + "<img src='" + data[i]['recipe']['image'] + "' class='card-img-top' alt=''>"
                            + "<h5 class='card-title'>" + data[i]['recipe']['label'] + "</h5>"
                            + "<p>Ingredients: " + data[i]['recipe']['ingredients'].length + "</p>"
                            + "</div>");
                    }
                    from += 25;
                    to += 25;
                }, error: function(){
                    alert('There was an error, please refresh.');
                }
             });
        } else {
            
        }
    }
    //on change
    $('#tbRecipeSearch').on('change', function(){
        apiCall(false);
    });
    //on click
    $('#btnRecipeSearch').on('click', function(){
        apiCall(false);
    });
    //on enter
    $('#tbRecipeSearch').on('keyup', function(e){
        if (e.keyCode === 13){
            e.preventDefault();
            apiCall(false);
        }
    })
    //on scroll to bottom
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            apiCall(true);
        }
        
    });
});