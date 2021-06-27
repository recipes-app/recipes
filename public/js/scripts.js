/*!
 * Start Bootstrap - Shop Homepage v5.0.1 (https://startbootstrap.com/template/shop-homepage)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener("DOMContentLoaded", () => {
  new FroalaEditor(".html-editor");
});

$(document).ready(function () {
  $("#framework").multiselect({
    nonSelectedText: "Select Framework",
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    buttonWidth: "400px",
  });
});
