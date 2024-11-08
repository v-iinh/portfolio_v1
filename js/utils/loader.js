// Loader Screen Visibility
function onReady(callback) {
    loadSettings()
    var bgImage = new Image();
    bgImage.onload = function() {
        var intervalId = window.setInterval(function() {
            if (document.getElementsByTagName('body')[0] !== undefined) {
                document.body.style.overflow = "";
                var homeElement = document.getElementById("home");
                homeElement.style.backgroundImage = "url('./assets/media/background.gif')";
                homeElement.style.transition = "background-image 0.5s ease-in-out";
                window.clearInterval(intervalId);
                callback.call(this);
            }
        }, 1000);
    };
    bgImage.src = "./assets/media/background.gif";
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