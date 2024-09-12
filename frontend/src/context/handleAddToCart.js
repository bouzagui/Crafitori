export const handleAddToCart = (product, quantity, addToCart) => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
    } else {
      console.error("Invalid product or quantity.");
    }
  };