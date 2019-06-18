    let app_key = '8b0da9158df77edc612feef9e21d8b7f';
    let app_id = 'dd2f8137';
    let from = 0;
    let to = 25;
    let recipeSearch = document.getElementById('tbRecipeSearch');
    let loader = document.getElementById('loader');

    let card_elements = [];

    function apiCall(appending){
        if (recipeSearch.value.length > 1) {    
            let q = "https://api.edamam.com/search?q=" + recipeSearch.value;
            let num_results = "&from=" + from + "&to=" + to;
            let num_ingredients =  document.getElementById('tbNumIngredients') ? "&ingr=" 
                +  document.getElementById('tbNumIngredients') : "";
            let url =  q + "&app_id=" + app_id + "&app_key=" + app_key + num_results + num_ingredients;
            
            loader.innerHTML = "<img src='https://media3.giphy.com/media/sSgvbe1m3n93G/200w.webp?cid=790b76115ced8e3e567842422e986b52&rid=200w.webp' alt='loader'>";
            
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                loader.innerHTML = "";
                hits = data['hits'];
                recipes = document.getElementById('recipes');
                if (!appending)
                    recipes.removeChild(recipes.firstChild);
                for (let i = 0; i < hits.length; i++){
                    recipes.innerHTML += 
                    `<div class='card-body'>
                        <div class="test">
                            <i class="fas fa-heart fa-3x"></i>
                        </div>
                        <img src='${hits[i]['recipe']['image']}' class='card-img-top' alt=''  onclick='window.location = "${hits[i]['recipe']['url']}"'>
                        <h5 class='card-title'>  ${hits[i]['recipe']['label']} </h5>
                        <p>Ingredients:   ${hits[i]['recipe']['ingredients'].length}</p>
                    </div>`
                }
                card_elements = document.getElementsByClassName('card-body');
                from += 25;
                to += 25;
            });
        } else {
            
        }
    }

    function user_like(){
        
    }
      
    document.addEventListener('click', e => {
        if (e.target.className.indexOf('fa-heart') > -1){
            if (e.target.className.indexOf('red') === -1){
                user_like();
                e.target.className += ' red';
            }
            else {
                user_unlike();
                e.target.className = 'fas fa-heart fa-3x';
            }
        }
    });
  

    //on change
     recipeSearch.addEventListener('change', e => {
        apiCall(false);
    });
    //on click
    document.getElementById('btnRecipeSearch').addEventListener('click', e => {
        apiCall(false);
    });
    //on enter
    recipeSearch.addEventListener('keyup', e => {
        if (e.keyCode === 13){
            e.preventDefault();
            apiCall(false);
        }
    });
    ////on scroll to bottom
    window.onscroll = e => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) 
            apiCall(true);
    };

    //ToTop button
    document.getElementById('toTop').addEventListener('click', e => {
        window.scrollTo(0, 0);
    });

  
 

