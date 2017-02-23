<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ContactForm.aspx.cs" Inherits="ContactForm" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>		
	<meta name="description" content="Here at mpg remapping we carry out professional tuning, remapping and dpf removal" />
	<meta name="keywords" content="contact mpg rempping, contact form, remap contact form" />
	<meta name="author" content="steve denning" />
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
	<title>Contact form</title>
	<link rel="stylesheet" href="../style/default.css"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="shortcut icon" type="image/ico" href="img/favicon.ico"/>
</head>
<body>
	<div class="page-container">
		<header class="masthead">
			<div class="header-wrapper">
				<div class="grid__row">
					<div class="col-sm-12 col-md-6 col-lg-8">
						<h1>Masthead goes here</h1>	
					</div>
					<div class="col-sm-12 col-md-6 col-lg-4">
						<div class="socialIcons">
							<a href="https://www.facebook.com/Farnboroughautomotiveservices/" class="icon facebook"><span class="accessible">Facebook</span></a>
							<a href="https://www.twitter.com" class="icon twitter"><span class="accessible">Facebook</span></a>
							<a href="https://www.linkedin.com" class="icon linkedin"><span class="accessible">Facebook</span></a>
							<a href="tel:01252544599" class="phone-number"><span class="fa fa-phone"></span> 01252 544 599</a>
							<div class="email">
								<div class="fb-follow" data-href="https://www.facebook.com/Farnboroughautomotiveservices/" data-width="50" data-height="25" data-layout="button_count" data-size="small" data-show-faces="true"></div>
								<script src="../script/email.js"></script>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<nav class="main-nav">
			<div class="sideMenuContainer">
				<ul>
				    <li><a href="../">Home</a></li>
				    <li class="dropdown">
				        <a href="about-us.html">About us</a>
				        <ul class="sub-menu">
				            <li><a href="location.html">Location</a></li>
				            <li><a href="contactForm.aspx">Contact</a></li>
				        </ul>
				    </li>
				    <li class="dropdown">
				        <a href="#">Services</a>
				        <ul class="sub-menu">
				            <li><a href="tyres.html">Tyres</a></li>
				            <li><a href="servicing.html">Servicing</a></li>
				            <li><a href="mot.html">MOT's</a></li>
				        </ul>
				    </li>
				    <li class="dropdown">
				        <a href="remap.html">Remapping</a>
				        <ul class="sub-menu">
				            <li><a href="remap.html#economy">Economy</a></li>
				            <li><a href="remap.html#performance">Performance</a></li>
				            <li><a href="remap.html#combined">Combined</a></li>
				            <li><a href="remap.html#reviews">Reviews</a></li>
				        </ul>
				    </li>
				</ul>
			</div>
		</nav>
		<div class="page-wrapper">
			<div class="mobileButtonOpen"><span class="accessible">Mobile Menu buttton</span></div>
			<div class="grid__row">
				<div class="col-sm-12 col-md-6 col-lg-6">
					<div class="grid__row">
						<div class="col-sm-12 col-lg-8">
							<fieldset>
								<legend class="accessible">Form</legend>
								 <form id="contactform" name="contactform" runat="server">
									<label for="First_name" class="input-field">First name</label>
									<input type="text" name="First_name" placeholder="First name" id="First_name" class="input-field">
									<label for="Fast_name" class="input-field">Last name</label>
									<input type="text" name="Fast_name" placeholder="Last name" id="Fast_name" class="input-field">
									<label for="Phone_number" class="input-field">Phone number <span class="optional">(optional)</span></label>
									<input type="text" name="Phone_number" placeholder="Phone number" id="Phone_number" class="input-field">
									<label for="Email" class="input-field">Email</label>
									<input type="text" name="Email" placeholder="Email" id="Email" class="input-field">
									<label for="Message" class="input-field">Text area</label>
									<textarea name="Message" id="Message" cols="30" rows="10" placeholder="Please write here...."></textarea>
									<div class="checkbox">
										<input type="checkbox" name="confirm" id="check1" value="1">
										<label for="check1" class=""><span></span>I'd like to receive loads of spam email</label>
										<input class="btn" id="submit" name="submit" type="submit" value="Submit" />
									</div>
								</form>
							</fieldset>
						</div>
					</div>
				</div>
				<div class="col-sm-12 col-md-6 col-lg-6">
					<div class="inner">
						<h2 class="h3">Find us:</h2>
						<div class="googleMap border">
							<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2486.0380950003764!2d-0.9732769999999998!3d51.457457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1437995919216" width="100%" height="300px" allowfullscreen target="_blank"></iframe>
						</div>
						<div class="margin">
							<p>Farnborough Automotive Services</p>
							<p>70 Guildford Rd East</p>
							<p>Farnborough</p>
							<p>Hampshire</p>
							<p>GU14 6P</p>
							<script src="../script/email.js"></script>
							<br/>
							<a href="tel:01252544599">01252 544 599</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<footer class="page-footer ">
		<div class="footer-container page-wrapper">
			<div class="grid__row">
				<div class="col-sm-12 col-md-12 col-lg-4">
					<div class="inner">
						<h3 class="heading green">Contact</h3>
						<p>Farnborough Automotive Services</p>
						<p>70 Guildford Rd East</p>
						<p>Farnborough</p>
						<p>Hampshire</p>
						<p>GU14 6P</p>
						<div class="device">
							<p class="desktop phone">01252 544 599</p>
							<a href="tel:01252544599" class="mobile phone">01252 544 599</a>
							<div class="email">
								<script src="../script/email.js"></script>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-4">
					<div class="inner">
					<!-- <h3 class="heading blue">Connect &amp; Share</h3>
						<ul class="social-links">
							<li class="blg"><a href="#">Blog</a></li>
							<li class="fb"><a href="#">Facebook</a></li>
							<li class="tw"><a href="#">Twitter</a></li>
							<li class="nl"><a href="#">Newsletter</a></li>
						</ul> -->
						<a class="twitter-timeline"  href="https://twitter.com/Steve__Denning" data-widget-id="608231068152549376">Tweets by @Steve__Denning</a>
						<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					</div>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-4">
					<div class="inner">
						<h3 class="heading white">Location</h3>
						<div class="googleMap">
							<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2486.0380950003764!2d-0.9732769999999998!3d51.457457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1437995919216" width="100%" height="175" allowfullscreen target="_blank"></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
<!-- ==========Scripts====================== -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="script/default.js"></script>
		<script src="script/modernizr.custom.js"></script>
</body>
</html>