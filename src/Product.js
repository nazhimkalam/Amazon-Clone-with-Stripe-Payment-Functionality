import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
	const [{ user }, dispatch] = useStateValue();

	const addToBasket = () => {
		// adding Item into basket
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};

	return (
		<div className="product">
			<div className="product__info">
				<p>{title}</p>
				<p className="product__price">
					<strong>${price}</strong>
				</p>

				<div className="product__rating">
					{Array(rating)
						.fill()
						.map((loop) => (
							<p>⭐</p>
						))}
				</div>
			</div>

			<img src={image} className="product__Image" alt="iphone 11" />
			<button disabled={!user && true} onClick={addToBasket}>
				Add to basket
			</button>
		</div>
	);
}

export default Product;
