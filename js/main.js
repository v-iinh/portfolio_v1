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
    let educationIndex = 0;
    let professionalIndex = 0;
    
    $(".education_block").hide().eq(educationIndex).show();
    $(".professional_block").hide().eq(professionalIndex).show();
    
    function showNextEducationBlock() {
        const blocks = $(".education_block");
        const visibleIndex = blocks.index(blocks.filter(":visible"));
        blocks.hide();
        educationIndex = (visibleIndex + 1) % blocks.length;
        blocks.eq(educationIndex).show();
    }

    function showNextProfessionalBlock() {
        const blocks = $(".professional_block");
        const visibleIndex = blocks.index(blocks.filter(":visible"));
        blocks.hide();
        professionalIndex = (visibleIndex + 1) % blocks.length;
        blocks.eq(professionalIndex).show();
    }

    $(".education_block button").click(function() {
        showNextEducationBlock();
    });

    $(".professional_block button").click(function() {
        showNextProfessionalBlock();
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
        close_folder();
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

// Collapse Behavior
function close_folder() {
    var currentPanel = $(this).next('.panel-collapse');
    var otherPanels = $('#accordion .panel-collapse').not(currentPanel);
    var eyeIcon = $(this).find('#eye-icon');

    if (!currentPanel.hasClass('in')) {
        currentPanel.collapse('show');

        setTimeout(function() {
            otherPanels.collapse('hide');
            eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
            // $('#accordion .panel-heading #eye-icon').removeClass('fa-eye-slash').addClass('fa-eye');
        }, 300);
    } else {
        eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
    }
}

function toggleEyeIcon(panel) {
    var eyeIcon = $(panel).find('#eye-icon');
    if (eyeIcon.hasClass('fa-eye')) {
        eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
        eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
    }
}

$('#accordion .panel-heading').on('click', function() {
    close_folder();
});

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