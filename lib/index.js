
module.exports = exports = ISEStrokeRenderer;
var raf = require( 'raf' );

function ISEStrokeRenderer( can, options ) {
  options || ( options = {} );
  var strokes = [];
  var context = can.getContext( '2d' );
  context.strokeStyle = options.strokeStyle || 'blue';
  context.lineWidth = options.lineWidth || 3;

  var scope = this;
  scope.add = add;
  scope.remove = remove;
  scope.clear = clear;
  scope.render = render;
  scope.add = add;

  function add( points ) {
    strokes.push( points );
    return strokes.length - 1;
  }

  function remove( id ) {
    return strokes.splice( id, 1 );
  }

  function clear() {
    strokes = [];
  }

  function render() {
    clearCanvas();
    strokes.forEach( drawOneStroke );
  }

  ( function() {
    var animate;
    scope.start = function() {
      animate = function() {
        raf( animate );
        render();
      }
      animate();
    }
    scope.stop = function() {
      animate = function() {};
    }
  } )()

  function clearCanvas() {
    context.clearRect( 0, 0, context.canvas.width, context.canvas.height );
  }

  function drawOneStroke( stroke ) {
    var i, len = stroke.length;
    if ( len > 2 ) {
      context.beginPath();
      context.moveTo( stroke[0].x, stroke[0].y );
      for ( i = 1; i < len; ++i ) {
        context.lineTo( stroke[i].x, stroke[i].y );
      }
      context.stroke();
    }
  }

}
