/*!
 * Start Bootstrap - Shop Homepage v5.0.1 (https://startbootstrap.com/template/shop-homepage)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

$(document).ready(function () {
  new FroalaEditor(".html-editor");
  new Choices("#keywords-select", {
    removeItemButton: true,
    maxItemCount: 5,
    searchResultLimit: 5,
    renderChoiceLimit: 5,
  });

  const addIngredient = document.querySelector("#add-ingredient");
  if (addIngredient) {
    addIngredient.addEventListener("click", () => {
      const ingredients = document.querySelector("#ingredients");
      const totalIngredients = document.querySelectorAll(
        "#ingredients .ingredient"
      ).length;

      const ingredient = document
        .querySelector("#ingredients .ingredient")
        .cloneNode(true);

      const name = ingredient.querySelector(".ingredient-name");
      name.name = `ingredients[${totalIngredients}][name]`;
      name.value = "";

      const amount = ingredient.querySelector(".ingredient-amount");
      amount.name = `ingredients[${totalIngredients}][amount]`;
      amount.value = "";

      const unit = ingredient.querySelector(".ingredient-unit");
      unit.name = `ingredients[${totalIngredients}][unit]`;
      unit.value = "";

      ingredients.append(ingredient);
    });
  }

  /*const deleteIngredient = document.querySelector('#delete-ingredient');
  if (deleteIngredient) {
    deleteIngredient.addEventListener('click', () => {
      
      const ingredients = document.querySelector('#ingredients')
      const totalIngredients = document.querySelectorAll('#ingredients .ingredient').length;
      
      const ingredient = document.querySelector('#ingredients .ingredient').Node.removeChild(true);
      ingredient.querySelector('.ingredient-name').name = `ingredients[${totalIngredients}][name]`;
      ingredient.querySelector('.ingredient-amount').name = `ingredients[${totalIngredients}][amount]`;
      ingredient.querySelector('.ingredient-unit').name = `ingredients[${totalIngredients}][unit]`;

      ingredients.remove(ingredient)
    })
  }*/
});
