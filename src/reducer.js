// This is where the data layer logic goes

export const initialState = {
	basket: [],
	user: null
	// the data layer in the beginning is a basket with an empty array --> basket :[] ;

	// items will get added to it by the user

	// This is similar to the empty array, that is used in the constructor,
	// as a placeholder for incoming api data is being expected

	// To test whether the context api is working. Comment out the above 'basket:[]'
	// Uncomment the below basket
	// basket: ["bread", "meat"]
	// This basket has two items, therefore if the context api is working
	// then, on the page, it should display the number 2 next to the basket.

	// Or uncomment the below basket
	// basket: ["bread", "meat", "pizza"]
	// This basket has three items, therefore if the context api is working
	// then, on the page, it should display the number 3 next to the basket.
};

export const getBasketTotal = (basket) =>
	// create a constant called getBasketTotal;
	// this constant has a parameter which is the actual shopping basket

	basket?.reduce((amount, item) => item.price + amount, 0);

// take the basket and return a reduce fuction
// reduce is a function that has two paramaters
// The first parameter is an amount (the price of the item)
// The second parameter is item (the item-object that you reiterate through the basket)

// add the price of the item to the original amount
// the orignal amount starts at 0
// increment all the prices of items in the basket

// After all that is done the constant will get automaticaly exported
// and it will be imported it into the subTotal.js ( --> CurrencyFormat -->value )

const reducer = (state, action) => {
	// The constant reducer stores a function that has the two parameter state and action.
	// We refer to the data layer as state; so anything inside the data layer is known as state.
	// We manipulate the data layer with actions; such as: add item to basket, remove item from basket,etc

	// console.log(action);
	// console log the items that are clicked on
	// this is to check that the click function is working
	// When the button is clicked, it should output the items object and properties in the browsers console

	switch (action.type) {
		// switch stores an action, and the 'type' of that action
		// switch also checks all the cases (strings that represent a specific action )

		case "SET_USER":
			return {
				...state,
				user: action.user
			};

		case "ADD_TO_BASKET":
			// This  first case "ADD_TO_BASKET" represent the action of adding an item to the basket
			// Here we Logic for adding item to basket

			return {
				// After the item, that has been clicked on, is added to the basket, return:

				...state, // Return whatever the state currently is [line 4]
				// If you had other properties, then this is where you insert all your properties this is similar to how you declare state in the constructor and then set.state in componentDidMount

				basket: [...state.basket, action.item]
				// Return a new basket that's going to contain:
				// The current basket (whatever items were left over) + action.item (the item that was just picked)
				// So if you picked one item, then the new basket will contain: the 4 leftover items + the item that was previously picked. Which will be a total of 5 items.

				// (action.item gets the data points that we asked from in the addtobasket function )
			};
		// break; // this break signifies that the case logic is finished

		case "REMOVE_FROM_BASKET": // this second case "REMOVE_FROM_BASKET" represent the action of removing an item to the basket
			// Below is the Logic for removing item from basket

			let newBasket = [...state.basket];

			// let new basket equal whatever the current basket is.
			// Here we are simply cloning the basket, into our own variable which is: newBasket.

			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);

			// Whenever an items whose remove button was just pressed
			// the removeFromBasket function (in CheckoutProduct.js)
			// dispatches the id of that item.

			// This dispatching is formally identified as an 'action'.
			// And the thing being dispatched is the item's ID.
			// To highlight that this dispatching is an action,
			// we are going to call the id of the items that's been dispatched --> action.id.

			// So, when the action.id is dispatched:
			// [a] get the dispatched id (action.id) of the item whose remove button was just pressed.
			// [b] Check to see if the id of this item, is equivalent to the id of any item that are currently in the basket

			if (index >= 0) {
				// if the index is greater than or equal to 0 [this means that there are items in the basket]
				newBasket.splice(index, 1);
				// then get the newbasket (which is the constant that stores our actual basket),
				// and find the index (within the basket) where you found the action.id, and then splice (cut out) the item associated with that id
			} else {
				// otherwise produce the console warning
				console.warn(
					`Cant remove product (id: ${action.id}) as its not in the basket`
				);
			}
			return {
				...state,
				// then return the state
				basket: newBasket
				// set the basket to the new basket
				// Hence, the basket now will return the updated items after the item removal.
			};
		// break; // this break signifies that the case logic is finished

		default:
			return state;
	}
};

export default reducer;
