(function() {
  $(function() {
    var $cartQty = $("#cart-quantity");
    var $favouritesQty = $("#favourite-quantity");
    var $cartTotal = $("#cart-total");

    var $viewCartBtn = $("#view-cart-btn");
    var $viewFavouriteBtn = $("#view-favourites-btn");
    var $addFavouriteBtn = $("#add-favourite-btn");
    var $addNotificationBtn = $("#add-notification-btn");
    var $addCartBtn = $("#add-cart-btn");

    var itemPrice = 12.99;

    // Save values to sessionStorage
    if (sessionStorage.length === 0) {
      sessionStorage.setItem("cartTotal", 0);
      sessionStorage.setItem("noOfCartItems", 0);
      sessionStorage.setItem("noOfFavourites", 0);
    }

    var noOfCartItems = parseInt(sessionStorage.getItem("noOfCartItems"));
    var noOfFavourites = parseInt(sessionStorage.getItem("noOfFavourites"));
    var cartTotal = parseFloat(sessionStorage.getItem("cartTotal"));

    $cartQty.text(noOfCartItems);
    $favouritesQty.text(noOfFavourites);
    $cartTotal.text(cartTotal);

    $addCartBtn.on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      noOfCartItems++;
      $cartQty.text(noOfCartItems);
      sessionStorage.setItem("noOfCartItems", noOfCartItems);

      cartTotal = cartTotal + itemPrice;
      cartTotal = Math.round(cartTotal * 100) / 100;
      $cartTotal.text(cartTotal);
      sessionStorage.setItem("cartTotal", cartTotal);

    });

    $addFavouriteBtn.on("click", function (e) {
      e.stopPropagation();
      noOfFavourites++;
      $favouritesQty.text(noOfFavourites);
      sessionStorage.setItem("noOfFavourites", noOfFavourites);
    });

  });
})()
