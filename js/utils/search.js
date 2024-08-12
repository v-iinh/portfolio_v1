// Search Initialized
let input = document.getElementById('search');
let results = 0;

document.addEventListener("DOMContentLoaded", function(){
    timelineSearch();
    experienceSearch();
    projectsSearch(); 
})

// Searchbar Toggle
$(document).ready(function() {
    $('#searchbar-icon').click(function() {
        $('#search').animate({
            width: 'toggle'
        });
        $("#searchbar-icon").toggle();
        $("#searchbar-cross").toggle();
    });

    $('#searchbar-cross').click(function() {
        $('#search').animate({
            width: 'toggle'
        });
        $("#searchbar-cross").toggle();
        $("#searchbar-icon").toggle();
    });
});

// Search Filter for Timeline
function timelineSearch() {
    const events = document.getElementsByClassName('cd-h-timeline__event');
    const dates = document.getElementsByClassName('cd-h-timeline__date');
    const timelineInstance = new HorizontalTimeline(document.querySelector('.js-cd-h-timeline'));
    let searchResults = [];
    let currentIndex = -1;

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchResults = [];
            for (let i = 0; i < dates.length; i++) {
                if (events[i].innerText.toLowerCase().includes(input.value.toLowerCase())) {
                    searchResults.push(dates[i]);
                }
            }
            if (searchResults.length > 0) {
                currentIndex = (currentIndex + 1) % searchResults.length;
                selectNewDate(timelineInstance, searchResults[currentIndex]);
            }
            results = 0;
            results += searchResults.length;
        }
    })

    function selectNewDate(timeline, target) {
        timeline.newDateIndex = Util.getIndexInArray(timeline.date, target);
        timeline.oldDateIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
        if (timeline.selectedDate) {
            Util.removeClass(timeline.selectedDate, 'cd-h-timeline__date--selected');
        }
        Util.addClass(timeline.date[timeline.newDateIndex], 'cd-h-timeline__date--selected');
        timeline.selectedDate = timeline.date[timeline.newDateIndex];
    
        updateOlderEvents(timeline);
        updateVisibleContent(timeline);
        updateFilling(timeline);
        scrollToSelectedDate(timeline);
    }
    
    function scrollToSelectedDate(timeline) {
        var selectedDateStyle = window.getComputedStyle(timeline.selectedDate, null);
        var selectedDateLeft = parseFloat(selectedDateStyle.getPropertyValue('left').replace('px', ''));
        var containerWidth = timeline.datesContainer.offsetWidth;
        var offset = selectedDateLeft - (containerWidth / 2) + (timeline.selectedDate.offsetWidth / 2);
        timeline.translate = Math.min(0, Math.max(-timeline.lineLength + containerWidth, -offset));
        translateTimeline(timeline);
    }
    
    function translateTimeline(timeline) {
        var containerWidth = timeline.datesContainer.offsetWidth;
        timeline.line.style.transform = 'translateX(' + timeline.translate + 'px)';
        
        if (timeline.translate === 0) {
            Util.addClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');
        } else {
            Util.removeClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');
        }
        
        if (timeline.translate <= containerWidth - timeline.lineLength) {
            Util.addClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');
        } else {
            Util.removeClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');
        }
    }
    
    function updateFilling(timeline) {
        var dateStyle = window.getComputedStyle(timeline.selectedDate, null),
            left = dateStyle.getPropertyValue("left"),
            width = dateStyle.getPropertyValue("width");
        
        left = Number(left.replace('px', '')) + Number(width.replace('px', '')) / 2;
        timeline.fillingLine.style.transform = 'scaleX(' + (left / timeline.lineLength) + ')';
    }
    
    function updateOlderEvents(timeline) {
        for (var i = 0; i < timeline.date.length; i++) {
            (i < timeline.newDateIndex) ? Util.addClass(timeline.date[i], 'cd-h-timeline__date--older-event') : Util.removeClass(timeline.date[i], 'cd-h-timeline__date--older-event');
        }
    }
    
    function updateVisibleContent(timeline) {
        if (timeline.newDateIndex > timeline.oldDateIndex) {
            var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-right',
                classLeaving = 'cd-h-timeline__event--leave-left';
        } else if (timeline.newDateIndex < timeline.oldDateIndex) {
            var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-left',
                classLeaving = 'cd-h-timeline__event--leave-right';
        } else {
            var classEntering = 'cd-h-timeline__event--selected',
                classLeaving = '';
        }
        Util.addClass(timeline.content[timeline.newDateIndex], classEntering);
        if (timeline.newDateIndex !== timeline.oldDateIndex) {
            Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--selected');
            Util.addClass(timeline.content[timeline.oldDateIndex], classLeaving);
            timeline.contentWrapper.style.height = timeline.content[timeline.newDateIndex].offsetHeight + 'px';
        }
    }    
}

// Search Filter for Experience
function experienceSearch() {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const education = Array.from(document.getElementsByClassName("education_block"));
            const professional = Array.from(document.getElementsByClassName("professional_block"));
            const searchTerm = input.value.toLowerCase();

            let firstEducationMatch = true;
            let firstProfessionalMatch = true;
            let educationVisible = false;
            let professionalVisible = false;

            education.forEach((block) => {
                let idx = 0;
                if (block.innerText.toLowerCase().includes(searchTerm)) {
                    results += 1
                    block.style.display = "";
                    block.parentNode.insertBefore(block, education[idx]);
                    idx++
                    if (firstEducationMatch) {
                        firstEducationMatch = false; 
                    } else {
                        block.parentNode.insertBefore(block, education[idx]);
                        idx++
                        block.style.display = "none"; 
                    }
                    educationVisible = true; 
                } else {
                    block.style.display = "none"; 
                }
            });

            if (!educationVisible) {
                education[0].style.display = "";
            }

            professional.forEach((block) => {
                let idx = 0;
                if (block.innerText.toLowerCase().includes(searchTerm)) {
                    results += 1
                    block.style.display = "";
                    block.parentNode.insertBefore(block, professional[idx]);
                    idx++
                    if (firstProfessionalMatch) {
                        firstProfessionalMatch = false;
                    } else {
                        block.parentNode.insertBefore(block, professional[idx]);
                        idx++
                        block.style.display = "none";
                    }
                    professionalVisible = true; 
                } else {
                    block.style.display = "none";
                }
            });

            if (!professionalVisible) {
                professional[0].style.display = "";
            }
        }
    });
}

// Search Filter for Projects
function projectsSearch() {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const cards = Array.from(document.getElementsByClassName("my-3"));
            const parentElement = cards[0].parentNode;
            const query = input.value.toLowerCase();
            const matchedCards = [];
            const otherCards = [];
            let initialDisplayCount = 0;

            cards.forEach(card => {
                if (getComputedStyle(card).display === "block") {
                    initialDisplayCount++;
                }
            });

            cards.forEach(card => {
                if (card.innerText.toLowerCase().includes(query)) {
                    matchedCards.push(card);
                } else {
                    otherCards.push(card);
                }
            });

            while (parentElement.firstChild) {
                parentElement.removeChild(parentElement.firstChild);
            }

            matchedCards.forEach(card => {
                parentElement.appendChild(card);
            });

            otherCards.forEach(card => {
                parentElement.appendChild(card);
            });

            const allCards = [...matchedCards, ...otherCards];
            allCards.forEach((card, index) => {
                if (index < initialDisplayCount) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
            results += matchedCards.length;
            displayResults()
        }
    });
}

// Display the Results
function displayResults() {
    const tempVal = input.value;
    const resultText = `${results} Result${results === 1 ? '' : 's'}`;

    input.disabled = true;    
    input.value = "";
    input.placeholder = resultText;
    
    setTimeout(() => {
        input.value = tempVal;
        input.placeholder = "";
        input.disabled = false;
        input.focus();
    }, 1000);
}