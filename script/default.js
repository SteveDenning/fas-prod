// Main nav
$(window).width(function() {
    if ($(window).width() >= 769) {
        $(document).ready(function() {
            $('.dropdown').hover(function() {
                $(this).children('.sub-menu').slideDown(200);
            }, function() {
                $(this).children('.sub-menu').slideUp(200);
            });
        });
    }
});



//slideo out menu
$('.mobileButtonOpen').bind('click', function() {
    $('.sideMenuContainer, .mobileButtonOpen').toggleClass('is-active');
});




// Accordion for reviews
jQuery(document).ready(function() {
    function close_accordion_section() {
        jQuery('.accordion .accordion-section-title').removeClass('active');
        jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
    jQuery('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = jQuery(this).attr('href');
        if (jQuery(e.target).is('.active')) {
            close_accordion_section();
        } else {
            close_accordion_section();
            // Add active class to section title
            jQuery(this).addClass('active');
            // Open up the hidden content panel
            jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }
        e.preventDefault();
    });
});

// Tabs
function changeTabs(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();





/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */
// Uses Node, AMD or browser globals to create a module.
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
}(this, function($) {
    function Lightbox(options) {
        this.album = [];
        this.currentImageIndex = void 0;
        this.init();
        // options
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);
    }
    // Descriptions of all options available on the demo site:
    // http://lokeshdhakar.com/projects/lightbox2/index.html#options
    Lightbox.defaults = {
        albumLabel: 'Image %1 of %2',
        alwaysShowNavOnTouchDevices: false,
        fadeDuration: 600,
        fitImagesInViewport: true,
        imageFadeDuration: 600,
        // maxWidth: 800,
        // maxHeight: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: true,
        wrapAround: false,
        disableScrolling: false,
        /*
        Sanitize Title
        If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
        This will free you to add html tags, such as links, in the caption.

        If the caption data is user submitted or from some other untrusted source, then set this to true
        to prevent xss and other injection attacks.
         */
        sanitizeTitle: false
    };
    Lightbox.prototype.option = function(options) {
        $.extend(this.options, options);
    };
    Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
        return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
    };
    Lightbox.prototype.init = function() {
        var self = this;
        // Both enable and build methods require the body tag to be in the DOM.
        $(document).ready(function() {
            self.enable();
            self.build();
        });
    };
    // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
    // that contain 'lightbox'. When these are clicked, start lightbox.
    Lightbox.prototype.enable = function() {
        var self = this;
        $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
            self.start($(event.currentTarget));
            return false;
        });
    };
    // Build html for the lightbox and the overlay.
    // Attach event handlers to the new DOM elements. click click click
    Lightbox.prototype.build = function() {
        var self = this;
        $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));
        // Cache jQuery objects
        this.$lightbox = $('#lightbox');
        this.$overlay = $('#lightboxOverlay');
        this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
        this.$container = this.$lightbox.find('.lb-container');
        this.$image = this.$lightbox.find('.lb-image');
        this.$nav = this.$lightbox.find('.lb-nav');
        // Store css values for future lookup
        this.containerPadding = {
            top: parseInt(this.$container.css('padding-top'), 10),
            right: parseInt(this.$container.css('padding-right'), 10),
            bottom: parseInt(this.$container.css('padding-bottom'), 10),
            left: parseInt(this.$container.css('padding-left'), 10)
        };
        this.imageBorderWidth = {
            top: parseInt(this.$image.css('border-top-width'), 10),
            right: parseInt(this.$image.css('border-right-width'), 10),
            bottom: parseInt(this.$image.css('border-bottom-width'), 10),
            left: parseInt(this.$image.css('border-left-width'), 10)
        };
        // Attach event handlers to the newly minted DOM elements
        this.$overlay.hide().on('click', function() {
            self.end();
            return false;
        });
        this.$lightbox.hide().on('click', function(event) {
            if ($(event.target).attr('id') === 'lightbox') {
                self.end();
            }
            return false;
        });
        this.$outerContainer.on('click', function(event) {
            if ($(event.target).attr('id') === 'lightbox') {
                self.end();
            }
            return false;
        });
        this.$lightbox.find('.lb-prev').on('click', function() {
            if (self.currentImageIndex === 0) {
                self.changeImage(self.album.length - 1);
            } else {
                self.changeImage(self.currentImageIndex - 1);
            }
            return false;
        });
        this.$lightbox.find('.lb-next').on('click', function() {
            if (self.currentImageIndex === self.album.length - 1) {
                self.changeImage(0);
            } else {
                self.changeImage(self.currentImageIndex + 1);
            }
            return false;
        });
        /*
          Show context menu for image on right-click

          There is a div containing the navigation that spans the entire image and lives above of it. If
          you right-click, you are right clicking this div and not the image. This prevents users from
          saving the image or using other context menu actions with the image.

          To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
          set pointer-events to none on the nav div. This is so that the upcoming right-click event on
          the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
          we set the pointer events back to auto for the nav div so it can capture hover and left-click
          events as usual.
         */
        this.$nav.on('mousedown', function(event) {
            if (event.which === 3) {
                self.$nav.css('pointer-events', 'none');
                self.$lightbox.one('contextmenu', function() {
                    setTimeout(function() {
                        this.$nav.css('pointer-events', 'auto');
                    }.bind(self), 0);
                });
            }
        });
        this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
            self.end();
            return false;
        });
    };
    // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
    Lightbox.prototype.start = function($link) {
        var self = this;
        var $window = $(window);
        $window.on('resize', $.proxy(this.sizeOverlay, this));
        $('select, object, embed').css({
            visibility: 'hidden'
        });
        this.sizeOverlay();
        this.album = [];
        var imageNumber = 0;

        function addToAlbum($link) {
            self.album.push({
                link: $link.attr('href'),
                title: $link.attr('data-title') || $link.attr('title')
            });
        }
        // Support both data-lightbox attribute and rel attribute implementations
        var dataLightboxValue = $link.attr('data-lightbox');
        var $links;
        if (dataLightboxValue) {
            $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
            for (var i = 0; i < $links.length; i = ++i) {
                addToAlbum($($links[i]));
                if ($links[i] === $link[0]) {
                    imageNumber = i;
                }
            }
        } else {
            if ($link.attr('rel') === 'lightbox') {
                // If image is not part of a set
                addToAlbum($link);
            } else {
                // If image is part of a set
                $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
                for (var j = 0; j < $links.length; j = ++j) {
                    addToAlbum($($links[j]));
                    if ($links[j] === $link[0]) {
                        imageNumber = j;
                    }
                }
            }
        }
        // Position Lightbox
        var top = $window.scrollTop() + this.options.positionFromTop;
        var left = $window.scrollLeft();
        this.$lightbox.css({
            top: top + 'px',
            left: left + 'px'
        }).fadeIn(this.options.fadeDuration);
        // Disable scrolling of the page while open
        if (this.options.disableScrolling) {
            $('body').addClass('lb-disable-scrolling');
        }
        this.changeImage(imageNumber);
    };
    // Hide most UI elements in preparation for the animated resizing of the lightbox.
    Lightbox.prototype.changeImage = function(imageNumber) {
        var self = this;
        this.disableKeyboardNav();
        var $image = this.$lightbox.find('.lb-image');
        this.$overlay.fadeIn(this.options.fadeDuration);
        $('.lb-loader').fadeIn('slow');
        this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
        this.$outerContainer.addClass('animating');
        // When image to show is preloaded, we send the width and height to sizeContainer()
        var preloader = new Image();
        preloader.onload = function() {
            var $preloader;
            var imageHeight;
            var imageWidth;
            var maxImageHeight;
            var maxImageWidth;
            var windowHeight;
            var windowWidth;
            $image.attr('src', self.album[imageNumber].link);
            $preloader = $(preloader);
            $image.width(preloader.width);
            $image.height(preloader.height);
            if (self.options.fitImagesInViewport) {
                // Fit image inside the viewport.
                // Take into account the border around the image and an additional 10px gutter on each side.
                windowWidth = $(window).width();
                windowHeight = $(window).height();
                maxImageWidth = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
                maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - 120;
                // Check if image size is larger then maxWidth|maxHeight in settings
                if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
                    maxImageWidth = self.options.maxWidth;
                }
                if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
                    maxImageHeight = self.options.maxHeight;
                }
                // Is there a fitting issue?
                if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
                    if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
                        imageWidth = maxImageWidth;
                        imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                        $image.width(imageWidth);
                        $image.height(imageHeight);
                    } else {
                        imageHeight = maxImageHeight;
                        imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                        $image.width(imageWidth);
                        $image.height(imageHeight);
                    }
                }
            }
            self.sizeContainer($image.width(), $image.height());
        };
        preloader.src = this.album[imageNumber].link;
        this.currentImageIndex = imageNumber;
    };
    // Stretch overlay to fit the viewport
    Lightbox.prototype.sizeOverlay = function() {
        this.$overlay.width($(document).width()).height($(document).height());
    };
    // Animate the size of the lightbox to fit the image we are showing
    Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
        var self = this;
        var oldWidth = this.$outerContainer.outerWidth();
        var oldHeight = this.$outerContainer.outerHeight();
        var newWidth = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
        var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

        function postResize() {
            self.$lightbox.find('.lb-dataContainer').width(newWidth);
            self.$lightbox.find('.lb-prevLink').height(newHeight);
            self.$lightbox.find('.lb-nextLink').height(newHeight);
            self.showImage();
        }
        if (oldWidth !== newWidth || oldHeight !== newHeight) {
            this.$outerContainer.animate({
                width: newWidth,
                height: newHeight
            }, this.options.resizeDuration, 'swing', function() {
                postResize();
            });
        } else {
            postResize();
        }
    };
    // Display the image and its details and begin preload neighboring images.
    Lightbox.prototype.showImage = function() {
        this.$lightbox.find('.lb-loader').stop(true).hide();
        this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);
        this.updateNav();
        this.updateDetails();
        this.preloadNeighboringImages();
        this.enableKeyboardNav();
    };
    // Display previous and next navigation if appropriate.
    Lightbox.prototype.updateNav = function() {
        // Check to see if the browser supports touch events. If so, we take the conservative approach
        // and assume that mouse hover events are not supported and always show prev/next navigation
        // arrows in image sets.
        var alwaysShowNav = false;
        try {
            document.createEvent('TouchEvent');
            alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
        } catch (e) {}
        this.$lightbox.find('.lb-nav').show();
        if (this.album.length > 1) {
            if (this.options.wrapAround) {
                if (alwaysShowNav) {
                    this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
                }
                this.$lightbox.find('.lb-prev, .lb-next').show();
            } else {
                if (this.currentImageIndex > 0) {
                    this.$lightbox.find('.lb-prev').show();
                    if (alwaysShowNav) {
                        this.$lightbox.find('.lb-prev').css('opacity', '1');
                    }
                }
                if (this.currentImageIndex < this.album.length - 1) {
                    this.$lightbox.find('.lb-next').show();
                    if (alwaysShowNav) {
                        this.$lightbox.find('.lb-next').css('opacity', '1');
                    }
                }
            }
        }
    };
    // Display caption, image number, and closing button.
    Lightbox.prototype.updateDetails = function() {
        var self = this;
        // Enable anchor clicks in the injected caption html.
        // Thanks Nate Wright for the fix. @https://github.com/NateWr
        if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== '') {
            var $caption = this.$lightbox.find('.lb-caption');
            if (this.options.sanitizeTitle) {
                $caption.text(this.album[this.currentImageIndex].title);
            } else {
                $caption.html(this.album[this.currentImageIndex].title);
            }
            $caption.fadeIn('fast').find('a').on('click', function(event) {
                if ($(this).attr('target') !== undefined) {
                    window.open($(this).attr('href'), $(this).attr('target'));
                } else {
                    location.href = $(this).attr('href');
                }
            });
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
        } else {
            this.$lightbox.find('.lb-number').hide();
        }
        this.$outerContainer.removeClass('animating');
        this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
            return self.sizeOverlay();
        });
    };
    // Preload previous and next images in set.
    Lightbox.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
            var preloadNext = new Image();
            preloadNext.src = this.album[this.currentImageIndex + 1].link;
        }
        if (this.currentImageIndex > 0) {
            var preloadPrev = new Image();
            preloadPrev.src = this.album[this.currentImageIndex - 1].link;
        }
    };
    Lightbox.prototype.enableKeyboardNav = function() {
        $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    };
    Lightbox.prototype.disableKeyboardNav = function() {
        $(document).off('.keyboard');
    };
    Lightbox.prototype.keyboardAction = function(event) {
        var KEYCODE_ESC = 27;
        var KEYCODE_LEFTARROW = 37;
        var KEYCODE_RIGHTARROW = 39;
        var keycode = event.keyCode;
        var key = String.fromCharCode(keycode).toLowerCase();
        if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
            this.end();
        } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
            if (this.currentImageIndex !== 0) {
                this.changeImage(this.currentImageIndex - 1);
            } else if (this.options.wrapAround && this.album.length > 1) {
                this.changeImage(this.album.length - 1);
            }
        } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
            if (this.currentImageIndex !== this.album.length - 1) {
                this.changeImage(this.currentImageIndex + 1);
            } else if (this.options.wrapAround && this.album.length > 1) {
                this.changeImage(0);
            }
        }
    };
    // Closing time. :-(
    Lightbox.prototype.end = function() {
        this.disableKeyboardNav();
        $(window).off('resize', this.sizeOverlay);
        this.$lightbox.fadeOut(this.options.fadeDuration);
        this.$overlay.fadeOut(this.options.fadeDuration);
        $('select, object, embed').css({
            visibility: 'visible'
        });
        if (this.options.disableScrolling) {
            $('body').removeClass('lb-disable-scrolling');
        }
    };
    return new Lightbox();
}));









// Fade carousel
jQuery(document).ready(function($) {
    $('#banner-fade').bjqs({
        height: 320,
        width: 620,
        responsive: true
    });
});;
(function($) {
    "use strict";
    $.fn.bjqs = function(o) {
        // slider default settings
        var defaults = {
            // w + h to enforce consistency
            width: 900,
            height: 300,
            // transition valuess
            animtype: 'fade', // 'fade' or 'slide'
            animduration: 450, // length of transition
            animspeed: 2000, // delay between transitions
            automatic: true, // enable/disable automatic slide rotation
            // control and marker configuration
            showcontrols: false, // enable/disable next + previous UI elements
            centercontrols: true, // vertically center controls
            nexttext: 'Next', // Text Next
            //nexttext        : '<img src="/images/background/arrow-right.png" alt="Next">',   // Chevron images
            prevtext: 'Prev', // Text Previous
            //prevtext        : '<img src="/images/background/arrow-left.png" alt="Previous">',   // Chevron images
            showmarkers: false, // enable/disable individual slide UI markers
            centermarkers: true, // horizontally center markers
            // interaction values
            keyboardnav: true, // enable/disable keyboard navigation
            hoverpause: true, // enable/disable pause slides on hover
            // presentational options
            usecaptions: true, // enable/disable captions using img title attribute
            randomstart: true, // start from a random slide
            responsive: true // enable responsive behaviour
        };
        // create settings from defauls and user options
        var settings = $.extend({}, defaults, o);
        // slider elements
        var $wrapper = this,
            $slider = $wrapper.find('ul.bjqs'),
            $slides = $slider.children('li'),
            // control elements
            $c_wrapper = null,
            $c_fwd = null,
            $c_prev = null,
            // marker elements
            $m_wrapper = null,
            $m_markers = null,
            // elements for slide animation
            $canvas = null,
            $clone_first = null,
            $clone_last = null;
        // state management object
        var state = {
            slidecount: $slides.length, // total number of slides
            animating: false, // bool: is transition is progress
            paused: false, // bool: is the slider paused
            currentslide: 1, // current slide being viewed (not 0 based)
            nextslide: 0, // slide to view next (not 0 based)
            currentindex: 0, // current slide being viewed (0 based)
            nextindex: 0, // slide to view next (0 based)
            interval: null // interval for automatic rotation
        };
        var responsive = {
            width: null,
            height: null,
            ratio: null
        };
        // helpful variables
        var vars = {
            fwd: 'forward',
            prev: 'previous'
        };
        // run through options and initialise settings
        var init = function() {
            // differentiate slider li from content li
            $slides.addClass('bjqs-slide');
            // conf dimensions, responsive or static
            if (settings.responsive) {
                conf_responsive();
            } else {
                conf_static();
            }
            // configurations only avaliable if more than 1 slide
            if (state.slidecount > 1) {
                // enable random start
                if (settings.randomstart) {
                    conf_random();
                }
                // create and show controls
                if (settings.showcontrols) {
                    conf_controls();
                }
                // create and show markers
                if (settings.showmarkers) {
                    conf_markers();
                }
                // enable slidenumboard navigation
                if (settings.keyboardnav) {
                    conf_keynav();
                }
                // enable pause on hover
                if (settings.hoverpause && settings.automatic) {
                    conf_hoverpause();
                }
                // conf slide animation
                if (settings.animtype === 'slide') {
                    conf_slide();
                }
            } else {
                // Stop automatic animation, because we only have one slide! 
                settings.automatic = false;
            }
            if (settings.usecaptions) {
                conf_captions();
            }
            // TODO: need to accomodate random start for slide transition setting
            if (settings.animtype === 'slide' && !settings.randomstart) {
                state.currentindex = 1;
                state.currentslide = 2;
            }
            // slide components are hidden by default, show them now
            $slider.show();
            $slides.eq(state.currentindex).show();
            // Finally, if automatic is set to true, kick off the interval
            if (settings.automatic) {
                state.interval = setInterval(function() {
                    go(vars.fwd, false);
                }, settings.animspeed);
            }
        };
        var conf_responsive = function() {
            responsive.width = $wrapper.outerWidth();
            responsive.ratio = responsive.width / settings.width,
                responsive.height = settings.height * responsive.ratio;
            if (settings.animtype === 'fade') {
                // initial setup
                $slides.css({
                    'height': settings.height,
                    'width': '100%'
                });
                $slides.children('img').css({
                    'height': settings.height,
                    'width': '100%'
                });
                $slider.css({
                    'height': settings.height,
                    'width': '100%'
                });
                $wrapper.css({
                    'height': settings.height,
                    'max-width': settings.width,
                    'position': 'relative'
                });
                if (responsive.width < settings.width) {
                    $slides.css({
                        'height': responsive.height
                    });
                    $slides.children('img').css({
                        'height': responsive.height
                    });
                    $slider.css({
                        'height': responsive.height
                    });
                    $wrapper.css({
                        'height': responsive.height
                    });
                }
                $(window).resize(function() {
                    // calculate and update dimensions
                    responsive.width = $wrapper.outerWidth();
                    responsive.ratio = responsive.width / settings.width,
                        responsive.height = settings.height * responsive.ratio;
                    $slides.css({
                        'height': responsive.height
                    });
                    $slides.children('img').css({
                        'height': responsive.height
                    });
                    $slider.css({
                        'height': responsive.height
                    });
                    $wrapper.css({
                        'height': responsive.height
                    });
                });
            }
            if (settings.animtype === 'slide') {
                // initial setup
                $slides.css({
                    'height': settings.height,
                    'width': settings.width
                });
                $slides.children('img').css({
                    'height': settings.height,
                    'width': settings.width
                });
                $slider.css({
                    'height': settings.height,
                    'width': settings.width * settings.slidecount
                });
                $wrapper.css({
                    'height': settings.height,
                    'max-width': settings.width,
                    'position': 'relative'
                });
                if (responsive.width < settings.width) {
                    $slides.css({
                        'height': responsive.height
                    });
                    $slides.children('img').css({
                        'height': responsive.height
                    });
                    $slider.css({
                        'height': responsive.height
                    });
                    $wrapper.css({
                        'height': responsive.height
                    });
                }
                $(window).resize(function() {
                    // calculate and update dimensions
                    responsive.width = $wrapper.outerWidth(),
                        responsive.ratio = responsive.width / settings.width,
                        responsive.height = settings.height * responsive.ratio;
                    $slides.css({
                        'height': responsive.height,
                        'width': responsive.width
                    });
                    $slides.children('img').css({
                        'height': responsive.height,
                        'width': responsive.width
                    });
                    $slider.css({
                        'height': responsive.height,
                        'width': responsive.width * settings.slidecount
                    });
                    $wrapper.css({
                        'height': responsive.height
                    });
                    $canvas.css({
                        'height': responsive.height,
                        'width': responsive.width
                    });
                    resize_complete(function() {
                        go(false, state.currentslide);
                    }, 200, "some unique string");
                });
            }
        };
        var resize_complete = (function() {
            var timers = {};
            return function(callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();
        // enforce fixed sizing on slides, slider and wrapper
        var conf_static = function() {
            $slides.css({
                'height': settings.height,
                'width': settings.width
            });
            $slider.css({
                'height': settings.height,
                'width': settings.width
            });
            $wrapper.css({
                'height': settings.height,
                'width': settings.width,
                'position': 'relative'
            });
        };
        var conf_slide = function() {
            // create two extra elements which are clones of the first and last slides
            $clone_first = $slides.eq(0).clone();
            $clone_last = $slides.eq(state.slidecount - 1).clone();
            // add them to the DOM where we need them
            $clone_first.attr({
                'data-clone': 'last',
                'data-slide': 0
            }).appendTo($slider).show();
            $clone_last.attr({
                'data-clone': 'first',
                'data-slide': 0
            }).prependTo($slider).show();
            // update the elements object
            $slides = $slider.children('li');
            state.slidecount = $slides.length;
            // create a 'canvas' element which is neccessary for the slide animation to work
            $canvas = $('<div class="bjqs-wrapper"></div>');
            // if the slider is responsive && the calculated width is less than the max width
            if (settings.responsive && (responsive.width < settings.width)) {
                $canvas.css({
                    'width': responsive.width,
                    'height': responsive.height,
                    'overflow': 'hidden',
                    'position': 'relative'
                });
                // update the dimensions to the slider to accomodate all the slides side by side
                $slider.css({
                    'width': responsive.width * (state.slidecount + 2),
                    'left': -responsive.width * state.currentslide
                });
            } else {
                $canvas.css({
                    'width': settings.width,
                    'height': settings.height,
                    'overflow': 'hidden',
                    'position': 'relative'
                });
                // update the dimensions to the slider to accomodate all the slides side by side
                $slider.css({
                    'width': settings.width * (state.slidecount + 2),
                    'left': -settings.width * state.currentslide
                });
            }
            // add some inline styles which will align our slides for left-right sliding
            $slides.css({
                'float': 'left',
                'position': 'relative',
                'display': 'list-item'
            });
            // 'everything.. in it's right place'
            $canvas.prependTo($wrapper);
            $slider.appendTo($canvas);
        };
        var conf_controls = function() {
            // create the elements for the controls
            $c_wrapper = $('<ul class="bjqs-controls"></ul>');
            $c_fwd = $('<li class="bjqs-next"><a href="#" data-direction="' + vars.fwd + '">' + settings.nexttext + '</a></li>');
            $c_prev = $('<li class="bjqs-prev"><a href="#" data-direction="' + vars.prev + '">' + settings.prevtext + '</a></li>');
            // bind click events
            $c_wrapper.on('click', 'a', function(e) {
                e.preventDefault();
                var direction = $(this).attr('data-direction');
                if (!state.animating) {
                    if (direction === vars.fwd) {
                        go(vars.fwd, false);
                    }
                    if (direction === vars.prev) {
                        go(vars.prev, false);
                    }
                }
            });
            // put 'em all together
            $c_prev.appendTo($c_wrapper);
            $c_fwd.appendTo($c_wrapper);
            $c_wrapper.appendTo($wrapper);
            // vertically center the controls
            if (settings.centercontrols) {
                $c_wrapper.addClass('v-centered');
                // calculate offset % for vertical positioning
                var offset_px = ($wrapper.height() - $c_fwd.children('a').outerHeight()) / 2,
                    ratio = (offset_px / settings.height) * 220, //changes the height of the prev/next buttons -20=top 220=bottom
                    offset = ratio + '%';
                $c_fwd.find('a').css('top', offset);
                $c_prev.find('a').css('top', offset);
            }
        };
        var conf_markers = function() {
            // create a wrapper for our markers
            $m_wrapper = $('<ol class="bjqs-markers"></ol>');
            // for every slide, create a marker
            $.each($slides, function(key, slide) {
                var slidenum = key + 1,
                    gotoslide = key + 1;
                if (settings.animtype === 'slide') {
                    // + 2 to account for clones
                    gotoslide = key + 2;
                }
                var marker = $('<li><a href="#">' + slidenum + '</a></li>');
                // set the first marker to be active
                if (slidenum === state.currentslide) {
                    marker.addClass('active-marker');
                }
                // bind the click event
                marker.on('click', 'a', function(e) {
                    e.preventDefault();
                    if (!state.animating && state.currentslide !== gotoslide) {
                        go(false, gotoslide);
                    }
                });
                // add the marker to the wrapper
                marker.appendTo($m_wrapper);
            });
            $m_wrapper.appendTo($wrapper);
            $m_markers = $m_wrapper.find('li');
            // center the markers
            if (settings.centermarkers) {
                $m_wrapper.addClass('h-centered');
                var offset = (settings.width - $m_wrapper.width()) / 2;
                $m_wrapper.css('left', offset);
            }
        };
        var conf_keynav = function() {
            $(document).keyup(function(event) {
                if (!state.paused) {
                    clearInterval(state.interval);
                    state.paused = true;
                }
                if (!state.animating) {
                    if (event.keyCode === 39) {
                        event.preventDefault();
                        go(vars.fwd, false);
                    } else if (event.keyCode === 37) {
                        event.preventDefault();
                        go(vars.prev, false);
                    }
                }
                if (state.paused && settings.automatic) {
                    state.interval = setInterval(function() {
                        go(vars.fwd);
                    }, settings.animspeed);
                    state.paused = false;
                }
            });
        };
        var conf_hoverpause = function() {
            $wrapper.hover(function() {
                if (!state.paused) {
                    clearInterval(state.interval);
                    state.paused = true;
                }
            }, function() {
                if (state.paused) {
                    state.interval = setInterval(function() {
                        go(vars.fwd, false);
                    }, settings.animspeed);
                    state.paused = false;
                }
            });
        };
        var conf_captions = function() {
            $.each($slides, function(key, slide) {
                var caption = $(slide).children('img:first-child').attr('title');
                // Account for images wrapped in links
                if (!caption) {
                    caption = $(slide).children('a').find('img:first-child').attr('title');
                }
                if (caption) {
                    caption = $('<p class="bjqs-caption">' + caption + '</p>');
                    caption.appendTo($(slide));
                }
            });
        };
        var conf_random = function() {
            var rand = Math.floor(Math.random() * state.slidecount) + 1;
            state.currentslide = rand;
            state.currentindex = rand - 1;
        };
        var set_next = function(direction) {
            if (direction === vars.fwd) {
                if ($slides.eq(state.currentindex).next().length) {
                    state.nextindex = state.currentindex + 1;
                    state.nextslide = state.currentslide + 1;
                } else {
                    state.nextindex = 0;
                    state.nextslide = 1;
                }
            } else {
                if ($slides.eq(state.currentindex).prev().length) {
                    state.nextindex = state.currentindex - 1;
                    state.nextslide = state.currentslide - 1;
                } else {
                    state.nextindex = state.slidecount - 1;
                    state.nextslide = state.slidecount;
                }
            }
        };
        var go = function(direction, position) {
            // only if we're not already doing things
            if (!state.animating) {
                // doing things
                state.animating = true;
                if (position) {
                    state.nextslide = position;
                    state.nextindex = position - 1;
                } else {
                    set_next(direction);
                }
                // fade animation
                if (settings.animtype === 'fade') {
                    if (settings.showmarkers) {
                        $m_markers.removeClass('active-marker');
                        $m_markers.eq(state.nextindex).addClass('active-marker');
                    }
                    // fade out current
                    $slides.eq(state.currentindex).fadeOut(settings.animduration);
                    // fade in next
                    $slides.eq(state.nextindex).fadeIn(settings.animduration, function() {
                        // update state variables
                        state.animating = false;
                        state.currentslide = state.nextslide;
                        state.currentindex = state.nextindex;
                    });
                }
                // slide animation
                if (settings.animtype === 'slide') {
                    if (settings.showmarkers) {
                        var markerindex = state.nextindex - 1;
                        if (markerindex === state.slidecount - 2) {
                            markerindex = 0;
                        } else if (markerindex === -1) {
                            markerindex = state.slidecount - 3;
                        }
                        $m_markers.removeClass('active-marker');
                        $m_markers.eq(markerindex).addClass('active-marker');
                    }
                    // if the slider is responsive && the calculated width is less than the max width
                    if (settings.responsive && (responsive.width < settings.width)) {
                        state.slidewidth = responsive.width;
                    } else {
                        state.slidewidth = settings.width;
                    }
                    $slider.animate({
                        'left': -state.nextindex * state.slidewidth
                    }, settings.animduration, function() {
                        state.currentslide = state.nextslide;
                        state.currentindex = state.nextindex;
                        // is the current slide a clone?
                        if ($slides.eq(state.currentindex).attr('data-clone') === 'last') {
                            // affirmative, at the last slide (clone of first)
                            $slider.css({
                                'left': -state.slidewidth
                            });
                            state.currentslide = 2;
                            state.currentindex = 1;
                        } else if ($slides.eq(state.currentindex).attr('data-clone') === 'first') {
                            // affirmative, at the fist slide (clone of last)
                            $slider.css({
                                'left': -state.slidewidth * (state.slidecount - 2)
                            });
                            state.currentslide = state.slidecount - 1;
                            state.currentindex = state.slidecount - 2;
                        }
                        state.animating = false;
                    });
                }
            }
        };
        // lets get the party started :)
        init();
    };
})(jQuery);






// Match heights
/**
* jquery.matchHeight.js master
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert display block
                    $that.css('display', '');
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // update heights on load and resize events
    $(window).bind('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window).bind('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

})(jQuery);

$(function() {
    $('.matchHeights').matchHeight();
});