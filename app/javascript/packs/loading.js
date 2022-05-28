$(window).on('load',function(){
  $("#loading").delay(1100).fadeOut('slow');
});
var ProgressBar = require('progressbar.js');
var bar = new ProgressBar.Line(loading_text, {
    strokeWidth: 0,
    duration: 800,
    trailWidth: 0,
    text: { 
        style: {
            position:'absolute',
            left:'50%',
            top:'80%',
            margin:'0',
            transform:'translate(-50%,-50%)',
            'font-family':'sans-serif',
            'font-size':'1.5rem',
            color:'#333',
        },
        autoStyleContainer: false 
    },
    step: function(state, bar) {
        bar.setText(Math.round(bar.value() * 100) + ' %'); 
    }
});

bar.animate(1.0, function () {
    $("#loading_text").delay(0).fadeOut('fast');
});
