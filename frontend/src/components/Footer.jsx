import React from "react";

const Footer = () => {
	return (
		<footer
			className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full"
			style={{ color: "white" }}>
			<div class="content">
				<div class="left box">
					<div class="upper">
						<div class="topic">About us</div>
						<p>We sell delicious food.</p>
					</div>
					<div class="lower">
						<div class="topic">Contact us</div>
						<div class="phone">
							<a href="#">
								<i class="fas fa-phone-volume"></i>+007 9089 6767
							</a>
						</div>
						<div class="email">
							<a href="#">
								<i class="fas fa-envelope"></i>abc@gmail.com
							</a>
						</div>
					</div>
				</div>
				<div class="middle box">
					<div class="topic">Services</div>
					<div>
						<a href="/">Help and Support</a>
					</div>
					<div>
						<a href="/restaurant-login">Partner With Us</a>
					</div>
				</div>
				<div class="right box">
					<div class="topic">Follow us</div>
					<form action="#">
						{/* <input type="text" placeholder="Enter email address" />
						<input type="submit" name="" value="Send" /> */}
						<div class="media-icons">
							<a href="#">
								<i class="fab fa-facebook-f"></i>
							</a>
							<a href="#">
								<i class="fab fa-instagram"></i>
							</a>
							<a href="#">
								<i class="fab fa-twitter"></i>
							</a>
							<a href="#">
								<i class="fab fa-youtube"></i>
							</a>
							<a href="#">
								<i class="fab fa-linkedin-in"></i>
							</a>
						</div>
					</form>
				</div>
			</div>
			<div class="bottom">
				<p>
					Copyright © 2023 <a href="/">City</a> All rights reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
