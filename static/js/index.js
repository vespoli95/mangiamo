    let app_key = '8b0da9158df77edc612feef9e21d8b7f';
    let app_id = 'dd2f8137';
    let from = 0;
    let to = 25;
    let recipeSearch = document.getElementById('tbRecipeSearch');
    let loader = document.getElementById('loader');
    let user_id = document.getElementById('user_id');

    let card_elements = [];
    let num_of_ingredients = '';

    function apiCall(appending){
        if (recipeSearch.value.length > 1) {    
            let q = "https://api.edamam.com/search?q=" + recipeSearch.value;
            let num_results = "&from=" + from + "&to=" + to;
            let num_ingredients = num_of_ingredients  == '' ? '' : ("&ingr=" + num_of_ingredients);
            let url =  q + "&app_id=" + app_id + "&app_key=" + app_key + num_results + num_ingredients;
            console.log("num: ", num_of_ingredients)

            loader.innerHTML = "<img src='https://media3.giphy.com/media/sSgvbe1m3n93G/200w.webp?cid=790b76115ced8e3e567842422e986b52&rid=200w.webp' alt='loader'>";
            console.log("URL: ", url);
            fetch(url)
            .then((res) => res.json())
            .then((data) => {                
                let isGenerating = true;
                loader.innerHTML = "";
                hits = data['hits'];
                recipes = document.getElementById('recipes');
                if (!appending){
                    from = 0;
                    to = 25;
                    recipes.innerHTML = "";
                }
                // recipes.removeChild(recipes.firstChild);
                for (let i = 0; i < hits.length; i++){
                    let isLiked = false;
                    console.log(user_id);
                    let _body = {
                        'user_id': user_id ? user_id.innerText : '',
                        'url': `${hits[i]['recipe']['url']}`
                    };
                    fetch('/isLiked', {       
                        method: 'POST',
                        body: JSON.stringify(_body),
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).then(response => response.text())
                    .then(data => {
                        isLiked = data === 'True' ? true : false;
                        recipes.innerHTML += 
                        `<div class='card-body'>
                            <input type="hidden" value=${hits[i]['recipe']['url']} />
                            <i class="fas fa-heart fa-3x like_button ${isLiked ? 'red' : ''}"></i>
                            <img src='${hits[i]['recipe']['image']}' class='card-img-top' alt=''  onclick='window.location = "${hits[i]['recipe']['url']}"'>
                            <h5 class='card-title'> ${hits[i]['recipe']['label']} </h5>
                            <p>Ingredients: ${hits[i]['recipe']['ingredients'].length}</p>
                        </div>`
                    });
                }
                isGenerating = false;
                from += 25;
                to += 25;
            });
        } else {
            
        }
    }

    function postData(_user_id, element, isLike){
        if (isLike){
            let data = {
                'user_id': _user_id,
                'url': element.target.parentElement.children[0].value,
                'image': element.target.parentElement.children[2].currentSrc,
                'label': element.target.parentElement.children[3].innerText,
                'num_of_ingredients': element.target.parentElement.children[4].innerText.substring(element.target.parentElement.children[4].innerText.length - 1),
                'query': recipeSearch.value.trim(),
                'isLike': isLike
            };
            fetch('/like', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                dataType: 'text/plain',
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
        } else {
            let data = {
                'user_id': _user_id,
                'url': element.target.parentElement.children[0].value,
                'isLike': isLike
            };
            fetch('/like', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                dataType: 'text/plain',
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
        }
        // .then(response => response.json())
        // .then(res => {
        //     if (res.val === 'Error')
        //         console.log(element);

        // });
        // parses JSON response into native Javascript objects 
    }
      
    document.addEventListener('click', e => {
        if (e.target.className.indexOf('like_button') > -1){
            if (user_id){
                if (e.target.className.indexOf('red') === -1){
                    console.log(e);
                    postData(user_id.text, e, true);
                    e.target.className += ' red';                    
                }
                else {
                    postData(user_id.text, e, false);
                    e.target.className = 'fas fa-heart fa-3x like_button';
                }
            } else
                e.target.innerHTML = '<p style="color:black;font-size: small">Must be logged in to like.</p>';
        } else if (e.target.className.indexOf('divNumIngredients') > -1){
            //on click, if block isn't selected, make it selected
            if (e.target.className.indexOf('chosen') == -1){
                document.querySelectorAll('.divNumIngredients').forEach(
                    el => {
                        if (el !== e && el.className.indexOf('chosen') > -1)
                            el.className = 'divNumIngredients';
                    }
                )
                num_of_ingredients = e.target.firstElementChild.innerText;
                apiCall(false);
                e.target.className += ' chosen';
                
            }
            else e.target.className = 'divNumIngredients';          
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
    recipeSearch.addEventListener('keypress', e => {
        if (e.keyCode == 13){            
            e.preventDefault();
            apiCall(false);
            return false
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

   