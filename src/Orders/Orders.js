import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
import Order from '../Order/Order';
import { useStateValue } from '../StateProvider';
import './Orders.css';

function Orders() {
	const [{ basket, user }, dispatch] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.orderBy('created', 'desc')
				.onSnapshot((snapshot) =>
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
		}else{
            setOrders([])
        }
	}, [user]);

	return (
		<div className="orders">
			<h1>Your orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order 
                        order = {order}
                    />
                ))}
            </div>
		</div>
	);
}

export default Orders;
