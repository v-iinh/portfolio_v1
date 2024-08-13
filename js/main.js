$(document).ready(function() {
    loadExperiences()
    loadProjects()
    musicToggle()
})

$(document).scroll(function() {
    scrollNav()
    scrollBottom()
    scrollTop()
})

// Load More Experiences
function loadExperiences() {
    function updateIndexes() {
        educationIndex = $(".education_block").index($(".education_block:visible"));
        professionalIndex = $(".professional_block").index($(".professional_block:visible"));
    }
    updateIndexes();

    $(".professional_block").hide().slice(0, 1).show();
    $(".education_block").hide().slice(0, 1).show();
    
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

    $(".education_block button").click(function() {
        showNextEducationBlock();
        updateIndexes(); 
    });

    $(".professional_block button").click(function() {
        showNextProfessionalBlock();
        updateIndexes(); 
    });

    $(document).on('searchComplete', function() {
        updateIndexes();
    });
}

// Load More Projects 
function loadProjects(){
    var $contentBlocks = $('.my-3');
    var $loadMoreBtn = $('#loadMoreBtn');
    var initialVisibleCount = 3;

    $contentBlocks.hide().slice(0, initialVisibleCount).show();
    toggleLoadMoreButton();

    $loadMoreBtn.click(function() {
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
}

// Music Functionality
function musicToggle(){
    var $mediaSrc;
    var isMusicPlaying = false;

    $('.btn-play').click(function() {
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
}

// Navbar on Scrolling
function scrollNav(){
    if ($(this).scrollTop() > 200) {
        $('.navbar').fadeIn('slow').css('display', 'flex');
    } else {
        $('.navbar').fadeOut('slow').css('display', 'none');
    }
}

// Scroll to Bottom
function scrollBottom(){
    if ($(this).scrollTop() > 100) {
        $('.scroll-to-bottom').fadeOut('slow');
    } else {
        $('.scroll-to-bottom').fadeIn('slow');
    }
}

// Back to Top Button
function scrollTop(){
    if ($(this).scrollTop() > 200) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
}

$('.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
});

// Smooth Scrolling on the Navbar Links
$(".navbar-nav a").on('click', function(event) {
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

// Portfolio Isotope and Filter
var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
});

$('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('active');
    $(this).addClass('active');

    portfolioIsotope.isotope({
        filter: $(this).data('filter')
    });
});

// Initialize Animate on Scroll
AOS.init({
    duration: 800,
    delay: 200,
});