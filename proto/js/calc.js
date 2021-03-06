/**
 * @title WET-BOEW Hello world plugin
 * @overview Plugin contained to show an example of how to create your custom WET plugin
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 */
( function( $, window, wb ) {
  "use strict";
  /*
   * Variable and function definitions.
   * These are global to the plugin - meaning that they will be initialized once per page,
   * not once per instance of plugin on the page. So, this is a good place to define
   * variables that are common to all instances of the plugin on a page.
   */

  // function that should be moved as a helper class or something
  const toMoney = new Intl.NumberFormat(wb.lang + "-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  var componentName = "wb-calc",
      selector = "." + componentName,
      initEvent = "wb-init" + selector,
      $document = wb.doc,
      defaults = {},

    /**
     * @method init
     * @param {jQuery Event} event Event that triggered the function call
     */
    init = function( event ) {
      // Start initialization
      // returns DOM object = proceed with init
      // returns undefined = do not proceed with init (e.g., already initialized)
      
      var elm = wb.init( event, componentName, selector ),
          $elm,
          settings;

      if ( elm ) {
        $elm = $( elm );
        // ... Do the plugin initialisation
        // Get the plugin JSON configuration set on attribute data-wb-helloworld
        settings = $.extend(
          true,
          {},
          defaults,
          window[ componentName ],
          wb.getData( $elm, componentName )
        );

        // Call my custom event
        $elm.trigger( "change", settings );
        // Identify that initialization has completed
        wb.ready( $elm, componentName );
      }
    };

  // Add your plugin event handler
  $document.on( "change", "input", function( event ) {
    var elm = event.currentTarget,
        $elm = $( elm ),
        $elmId = $elm.attr("id"),
        data = wb.getData( $("output[for='" + $elmId + "']"), componentName),
        value = $elm.val().replace(/\,\s/g,''),
        total = 0; // Needs to be replaced by data.expr evaluation

    if(data.expr) {

      if (data.format === "currency") {
        $("output[for='" + $elmId + "']").html( toMoney.format(value * 1 ) );
      } else {
        $("output[for='" + $elmId + "']").html( value * 1 );
      };
    }
    
    total = ($("#p2c-cews").val() * 1) + ($("#p3-ei").val() * 1) + ($("#p3-cpp").val() * 1) - ($("#p4-tws").val() * 1) - ($("#p4-wsb").val() * 1);
    if(total < 0) {
      $("[for='p2c-cews p3-ei p3-cpp p4-tws p4-wsb']").html( toMoney.format(0) );
    } else {
      $("[for='p2c-cews p3-ei p3-cpp p4-tws p4-wsb']").html( toMoney.format(total) );
    };
  });

  $document.on("change", selector, function( event, data ) {
    var elm = event.currentTarget,
        $elm = $( elm ),
        $input = $("#" + $elm.attr("for")),
        value = $input.val();

    if (data && data.format === "currency") {
      $elm.html( toMoney.format(value * 1) );
    } else {
      $elm.html( value * 1 );  
    };
    $("[for='p2c-ee p2c-pyrl p2c-cews p3-ei p3-cpp p4-tws p4-wsb']").html(toMoney.format(0)); // To retire
  } );
  // Bind the init event of the plugin
  $document.on( "timerpoke.wb " + initEvent, selector, init );
  // Add the timer poke to initialize the plugin
  wb.add( selector );
  } )( jQuery, window, wb );

  // TODO: Intercept the submit button to make sure all field are filled :done:
  // TODO: Add formvalid to the form :done:
  // TODO: Escape commas and whitespaces in input[type=number] in IE and Edge(Trident)