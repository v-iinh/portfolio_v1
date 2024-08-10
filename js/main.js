(function ($) {
    "use strict";
    
// Load More Projects 
$(document).ready(function () {
    var $contentBlocks = $('.my-3');
    var $loadMoreBtn = $('#loadMoreBtn');
    var initialVisibleCount = 3;

    $contentBlocks.hide().slice(0, initialVisibleCount).show();
    toggleLoadMoreButton();

    $loadMoreBtn.click(function () {
        var $contentBlocks = $('.my-3');
        var $hiddenBlocks = $contentBlocks.filter(':hidden');
        var $nextToShow = $hiddenBlocks.slice(0, initialVisibleCount);

        $nextToShow.each(function() {
            $(this).hide().slideDown(250);
        });
        toggleLoadMoreButton();
        AOS.refresh();
    });

    function toggleLoadMoreButton() {
        var $contentBlocks = $('.my-3');
        var visibleItems = $contentBlocks.filter(':visible').length;

        if (visibleItems >= $contentBlocks.length) {
            if ($loadMoreBtn.text() === 'Close All') {
                $contentBlocks.slice(initialVisibleCount).hide();
                $loadMoreBtn.text('Load More');
            } else {
                $loadMoreBtn.text('Close All');
            }
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

// Experience Section
$(document).ready(function() {
    let educationIndex = 0;
    let professionalIndex = 0;

    $(".professional_block").hide().slice(0, 1).show();
    $(".education_block").hide().slice(0, 1).show();
    AOS.refresh();

    function showNextEducationBlock() {
        $(".education_block").hide();
        educationIndex = (educationIndex + 1) % $(".education_block").length; 
        $(".education_block").eq(educationIndex).show();
    }

    function showNextProfessionalBlock() {
        $(".professional_block").hide(); 
        professionalIndex = (professionalIndex + 1) % $(".professional_block").length; 
        $(".professional_block").eq(professionalIndex).show(); 
    }

    $("button[onclick*='changeText'][onclick*='education']").click(function() {
        showNextEducationBlock();
    });

    $("button[onclick*='changeText'][onclick*='professional']").click(function() {
        showNextProfessionalBlock();
    });
});

// Prevent Inspect Element
document.addEventListener('contextmenu', event => event.preventDefault()); 
document.onkeydown = function(e) { 
    if (event.keyCode == 123) { 
        return false; 
    } 
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
        return false; 
    } 
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
        return false; 
    } 
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){ 
        return false; 
    } 
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
        return false; 
    } 
};

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
$(document).ready(function(){
    $('#searchbar-icon').click(function(){
    $('#search').animate({width: 'toggle'});
    $("#searchbar-icon").toggle();
    $("#searchbar-cross").toggle();
    });
    
    $('#searchbar-cross').click(function(){
    $('#search').animate({width: 'toggle'});
    $("#searchbar-cross").toggle();
    $("#searchbar-icon").toggle();
    });
});

// Change Theme
let hueRotation = 0;
let intervalId;
let lastRightClickTime = 0;

function updateFilters() {
    const currentFilter = document.documentElement.style.filter;
    const hasInvert = currentFilter.includes("invert(1)");
    const filterValue = hasInvert
        ? `invert(1) hue-rotate(${hueRotation}deg)`
        : `hue-rotate(${hueRotation}deg)`;

    document.documentElement.style.filter = filterValue;
    document.querySelectorAll("img, picture, video").forEach((mediaItem) => {
        const mediaFilterValue = hasInvert
            ? `invert(1) hue-rotate(${360 - hueRotation}deg)`
            : `hue-rotate(${360 - hueRotation}deg)`;
        mediaItem.style.filter = mediaFilterValue;
    });
}

document.addEventListener('mousedown', function(event) {
    if (event.button === 2) {
        const currentTime = new Date().getTime();
        if (currentTime - lastRightClickTime < 300) {
            const currentFilter = document.documentElement.style.filter;
            if (currentFilter.includes("invert(1)")) {
                document.documentElement.style.filter = currentFilter.replace("invert(1)", "").trim();
                document.querySelector('.img-fluid').style.borderColor = "white"
            } else {
                document.documentElement.style.filter = currentFilter + " invert(1)";
                document.querySelector('.img-fluid').style.borderColor = "black"
            }
            updateFilters(); 
        }
        lastRightClickTime = currentTime;

        if (!intervalId) {
            intervalId = setInterval(() => {
                hueRotation = (hueRotation + 1) % 360;
                updateFilters(); 
            }, 20);
        }
    }
});

document.addEventListener('mouseup', function(event) {
    if (event.button === 2 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
