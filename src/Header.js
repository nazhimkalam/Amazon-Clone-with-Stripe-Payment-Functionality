import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
	const [{ basket, user }] = useStateValue();

	// console.log(basket); 	// this displays the contents of the basket currently
	const login = () => {
		if (user) {
			auth.signOut(); // signing out the user
		}
	};
	return (
		<nav className="header">
			{/* Adding the logo */}
			<Link to="/">
				<img src="http://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="logo" className="header__logo animation" />
			</Link>

			{/* Adding the Search Box */}
			<div className="header__search animation">
				<input type="text" className="header__searchInput" placeholder="Search" />
				<SearchIcon className="header__searchIcon" />
			</div>

			{/* Links on the Nav bar */}
			{/* -----> Link doesn't refresh the page */}
			{/* -----> Href refreshes the page */}

			<div className="header__nav animation">
				{/* --link 01-- */}
				<Link className="header__link" to={!user && '/login'}>
					<div onClick={login} className="header__option">
						<span className="header__optionLineOne">Hello, {user?.email}</span>
						<span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign in'}</span>
					</div>
				</Link>

				{/* --link 02-- */}
				<Link className="header__link" to="/orders">
					<div className="header__option">
						<span className="header__optionLineOne">Returns</span>
						<span className="header__optionLineTwo">& Orders</span>
					</div>
				</Link>

				{/* --link 03-- */}
				<Link className="header__link" to="/">
					<div className="header__option">
						<span className="header__optionLineOne">Your</span>
						<span className="header__optionLineTwo">Prime</span>
					</div>
				</Link>

				{/* --link 04-- */}
				<Link to="/checkout" className="header__link">
					<div className="header__optionBasket">
						<ShoppingBasketIcon />
						<span className="header__optionLineTwo header__basketCount">{basket?.length}</span>{' '}
						{/* ? means 'Optional' */}
					</div>
				</Link>
			</div>
		</nav>
	);
}

export default Header;
