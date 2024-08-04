// Main Search Functionality
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById('search');
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
        }
    });

    // Timeline Search
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
});
