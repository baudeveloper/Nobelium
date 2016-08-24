$(document).ready(function() {

	var wheight = $(window).height();
	var pageBanner = $('#banner');
	var topoffset = 80;

	$("ul.dropdown-menu>li>a").addClass("smooth");

	//Smooth Scroll
	$('a[href*="#"][class*="smooth"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top-140
	        }, 500);
	        return false;
	      }
	    }
	});

	//New Page smooth scroll
	// to top right away
	if ( window.location.hash ) scroll(0,0);
	// void some browsers issue
	setTimeout( function() { scroll(0,0); }, 1);
	    // your current click function
    $('.smooth').on('click', function(e) {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top-140 + 'px'
        }, 1000, 'swing');
    });
    // *only* if we have anchor on the url
    if(window.location.hash) {
        // smooth scroll to the anchor id
        $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top-140 + 'px'
        }, 1000, 'swing');
    }

    //Back to Top Link
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

	//Dropdown hover
	$('.dropdown-toggle').dropdownHover();

	//Dropdown Parent clickable
	$('.navbar .dropdown > a').click(function(){
  		location.href = this.href;
  	});


	//FastClick Behaviour fo Touch Devices
	FastClick.attach(document.body);

	//Bootstrap-Select
	$('.selectpicker').addClass('form-control').selectpicker();
	$('.gfield_select').addClass('form-control').selectpicker();

	//Contact Form Format
	$('#field_1_1').wrapAll( "<fieldset>" );
	$('#field_1_2').wrapAll( "<fieldset>" );
	$('#field_1_4').wrapAll( "<fieldset>" );
	$('#field_1_5').wrapAll( "<fieldset>" );
	$('#field_1_6').wrapAll( "<fieldset>" );
	$('#field_1_7').wrapAll( "<fieldset>" );
	$('#field_1_8').wrapAll( "<fieldset>" );
	$('#gform_wrapper_1 #gform_submit_button_1').removeClass('gform_button button').addClass('btn btn-secondary btn-block').wrap("<div class='row'><div class='submit-btn'></div></div>");
	$("<div class='reset-btn'><input type='reset' name='reset' value='Reset'></div>").insertAfter( "#gform_wrapper_1 .submit-btn" );
	$("<div class='note'><span class='required'>*</span>mandatory fields.</span></div>").insertAfter( "#gform_wrapper_1 .reset-btn" );

	$('#gform_wrapper_1 .validation_error').wrap("<div class='validation-panel'></div>");

	//String Replace
	// $(".main-area *, #main-content *").replaceText( /(company name)/gi, "<span class='thename'>Company Name&trade;</span>" );

	//Scrollspy to show call-to-action button in topnav
	$('body').scrollspy({ target: '.top-nav' })

	// Add class to nav when scroll past top offset
	$(window).scroll(function() {
	    var nav = $('.main-nav,.top-nav');
	    var top = 50;
	    if ($(window).scrollTop() >= top) {
	        nav.addClass('inbody');
	    } else {
	        nav.removeClass('inbody');
	    }
	});

  	//Navbar toggle function for fullscreen nav behaviour on mobile
	$.fn.clickToggle = function(func1, func2) {
	    var funcs = [func1, func2];
	    this.data('toggleclicked', 0);
	    this.click(function() {
	        var data = $(this).data();
	        var tc = data.toggleclicked;
	        $.proxy(funcs[tc], this)();
	        data.toggleclicked = (tc + 1) % 2;
	    });
	    return this;
	 };

	$(".navbar-toggle").clickToggle(function() {
	    $(this).addClass("active");
	    $(this).parents('.main-nav').css({'height' : wheight }).addClass('nav-overlay');
	    $(this).parents('.main-nav').css({'height' : wheight });
	    $(this).parents('.main-nav,.main-nav.inbody').find('.navbar-toggle .icon-bar-x');
	}, function() {
	    $(this).removeClass("active");
	    $(this).parents('.main-nav').css({'height' : '' }).removeClass('nav-overlay');
	    $(this).parents('.main-nav').css({'height' : '' });
	    $(this).parents('.main-nav,.main-nav.inbody').find('.navbar-toggle .icon-bar-x');
	 });

	$(".navbar-collapse").css({ 'maxHeight' : wheight - $(".navbar-header").height() + "px" });

	$(window).bind('resize', function(){
    var w = $(this).width(),
        threshold = 768;

        if(w < threshold){
            $('.nav-justified').hide().fadeIn();
        }
	});

	//place IMG into background
	  $('#main-banner img.banner-bg, #page-banner img.banner-bg, .parallax img.para-bg').each(function() {
	    var imgSrc = $(this).attr('src');
	    $(this).parent().css({'background-image' : 'url('+imgSrc+')'});
	    $(this).remove();
	  });

	//Full height Main Banner on Smartphone Screens Only
	if ($('#main-banner').width() <= 769 ){
		$('#main-banner').css('height', wheight);
	} else {
		$('#main-banner').css('height', '720');
	}

	$(window).resize(function(){
		wheight = $(window).height();
   		if ($('#main-banner').width() <= 769 ){
			$('#main-banner').css('height', wheight);
		} else {
			$('#main-banner').css('height', '720');
		}
	});

// end document ready
});
