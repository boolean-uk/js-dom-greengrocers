document
  .getElementById("new-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);

    const newProduct = { id, name, price };

    // Retrieve existing products from local storage or set to an empty array if none exist
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the list
    products.push(newProduct);

    // Save the updated list to local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Redirect to the store page
    window.location.href = "index.html";
  });
