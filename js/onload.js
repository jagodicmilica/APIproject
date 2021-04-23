window.onload = function () {
    var searchInput = document.getElementById("search-input");
    var searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener('click', getMealList);
    function getMealList(searchPar) {
        var html = "";
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + searchInput.value)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.meals) {
                console.log('nema ');
                document.querySelector('.search-title').innerHTML = "Couldn't find anything";
            }
            else {
                document.querySelector('.search-title').innerHTML = "Search Results (" + data.meals.length + ") :";
                data.meals.forEach(function (meal) {
                    html += "<div class=\"meal-item\" data-id = \"" + meal.idMeal + "\">\n                            <div class=\"img\">\n                                <img src=\"" + meal.strMealThumb + "\" alt=\"img\">\n                            </div>\n                            <div class=\"name\">\n                                <h3>" + meal.strMeal + "</h3>\n                                <a href=\"#\" class=\"recipe-btn btn\">Get Recipe</a>\n                            </div>\n                        </div>";
                });
            }
            document.querySelector('.meal-list').innerHTML = html;
        });
    }
};
//# sourceMappingURL=onload.js.map