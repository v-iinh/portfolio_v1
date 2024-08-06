(function ($) {
    "use strict";
    
// Load More Projects 
$(document).ready(function () {
    var itemsToShow = 3;
    var $contentBlocks = $('.row-cols-lg-3 .col'); 
    $contentBlocks.css('display', 'none');
    $contentBlocks.slice(0, itemsToShow).css('display', 'block');

    toggleLoadMoreButton();
    $('.btn-load-more').click(function () {
        var remainingItems = $contentBlocks.length - itemsToShow;
        $contentBlocks.slice(itemsToShow, itemsToShow + Math.min(3, remainingItems)).css('display', 'block');
        itemsToShow += 3;
        toggleLoadMoreButton();
        AOS.refresh();
    });

    function toggleLoadMoreButton() {
        if (itemsToShow >= $contentBlocks.length) {
            if ($('.btn-load-more').text() === 'Close All') {
                $contentBlocks.slice(3).css('display', 'none');
                itemsToShow = 3;
                $('.btn-load-more').text('Load More');
            } 
            else {
                $('.btn-load-more').text('Close All');
            }
        } 
        else {
            $('.btn-load-more').text('Load More');
        }
    }
    AOS.init();
});

// Navbar on Scrolling
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.navbar').fadeIn('slow').css('display', 'flex');
    } else {
        $('.navbar').fadeOut('slow').css('display', 'none');
    }
});

// Smooth Scrolling on the Navbar Links
$(".navbar-nav a").on('click', function (event) {
    if (this.hash !== "") {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 45
        }, 1500, 'easeInOutExpo');
        
        if ($(this).parents('.navbar-nav').length) {
            $('.navbar-nav .active').removeClass('active');
            $(this).closest('a').addClass('active');
        }
    }
});

// Typed Initiate
if ($('.typed-text-output').length == 1) {
    var typed_strings = $('.typed-text').text();
    var typed = new Typed('.typed-text-output', {
        strings: typed_strings.split(', '),
        typeSpeed: 100,
        backSpeed: 20,
        smartBackspace: false,
        loop: true
    });
}

// Modal Video
$(document).ready(function () {
    var $mediaSrc;
    var isMusicPlaying = false;

    $('.btn-play').click(function () {
        $mediaSrc = $(this).data("src");
        toggleBackgroundMusic();
    });

    function toggleBackgroundMusic() {
        var media = $("#media")[0];
        if (isMusicPlaying) {
            media.pause();
        } else {
            media.src = $mediaSrc;
            media.play();
        }

        isMusicPlaying = !isMusicPlaying;
        var musicControl = document.getElementById("musicControl");
        musicControl.textContent = isMusicPlaying ? "Stop Music" : "Play Music";
        updateButtonIcon();
    }

    function updateButtonIcon() {
        var iconClass = isMusicPlaying ? "fas fa-pause" : "fas fa-play";
        $(".btn-play i").removeClass().addClass(iconClass).css("color", "#0bceaf");
    }
});

// Scroll to Bottom
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scroll-to-bottom').fadeOut('slow');
    } else {
        $('.scroll-to-bottom').fadeIn('slow');
    }
});

// Skills
$('.skill').waypoint(function () {
    $('.progress .progress-bar').each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
}, {offset: '80%'});

// Portfolio Isotope and Filter
var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
});
$('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('active');
    $(this).addClass('active');

    portfolioIsotope.isotope({filter: $(this).data('filter')});
});
    
// Back to Top Button
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
});
})(jQuery);

// professional Info 
var professionalTexts = [
    {
        heading: "Computer Science Intern",
        company: "Digital Ready",
        date: "2023-2023",
        details: "I was under the guidance of committed mentors during my time at Digital Ready, and built a strong foundation in IT services, Python programming, and UI/UX design."
    },
    {
        heading: "Volunteering Services",
        company: "Innerview",
        date: "2021-Present",
        details: "Granted the ZERO HERO Award, and the National Community Service Honor Award for my various services to the community in the Boston area (<a href='https://innerview.org/vinhtran' target='_blank'>Learn More</a>)."
    },
    // Add More As Needed
];

var professionalIndex = 0;
var originalProfessionalText = document.getElementById("professionalText").innerHTML;
var originalProfessionalHeading = document.querySelector(".col-lg-6:nth-child(2) .font-weight-bold").innerHTML;
var originalProfessionalCompany = document.querySelector(".col-lg-6:nth-child(2) .mb-2 strong").innerHTML;
var originalProfessionalDate = document.querySelector(".col-lg-6:nth-child(2) .mb-2 small").innerHTML;

function changeProfessionalText() {
    var professionalTextElement = document.getElementById("professionalText");
    var professionalHeadingElement = document.querySelector(".col-lg-6:nth-child(2) .font-weight-bold");
    var professionalCompanyElement = document.querySelector(".col-lg-6:nth-child(2) .mb-2 strong");
    var professionalDateElement = document.querySelector(".col-lg-6:nth-child(2) .mb-2 small");

    if (professionalIndex === professionalTexts.length) {
        professionalTextElement.innerHTML = originalProfessionalText;
        professionalHeadingElement.innerHTML = originalProfessionalHeading;
        professionalCompanyElement.innerHTML = originalProfessionalCompany;
        professionalDateElement.innerHTML = originalProfessionalDate;
        professionalIndex = 0;
    } else {
        var textObject = professionalTexts[professionalIndex];
        professionalTextElement.innerHTML = textObject.details;
        professionalHeadingElement.innerHTML = textObject.heading;
        professionalCompanyElement.innerHTML = textObject.company;
        professionalDateElement.innerHTML = textObject.date;
        professionalIndex++;
    }
}

// Education Info
var educationTexts = [
    {
        heading: "Bridge to Calculus",
        company: "Northeastern University",
        date: "2024-2024",
        details: "Studied applied mathematics at Northeastern University's Bridge to Calculus program. Covered ethical research methodology, statistics, financial analysis, and automation with Arduino."
    },
    // Add More Objects As Needed
];

var educationIndex = 0;
var originalEducationText = document.getElementById("educationText").innerHTML;
var originalEducationHeading = document.querySelector(".col-lg-6:nth-child(1) .font-weight-bold").innerHTML;
var originalEducationCompany = document.querySelector(".col-lg-6:nth-child(1) .mb-2 strong").innerHTML;
var originalEducationDate = document.querySelector(".col-lg-6:nth-child(1) .mb-2 small").innerHTML;

function changeEducationText() {
    var educationTextElement = document.getElementById("educationText");
    var educationHeadingElement = document.querySelector(".col-lg-6:nth-child(1) .font-weight-bold");
    var educationCompanyElement = document.querySelector(".col-lg-6:nth-child(1) .mb-2 strong");
    var educationDateElement = document.querySelector(".col-lg-6:nth-child(1) .mb-2 small");

    if (educationIndex === educationTexts.length) {
        educationTextElement.innerHTML = originalEducationText;
        educationHeadingElement.innerHTML = originalEducationHeading;
        educationCompanyElement.innerHTML = originalEducationCompany;
        educationDateElement.innerHTML = originalEducationDate;
        educationIndex = 0;
    } else {
        var textObject = educationTexts[educationIndex];
        educationTextElement.innerHTML = textObject.details;
        educationHeadingElement.innerHTML = textObject.heading;
        educationCompanyElement.innerHTML = textObject.company;
        educationDateElement.innerHTML = textObject.date;
        educationIndex++;
    }
}

// Prevent Inspect Element
// document.addEventListener('contextmenu', event => event.preventDefault()); 
// document.onkeydown = function(e) { 
//     if (event.keyCode == 123) { 
//         return false; 
//     } 
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
//         return false; 
//     } 
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
//         return false; 
//     } 
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){ 
//         return false; 
//     } 
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
//         return false; 
//     } 
// };

// Initialize Animate on Scroll
AOS.init();
AOS.init({
    duration: 800, 
    delay: 200,
});

// Loader Screen Visibility
function onReady(callback) {
    var bgImage = new Image();
    bgImage.onload = function() {
        var intervalId = window.setInterval(function() {
            if (document.getElementsByTagName('body')[0] !== undefined) {
                document.body.style.overflow = "";
                var homeElement = document.getElementById("home");
                homeElement.style.backgroundImage = "url('./assets/background.gif')";
                homeElement.style.transition = "background-image 0.5s ease-in-out";
                window.clearInterval(intervalId);
                callback.call(this);
            }
        }, 1000);
    };
    bgImage.src = "./assets/background.gif";
}

function setVisible(selector, visible) {
    var element = document.querySelector(selector);
    if (visible) {
        element.classList.remove('loader_fade');
        element.style.display = 'block';
    } else {
        element.classList.add('loader_fade');
    }
}

onReady(function() {
    setVisible('.container', true);
    setVisible('#loader', false);
});

window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    loader.style.opacity = 0;
    
    setTimeout(function() {
        if (loader.style.opacity == 0) {
            loader.style.display = 'none';
        }
    }, 2000);
});

// Searchbar Toggle
$('#searchbar-icon').click(function() {
    $('#search').animate({width: 'toggle'}, function() {
        $('#search').toggleClass('active');
    });
    $("#searchbar-icon").hide();
    $("#searchbar-cross").show();
});

$('#searchbar-cross').click(function() {
    $('#search').animate({width: 'toggle'}, function() {
        $('#search').toggleClass('active');
    });
    $("#searchbar-cross").hide();
    $("#searchbar-icon").show();
});