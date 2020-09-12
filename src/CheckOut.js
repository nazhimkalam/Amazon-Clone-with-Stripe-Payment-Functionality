import React from 'react';
import { useStateValue } from './StateProvider';
import CheckOutProduct from './CheckOutProduct';
import './Checkout.css';
import Subtotal from './Subtotal';

function CheckOut() {
	const [{ basket }] = useStateValue();
	return (
		<div className="checkout">
			<div className="checkout__left">
				<img
					className="checkout__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
					alt="ad"
				/>
				{
					// the '?' in  basket?.length means optional, only if available then do
					basket?.length === 0 ? (
						<div>
							<h2>Your Basket Is Empty</h2>
							<p>
								You have no items in your basket. To buy items 'click' the 'Add to basket' button on a
								product of your choice
							</p>
						</div>
					) : (
						<div>
							<h2 className="checkout__title">Your Shopping Basket</h2>

							{/* Listing out all of the checkout products */}
							{basket.map((item) => (
								<CheckOutProduct
									id={item.id}
									title={item.title}
									image={item.image}
									price={item.price}
									rating={item.rating}
								/>
							))}
						</div>
					)
				}
			</div>
			{basket.length > 0 && (
				<div className="checkout__right">
					<Subtotal />
				</div>
			)}
		</div>
	);
}

export default CheckOut;
