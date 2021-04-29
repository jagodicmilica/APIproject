window.onload = function () {
    var searchInput = document.getElementById("search-input");
    var searchBtn = document.getElementById("search-btn");
    var radioBtns = document.querySelectorAll('input[name="search"]');
    searchBtn.addEventListener('click', getMealList);

    function getMealList() {
        var searchBy = "";
        for(const rb of radioBtns){
            if(rb.checked){
                searchBy = rb.value;
                break;
            }
        }
        if(searchBy === "c" || searchBy === "i"){
            fetch("https://www.themealdb.com/api/json/v1/1/filter.php?" + searchBy + "=" + searchInput.value)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                showSearchResult(data);
            })
        }else if(searchBy === "name"){
            fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput.value)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            showSearchResult(data);
        })
        }

    }
    function showSearchResult(data){
        var html = "";
        if (!data.meals) {
            document.querySelector('.search-title').innerHTML = "Couldn't find anything";
        }
        else {
            document.querySelector('.search-title').innerHTML = "Search Results (" + data.meals.length + ") :";
            data.meals.forEach(function (meal) {
                html += "<div class=\"meal-item\" data-id = \"" + meal.idMeal + "\">\
                            <div class=\"img\">\<img src=\"" + meal.strMealThumb + "\" alt=\"img\">\</div>\
                            <div class=\"name\">\
                                <h3>" + meal.strMeal + "</h3>\
                                <button class=\"recipe-btn btn\" onclick = \"showRecipe("+meal.idMeal+")\">Get Recipe</button>\
                            </div>\
                        </div>";
            });
        }
        document.querySelector('.meal-list').innerHTML = html;
    }
}
function showRecipe(mealId){
    var innerHtml = "";
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
    .then(function (response) { return response.json(); })
    .then(function (data) {
        var details = data.meals[0];
        var ingredients ="";
        var measure = "";
        for (const property in details) {
            if(property.includes('strIngredient') && details[property]){
                ingredients += "<p>"+details[property]+"</p>"
               
            }else if(property.includes('strMeasure') && details[property]){
                measure += "<p>"+details[property]+"</p>"
            }
          }
        innerHtml = "<h2>"+details.strMeal+"</h2>\
                     <div id = \"close\" onclick = \"closeRecipe()\"></div>\
                     <img src=\""+details.strMealThumb+"\">\
                     <div class=\"description\">\
                        <div class=\"ingredients\">"+ingredients+"</div>\
                        <div class=\"mesure\">"+measure+"</div>\
                    </div>\
                    <div class=\"instructions\">"+details.strInstructions+"</div>\
                    <div><a href=\""+details.strYoutube+"\">Show video</a></div>"
                    document.getElementById("recipe-pop-out").innerHTML = innerHtml;
                    document.getElementById("recipe-pop-out").style.display ="unset" ;
                    document.getElementById('container').style.pointerEvents = "none"
                    document.getElementById('container').style.opacity = "70%"
        
})
}
function closeRecipe() {
    var recipeDiv = document.getElementById("recipe-pop-out");
    recipeDiv.innerHTML = "";
    recipeDiv.style.display = "none";
    document.getElementById('container').style.pointerEvents = "unset";
    document.getElementById('container').style.opacity = "100%";
}