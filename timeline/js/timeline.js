(function() {
  var HorizontalTimeline = function(element) {
		this.element = element;
		this.datesContainer = this.element.getElementsByClassName('cd-h-timeline__dates')[0];
		this.line = this.datesContainer.getElementsByClassName('cd-h-timeline__line')[0]; // Grey Line on Top
		this.fillingLine = this.datesContainer.getElementsByClassName('cd-h-timeline__filling-line')[0]; // Green Filling Line
		this.date = this.line.getElementsByClassName('cd-h-timeline__date');
		this.selectedDate = this.line.getElementsByClassName('cd-h-timeline__date--selected')[0];
		this.dateValues = parseDate(this);
		this.minLapse = calcMinLapse(this);
		this.navigation = this.element.getElementsByClassName('cd-h-timeline__navigation');
		this.contentWrapper = this.element.getElementsByClassName('cd-h-timeline__events')[0];
		this.content = this.contentWrapper.getElementsByClassName('cd-h-timeline__event');
		
		this.eventsMinDistance = 60; // Min Distance Between Events
		this.eventsMaxDistance = 200; // Max Distance Between Events
		this.translate = 0; // Store Translate Value
		this.lineLength = 0; // Total Length
		
		// Store Index
		this.oldDateIndex = Util.getIndexInArray(this.date, this.selectedDate);
		this.newDateIndex = this.oldDateIndex;

		initTimeline(this);
		initEvents(this);
  };

  function initTimeline(timeline) {
  	// Set Dates Left Position
  	var left = 0;
		for (var i = 0; i < timeline.dateValues.length; i++) { 
			var j = (i == 0) ? 0 : i - 1;
	    var distance = daydiff(timeline.dateValues[j], timeline.dateValues[i]),
	    	distanceNorm = (Math.round(distance/timeline.minLapse) + 2)*timeline.eventsMinDistance;
	
	    if(distanceNorm < timeline.eventsMinDistance) {
	    	distanceNorm = timeline.eventsMinDistance;
	    } else if(distanceNorm > timeline.eventsMaxDistance) {
	    	distanceNorm = timeline.eventsMaxDistance;
	    }
	    left = left + distanceNorm;
	    timeline.date[i].setAttribute('style', 'left:' + left+'px');
		}
		
		// Set Dimensions
    timeline.line.style.width = (left + timeline.eventsMinDistance)+'px';
		timeline.lineLength = left + timeline.eventsMinDistance;
		// Reveal Timeline
		Util.addClass(timeline.element, 'cd-h-timeline--loaded');
		selectNewDate(timeline, timeline.selectedDate);
		resetTimelinePosition(timeline, 'next');
  };

  function initEvents(timeline) {
  	var self = timeline;
		// Arrow Navigation
		self.navigation[0].addEventListener('click', function(event){
			event.preventDefault();
			translateTimeline(self, 'prev');
		});
		self.navigation[1].addEventListener('click', function(event){
			event.preventDefault();
			translateTimeline(self, 'next');
		});

		// Swipe Timeline
		new SwipeContent(self.datesContainer);
		self.datesContainer.addEventListener('swipeLeft', function(event){
			translateTimeline(self, 'next');
		});
		self.datesContainer.addEventListener('swipeRight', function(event){
			translateTimeline(self, 'prev');
		});

		// Select Event
		for(var i = 0; i < self.date.length; i++) {
			(function(i){
				self.date[i].addEventListener('click', function(event){
					event.preventDefault();
					selectNewDate(self, event.target);
				});

				self.content[i].addEventListener('animationend', function(event){
					if( i == self.newDateIndex && self.newDateIndex != self.oldDateIndex) resetAnimation(self);
				});
			})(i);
		}
  };

  function updateFilling(timeline) { // Update Scale Value
		var dateStyle = window.getComputedStyle(timeline.selectedDate, null),
			left = dateStyle.getPropertyValue("left"),
			width = dateStyle.getPropertyValue("width");
		
		left = Number(left.replace('px', '')) + Number(width.replace('px', ''))/2;
		timeline.fillingLine.style.transform = 'scaleX('+(left/timeline.lineLength)+')';
	};

  function translateTimeline(timeline, direction) { // Translate Date ELements
  	var containerWidth = timeline.datesContainer.offsetWidth;
  	if(direction) {
  		timeline.translate = (direction == 'next') ? timeline.translate - containerWidth + timeline.eventsMinDistance : timeline.translate + containerWidth - timeline.eventsMinDistance;
  	}
    if( 0 - timeline.translate > timeline.lineLength - containerWidth ) timeline.translate = containerWidth - timeline.lineLength;
    if( timeline.translate > 0 ) timeline.translate = 0;

    timeline.line.style.transform = 'translateX('+timeline.translate+'px)';
    // Update Navigation Status
		(timeline.translate == 0 ) ? Util.addClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');
		(timeline.translate == containerWidth - timeline.lineLength ) ? Util.addClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');
  };

	function selectNewDate(timeline, target) { // Update Timeline
		timeline.newDateIndex = Util.getIndexInArray(timeline.date, target);
		timeline.oldDateIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
		Util.removeClass(timeline.selectedDate, 'cd-h-timeline__date--selected');
		Util.addClass(timeline.date[timeline.newDateIndex], 'cd-h-timeline__date--selected');
		timeline.selectedDate = timeline.date[timeline.newDateIndex];
		updateOlderEvents(timeline);
		updateVisibleContent(timeline);
		updateFilling(timeline);
	};

	function updateOlderEvents(timeline) { // Update Older Events
		for(var i = 0; i < timeline.date.length; i++) {
			(i < timeline.newDateIndex) ? Util.addClass(timeline.date[i], 'cd-h-timeline__date--older-event') : Util.removeClass(timeline.date[i], 'cd-h-timeline__date--older-event');
		}
	};

	function updateVisibleContent(timeline) { // Show Content of Selected Date
		if (timeline.newDateIndex > timeline.oldDateIndex) {
			var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-right',
				classLeaving = 'cd-h-timeline__event--leave-left';
		} else if(timeline.newDateIndex < timeline.oldDateIndex) {
			var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-left',
				classLeaving = 'cd-h-timeline__event--leave-right';
		} else {
			var classEntering = 'cd-h-timeline__event--selected',
				classLeaving = '';
		}

		Util.addClass(timeline.content[timeline.newDateIndex], classEntering);
		if (timeline.newDateIndex != timeline.oldDateIndex) {
			Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--selected');
			Util.addClass(timeline.content[timeline.oldDateIndex], classLeaving);
			timeline.contentWrapper.style.height = timeline.content[timeline.newDateIndex].offsetHeight + 'px';
		}
	};

	function resetAnimation(timeline) { // Reset Content
		timeline.contentWrapper.style.height = null;
		Util.removeClass(timeline.content[timeline.newDateIndex], 'cd-h-timeline__event--enter-right cd-h-timeline__event--enter-left');
		Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--leave-right cd-h-timeline__event--leave-left');
	};

	function keyNavigateTimeline(timeline, direction) { // Navigate the Timeline
		var newIndex = (direction == 'next') ? timeline.newDateIndex + 1 : timeline.newDateIndex - 1;
		if(newIndex < 0 || newIndex >= timeline.date.length) return;
		selectNewDate(timeline, timeline.date[newIndex]);
		resetTimelinePosition(timeline, direction);
	};
	
	function resetTimelinePosition(timeline, direction) { // Translate Timeline
		var eventStyle = window.getComputedStyle(timeline.selectedDate, null),
			eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
			timelineWidth = timeline.datesContainer.offsetWidth;

    if( (direction == 'next' && eventLeft >= timelineWidth - timeline.translate) || (direction == 'prev' && eventLeft <= - timeline.translate) ) {
    	timeline.translate = timelineWidth/2 - eventLeft;
    	translateTimeline(timeline, false);
    }
  };

  function parseDate(timeline) { // Timestamp Value
		var dateArrays = [];
		for(var i = 0; i < timeline.date.length; i++) {
			var singleDate = timeline.date[i].getAttribute('data-date'),
				dateComp = singleDate.split('T');
			
			if( dateComp.length > 1 ) { // Both DD/MM/YEAR and Time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { // Only Time is Provided
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //Only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		}
	  return dateArrays;
  };

  function calcMinLapse(timeline) { // Determine Minimum Distance
		var dateDistances = [];
		for(var i = 1; i < timeline.dateValues.length; i++) { 
	    var distance = daydiff(timeline.dateValues[i-1], timeline.dateValues[i]);
	    if(distance > 0) dateDistances.push(distance);
		}

		return (dateDistances.length > 0 ) ? Math.min.apply(null, dateDistances) : 86400000;
	};

	function daydiff(first, second) { // Time Distance
		return Math.round((second-first));
	};

  window.HorizontalTimeline = HorizontalTimeline;

  var horizontalTimeline = document.getElementsByClassName('js-cd-h-timeline'),
  	horizontalTimelineTimelineArray = [];
  if(horizontalTimeline.length > 0) {
		for(var i = 0; i < horizontalTimeline.length; i++) {
			horizontalTimelineTimelineArray.push(new HorizontalTimeline(horizontalTimeline[i])); 
		}
		// Navigate Timeline
		document.addEventListener('keydown', function(event){
			if( (event.keyCode && event.keyCode == 39) || ( event.key && event.key.toLowerCase() == 'arrowright') ) {
				updateHorizontalTimeline('next'); // Next
			} else if((event.keyCode && event.keyCode == 37) || ( event.key && event.key.toLowerCase() == 'arrowleft')) {
				updateHorizontalTimeline('prev'); // Prev
			}
		});
  };

  function updateHorizontalTimeline(direction) {
		for(var i = 0; i < horizontalTimelineTimelineArray.length; i++) {
			if(elementInViewport(horizontalTimeline[i])) keyNavigateTimeline(horizontalTimelineTimelineArray[i], direction);
		}
  };

	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}
}());