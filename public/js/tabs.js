/* source: http://inspirationalpixels.com/tutorials/creating-tabs-with-html-css-and-jquery */

jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
        
        if (currentAttrValue == "#tab-budgets" || currentAttrValue == "#tab-rapports") {
        	// pas encore implanté
        	return;
        }
        
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        // remove unpleasant focus
        jQuery(this).focus().blur();

        e.preventDefault();
    });
});