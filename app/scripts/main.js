(function() {
  $(function() {
    var $cartQty = $("#cart-quantity");
    var $favouritesQty = $("#favourite-quantity");
    var $cartTotal = $("#cart-total");
    var $itemPrice = $("#item-price");

    var $viewCartBtn = $("#view-cart-btn");
    var $viewFavouriteBtn = $("#view-favourites-btn");
    var $addFavouriteBtn = $("#add-favourite-btn");
    var $addNotificationBtn = $("#add-notification-btn");
    var $addCartBtn = $("#add-cart-btn");

    var $cartOverlay = $("#cart-overlay");
    var $closeOverlay = $(".close-overlay");
    var $cartItems = $("#cart-items");

    var $favouritesOverlay = $("#favourites-overlay")
    var $favouritetItems = $("#favourite-items");

    var itemPrice = parseFloat($itemPrice.text());

    if (sessionStorage.length === 0) {
      sessionStorage.setItem("cartTotal", 0);
      sessionStorage.setItem("noOfCartItems", 0);
      sessionStorage.setItem("noOfFavourites", 0);
    }

    var noOfCartItems = parseInt(sessionStorage.getItem("noOfCartItems"));
    var noOfFavourites = parseInt(sessionStorage.getItem("noOfFavourites"));
    var cartTotal = parseFloat(sessionStorage.getItem("cartTotal"));

    function isCartEmpty () {
      if (noOfCartItems > 0) {
        $cartQty.removeClass("hide");
      } else {
        $cartQty.addClass("hide");
      }
    }

    function isFavouritesEmpty () {
      if (noOfFavourites > 0) {
        $favouritesQty.removeClass("hide");
      } else {
        $favouritesQty.addClass("hide");
      }
    }

    function updateCartTotal (cTotal) {
      cartTotal = Math.round(cTotal * 100) / 100;
      if (cartTotal < 0) cartTotal = 0;
      $cartTotal.text(cartTotal);
      sessionStorage.setItem("cartTotal", cartTotal);
    }

    isCartEmpty();
    isFavouritesEmpty();

    if(noOfCartItems > 0) {
      for(var i = 0; i < noOfCartItems; i++) {
        $cartItems.append("<li class='cart-item'>Lorem Ipsum<span class='remove' id='remove'>Remove</span></li>");
      }
    }

    if(noOfFavourites > 0) {
      for(var i = 0; i < noOfFavourites; i++) {
        $favouritetItems.append("<li class='favourite-item'>Lorem Ipsum</li");
      }
    }

    $cartQty.text(noOfCartItems);
    $favouritesQty.text(noOfFavourites);
    $cartTotal.text(cartTotal);

    $addCartBtn.on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      noOfCartItems++;
      isCartEmpty();
      $cartQty.text(noOfCartItems);
      $cartItems.append("<li class='cart-item'>Lorem Ipsum<span class='remove' id='remove'>Remove</span></li>");
      sessionStorage.setItem("noOfCartItems", noOfCartItems);

      cartTotal = cartTotal + itemPrice;
      //cartTotal = Math.round(cartTotal * 100) / 100;
      updateCartTotal(cartTotal);

    });

    $addFavouriteBtn.on("click", function (e) {
      e.stopPropagation();
      noOfFavourites++;
      isFavouritesEmpty();
      $favouritesQty.text(noOfFavourites);
      $favouritetItems.append("<li class='favourite-item'>Lorem Ipsum</li");
      sessionStorage.setItem("noOfFavourites", noOfFavourites);
    });

    $viewCartBtn.on("click", function () {
      $cartOverlay.toggleClass("show");
      $("body,html").addClass("no-scroll");
    });

    $viewFavouriteBtn.on("click", function() {
      $favouritesOverlay.toggleClass("show");
      $("body,html").addClass("no-scroll");
    });

    $closeOverlay.on("click", function () {
      $(this).parent().toggleClass("show");
      $("body,html").removeClass("no-scroll");
    });

    $cartOverlay.on("click", "#remove", function () {
      $(this).parent().remove()
      noOfCartItems--;
      isCartEmpty();
      $cartQty.text(noOfCartItems);
      sessionStorage.setItem("noOfCartItems", noOfCartItems);
      cartTotal = cartTotal - itemPrice;
      updateCartTotal(cartTotal);
    });

  });
})()
