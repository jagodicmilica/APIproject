window.onload=function(){
    let searchInput:HTMLInputElement = document.getElementById("search-input") as HTMLInputElement;
    let searchBtn = document.getElementById("search-btn");


    searchBtn.addEventListener('click',getMealList)


function getMealList(searchPar){
    let html ="";
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(!data.meals){
            console.log('nema ')
            document.querySelector('.search-title').innerHTML = "Couldn't find anything"
        }else{
            document.querySelector('.search-title').innerHTML = `Search Results (${data.meals.length}) :`
            data.meals.forEach(meal => {
                html+=`<div class="meal-item" data-id = "${meal.idMeal}">
                            <div class="img">
                                <img src="${meal.strMealThumb}" alt="img">
                            </div>
                            <div class="name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn btn">Get Recipe</a>
                            </div>
                        </div>`
            });
        }
        document.querySelector('.meal-list').innerHTML = html;
    })
}
}
