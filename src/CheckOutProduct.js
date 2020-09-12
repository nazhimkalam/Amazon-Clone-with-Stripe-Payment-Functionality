import React from 'react';
import './CheckOutProduct.css';
import { useStateValue } from './StateProvider';

function CheckOutProduct({ id, title, image, rating, price, hideButton }) {
	const [{ basket }, dispatch] = useStateValue();
	const removeItemFromBasket = () => {
		// remove item from basket
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id,
		});
	};
	return (
		<div className="checkoutProduct">
			<img className="checkoutProduct__image" src={image} alt="item" />

			<div className="checkoutProduct__info">
				<p className="checkoutProduct__title">{title}</p>
				<p className="checkoutProduct__price">
					<strong>${price}</strong>
				</p>
				<div className="checkoutProduct__rating">
					{Array(rating)
						.fill()
						.map((x) => (
							<p>⭐</p>
						))}
				</div>
				{!hideButton && <button onClick={removeItemFromBasket}>Remove from basket</button>}
			</div>
		</div>
	);
}

export default CheckOutProduct;
