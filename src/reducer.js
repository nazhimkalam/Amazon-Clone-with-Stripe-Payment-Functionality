export const initialState = {
	basket: [],
	user: null,
};

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0); // 0 means the starting amount is set to 0

function reducer(state, action) {
	console.log(state); // display the contents inside the initialState
	console.log(action); // display the action contents

	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};
		case 'ADD_TO_BASKET':
			// Logic for adding items into the basket
			return { ...state, basket: [...state.basket, action.item] }; // adding the previous items with the new one
		case 'REMOVE_FROM_BASKET':
			// Logic for removing item from basket
			let newBasket = [...state.basket]; // copying the vales of the current basket into a new array

			// finding the index of the element to be removed from the basket array
			const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

			if (index >= 0) {
				// item exists in the basket and we can remove it
				newBasket.splice(index, 1); // 1 means to delete only 1 item at that index, splice is a method to remove element from the array
			} else {
				console.warn(`Can't find product with the given id ${action.id}`);
			}

			return { ...state, basket: newBasket };
		default:
			return state;
	}
}

export default reducer;
