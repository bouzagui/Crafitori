import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';  // Import React Router hook

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();  // Create navigate instance for routing

  // Calculate total price for each item and grand total
  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price) || 0;
    return price * item.quantity;
  };

  const calculateGrandTotal = () => {
    return cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  };

  const handleProceedToPayment = () => {
    const totalAmount = calculateGrandTotal();  // Get the total amount
    navigate('/payment', { state: { totalAmount } });  // Pass the total amount to payment page
  };

  return (
    <div className="container text-text mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  {/* Image Column */}
                  <td className="py-2 px-4 text-center">
                    <img
                      src={item.images[0]?.image}
                      alt={item.title}
                      className="w-[80px] h-[80px] object-contain"
                    />
                  </td>

                  {/* Product Name Column */}
                  <td className="py-2 px-4 text-center">{item.name}</td>

                  {/* Price Column */}
                  <td className="py-2 px-4 text-center">${parseFloat(item.price).toFixed(2)}</td>

                  {/* Quantity Column */}
                  <td className="py-2 px-4 text-center">{item.quantity}</td>

                  {/* Total Price Column */}
                  <td className="py-2 px-4 text-center">${calculateItemTotal(item).toFixed(2)}</td>

                  {/* remove button */}
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className='text-red-700 px-4'>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Grand Total */}
          <div className="text-right mt-4">
            <p className="text-xl font-semibold">
              Grand Total: ${calculateGrandTotal().toFixed(2)}
            </p>
          </div>

          {/* Proceed to Payment Button */}
          <div className="text-right mt-4">
            <button 
              onClick={handleProceedToPayment}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
