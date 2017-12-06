/**
 * Pseudo-class that encapsulates project forecast-related processing logic.
 * @param list list of project forecasts, as returned by REST api
 * @returns nothing directly... meant to be instantiated with new
 */
function Previsions(list, projet) {
	/** liste de previsions */
	this.list = list;
	/** projet auquel sont associées ces prévisions */
	this.projet = projet;
	
	/** helpful alias to be used from within callbacks ('this' can be confusing) */
	var previsions = this;
	
	/** HTML select element for current period */
	this.htmlSelect = $("#id-sel-periode");

	/** display forecast information in appropriate tab */
	this.displayPrevision = function(prevision, index) {

		// string that should prefix ids of target input elements
		var prefix = "id-pre" + index + "-";
		
		// loop through all input fields in this tab
		$(".tab-prevision-"+index).each(function() {
			
			// get element id
			var id = $(this).attr('id');
			if (id.startsWith(prefix)) {
				// extract prefix to get property name
				var prop = id.substr(prefix.length);
				
				// does this property exist on prevision ?
				var value = prevision[prop];
				if (value) {
					// update document field
					$("#"+id).val(value).show();
				}
				else {
					// hide field row for which there is no forecast value
					var closest = $("#"+id).closest("tr").hide();
				}
			}
		});
	}

	this.displayPrevisions = function(previsions) {
		for (var i = 1; i <= previsions.length; i++){
			this.displayPrevision(previsions[i-1], i);
		}
	}
	
	/** specified period has been selected */
	this.onSelect = function(index) {
		// fill in project data
		var newPeriode = regions.organismes.projets.current.periodes[index];

		// ramasser toutes les prévisions à traiter pour la période courante
		// une pour chaque activité
		var aTraiter = [];
		for(var i = 0; i < this.list.length; i++) {
			var prevision = this.list[i];
			
			if (prevision.periode.dateFrom == newPeriode.dateFrom
			    && prevision.periode.dateTo == newPeriode.dateTo) {
				// need to display this one
				aTraiter.push(prevision);
			}
		}		
		previsions.displayPrevisions(aTraiter);
	}

	this.displayTabs = function(projet) {
		// display and/or hide activity tabs
		var nbTabs = 4;
		var nbActivities = projet.activites.length;
		for (var i = 1; i <= nbTabs; i++) {
			if (i <= nbActivities) {
				// refresh title
				$('#tab-' + i + ' a').text(i + ' - ' + new Activite(projet.activites[i-1]).text());
				// show tab
				$('#tab-' + i).show();
			}
			else {
				// hide tab i
				$('#tab-' + i).hide();
			}
		}
	}
	
	this.initSelection = function(projet) {
		// start with empty listbox
		this.htmlSelect.empty();
		// ...and also remove any previously attached event handler
		this.htmlSelect.off();
		
		// add appropriate select options
		for (var i = 0; i < projet.periodes.length; i++) {
			var periode = projet.periodes[i];
			
			// transformer periode en string
			var text = formatDates(periode.dateFrom, periode.dateTo);

			// append option to select
			this.htmlSelect.append(new Option(text, i));
		}

		// attach event handler
		this.htmlSelect.change(function(data) {
			// reflect new selection in document
			previsions.onSelect($("#id-sel-periode option:selected").index());
		});

		// keep initial selection
		this.onSelect(0);
	}
	
	this.updateSelection = function(projet) {
		$("#id-sel-periode > option").each(function(index) {
			var periode = projet.periodes[index];
			
			if (periode) {
				// transformer periode en string
				var text = formatDates(periode.dateFrom, periode.dateTo);
				
				// show it
				$(this).text(text);
			}
			else {
				console.log('...OOPS!! projet: ' + JSON.stringify(projet));
			}
		});
	}
	
	/** refresh display (for example, after language change event) */
	this.refresh = function() {
		if (regions)
			if (regions.organismes)
				if (regions.organismes.projets)
					if (regions.organismes.projets.current) {
						// update select box contents
						this.updateSelection(regions.organismes.projets.current);
						// and also tab headers
						this.displayTabs(regions.organismes.projets.current);
					}
	}

	this.init = function() {
		if (regions)
			if (regions.organismes)
				if (regions.organismes.projets)
					if (regions.organismes.projets.current) {
						// initialize select box contents
						this.initSelection(regions.organismes.projets.current);
						// display tab headers
						this.displayTabs(regions.organismes.projets.current);
					}
	}
	
	this.init();
}

/** 
 * code to execute upon document load 
 */
$(document).ready(function(){
	// register to process language change events
	$("html").on("change", function() {
		if (regions)
			if (regions.organismes)
				if (regions.organismes.projets)
					if (regions.organismes.projets.current)
						if (regions.organismes.projets.current.previsions)
							// redisplay tabs and select box
							regions.organismes.projets.current.previsions.refresh();
	});
});
