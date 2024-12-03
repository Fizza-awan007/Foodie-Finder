const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const searchbtn = document.getElementsByClassName("search-btn");
const recipeCont = document.getElementById("container-recipe");
const searchInput = document.getElementById("search");
const footer = document.querySelector("footer");
const allTextElements = document.querySelectorAll("h1, p");

const getFacts = async (inputVal = "") => {
  inputVal ? inputVal : "";
  //   recipeCont.innerHTML = "";

  console.log("The input value has changed. The new value is: " + inputVal);
  let response = await fetch(`${URL}${inputVal}`); // Await the fetch call to handle the response properly
  const resJson = await response.json();

  console.log(resJson);
  if (resJson?.meals?.length > 0) {
    recipeCont.innerHTML = "";

    resJson.meals.forEach((meal) => {
      let mealBox = document.createElement("div");
      mealBox.className = "meal-box";

      //console.log(recipeCont, mealBox);

      let img = document.createElement("img");
      img.src = meal.strMealThumb;
      img.alt = meal.strMeal;
      // console.log(meal.strMealThumb);

      let mealName = document.createElement("h3");
      mealName.innerHTML = meal.strMeal;

      recipeCont.appendChild(mealBox);
      mealBox.appendChild(img);
      mealBox.appendChild(mealName);

      mealBox.addEventListener("click", () => showMealDetails(meal));
    });
  } else {
    console.error("error---", response);
  }
  //   console.log(); // Log the JSON data from the response
};

getFacts();

const showMealDetails = (meal) => {
  // Hide other elements
  recipeCont.style.display = "none";
  document.querySelector(".search-container").style.display = "none";
  document.querySelector(".search-btn").style.display = "none";
  footer.style.display = "none";
  allTextElements.forEach((el) => (el.style.display = "none")); // Hide all h1, p elements

  // Create meal detail container
  const detailContainer = document.createElement("div");
  detailContainer.className = "meal-detail-container";

  const detailContent = document.createElement("div");
  detailContent.className = "meal-detail-content";

  // Left section (image)
  const leftDiv = document.createElement("div");
  leftDiv.className = "left";

  const mealImage = document.createElement("img");
  mealImage.src = meal.strMealThumb;
  mealImage.alt = meal.strMeal;

  leftDiv.appendChild(mealImage);

  // Right section (details)
  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  const mealTitle = document.createElement("h2");
  mealTitle.textContent = meal.strMeal;

  const category = document.createElement("p");
  category.innerHTML = meal.strCategory;

  const instructions = document.createElement("p");
  instructions.innerHTML = meal.strInstructions;

  // Ingredients and Quantities Section
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients and Quantities:";

  const ingredientsList = document.createElement("ul");
  for (let i = 0; i < 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && measure) {
      const li = document.createElement("li");
      li.innerHTML = `${measure} ${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }

  rightDiv.appendChild(mealTitle);
  rightDiv.appendChild(category);
  rightDiv.appendChild(instructions);
  rightDiv.appendChild(ingredientsTitle);
  rightDiv.appendChild(ingredientsList);

  detailContent.appendChild(leftDiv);
  detailContent.appendChild(rightDiv);

  // Back button
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Recipes";
  backButton.className = "back-button";
  backButton.addEventListener("click", () => {
    detailContainer.remove();
    recipeCont.style.display = "flex";
    document.querySelector(".search-container").style.display = "block";
    footer.style.display = "block";
    allTextElements.forEach((el) => (el.style.display = "block"));
  });

  detailContainer.appendChild(detailContent);
  detailContainer.appendChild(backButton);

  document.body.appendChild(detailContainer);
};
