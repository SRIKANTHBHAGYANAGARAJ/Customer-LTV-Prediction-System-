import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  const { id, title, image, price, amount } = item;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-white/20 w-full text-white">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* Product image with link to details */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>

        <div className="w-full flex flex-col">
          {/* Product title and remove action */}
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px]
                         text-white hover:underline"
            >
              {title}
            </Link>

            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer text-white
                         hover:text-red-400 transition"
            >
              <IoMdClose />
            </div>
          </div>

          {/* Quantity control and pricing */}
          <div className="flex gap-x-3 h-[36px] text-sm items-center">
            <div
              className="flex flex-1 max-w-[110px] items-center h-full
                         border border-white/40 rounded
                         text-white font-medium"
            >
              <div
                onClick={() => decreaseAmount(id)}
                className="h-full flex-1 flex justify-center items-center
                           cursor-pointer hover:bg-white/10 transition"
              >
                <IoMdRemove />
              </div>

              <div className="h-full flex justify-center items-center px-2 text-white">
                {amount}
              </div>

              <div
                onClick={() => increaseAmount(id)}
                className="h-full flex-1 flex justify-center items-center
                           cursor-pointer hover:bg-white/10 transition"
              >
                <IoMdAdd />
              </div>
            </div>

            <div className="flex flex-1 justify-center items-center text-white">
              ₹{price}
            </div>

            <div
              className="flex flex-1 justify-end items-center
                            text-white font-semibold"
            >
              ₹{parseFloat(price * amount).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
