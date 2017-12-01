/* source: http://inspirationalpixels.com/tutorials/creating-tabs-with-html-css-and-jquery */

jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
        
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        // remove unpleasant focus
        jQuery(this).focus().blur();

        e.preventDefault();
    });
    
	// register to process language change events
	$("html").on("change", function() {
		updateDocLang('organisme.json');
		updateDocLang('previsions.json');
	});
});