
// Sliding mobile menu

// JQuery
$('.mobileButtonOpen').bind('click', function() {
	$('.sideMenuContainer, .mobileButtonOpen').toggleClass('is-active');
});

// Native js
// var button = document.getElementById("mobileButtonOpen"),
// 	container = document.getElementById("sideMenuContainer");

// document.getElementById("mobileButtonOpen").onclick = function() {
//     if ( container.className == "sideMenuContainer is-active") {
//          container.className = "sideMenuContainer";
//          button.className = "mobileButtonOpen";
//     } else {
//        container.className = "sideMenuContainer is-active";
//        button.className = "mobileButtonOpen is-active";
//     }
// };


// jQuery media query for drop down menu

$(window).width(function(){
	if ($(window).width() >= 769){
		console.log("ready");
		$(document).ready(function() {
		    $( '.dropdown' ).hover(
		        function(){
		            $(this).children('.sub-menu').slideDown(200);
		        },
		        function(){
		            $(this).children('.sub-menu').slideUp(200);
		        }
		    );
		});
	}	
});


// Accordion - reviews and testimonials
jQuery(document).ready(function() {
	function close_accordion_section() {
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	}

	jQuery('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			jQuery(this).addClass('active');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
	});
});