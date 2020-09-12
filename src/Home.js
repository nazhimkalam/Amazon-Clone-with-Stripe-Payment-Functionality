import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
	return (
		<div className="home">
			<img
				className="home__image"
				src="https://images.unsplash.com/photo-1556382363-8967ad2b37f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
				alt="banner-img"
			/>

			<div className="home__row">
				<Product
					id="123456"
					title="Apple iPhone 11 (64GB, Purple) [Carrier Locked] + Carrier Subscription [Cricket Wireless] "
					price={600.88}
					rating={4}
					image="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-11-Pro-Max/Space-Gray/Apple-iPhone-11-Pro-Max-Space-Gray-frontimage.jpg"
				/>

				<Product
					id="456123"
					title="Weight of a feather, Mac book Air with i5 processor and 8gb ram backlight"
					price={500.66}
					rating={5}
					image="https://www.bhphotovideo.com/images/images2500x2500/apple_macbook_pro_tb_i7_3_5ghz_16gb_1343047.jpg"
				/>
			</div>
			<div className="home__row">
				<Product
					id="51246"
					title="Echo (2nd Generation) - Smart speaker with Alexa and Dolby processing - Heather Gray Fabric"
					price={79.99}
					rating={3}
					image="https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/bluestembrands/4NO18F0000010_VA_999?scl=1"
				/>

				<Product
					id="845125"
					title="JBL LIVE 650BTNC - Around-Ear Wireless Headphone with Noise Cancellation - Black"
					price={199.99}
					rating={4}
					image="https://media.4rgos.it/s/Argos/6162234_R_SET?$Main768$&w=620&h=620"
				/>
				<Product
					id="845123"
					title="CAP Barbell Coated Hex Dumbbell Weights"
					price={189.55}
					rating={2}
					image="https://www.amazon.com/images/I/81Ou5pchDcL._AC_UL480_FMwebp_QL65_.jpg"
				/>
			</div>
			<div className="home__row">
				<Product
					id="951526"
					title="All-New Toshiba 32LF221U21 32-inch Smart HD 720p TV - Fire TV Edition, Released 2020"
					price={450.12}
					rating={5}
					image="https://www.amazon.com/images/I/61piX33QmAL._AC_UY327_FMwebp_QL65_.jpg"
				/>
			</div>
		</div>
	);
}

export default Home;
