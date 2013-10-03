
var arrgen = require( 'arr-gen' );
var StrokeRenderer = require( 'ise-stroke-renderer' );
var can = document.getElementById( 'main' );

var strokeRenderer = new StrokeRenderer( can );

var s1 = arrgen( 100, function( i ) {
  return {
    x: i,
    y: i
  };
} );

id = strokeRenderer.add( s1 );
// strokeRenderer.render();

strokeRenderer.start();
