// Daniel, Megan, Yihan, Sardar
// November 2023

$(document).ready(function () {
    $('#mix-button').click(function () {
        var color1 = hexToRgb($('#color1').val());
        var color2 = hexToRgb($('#color2').val());
        var mixedColor = mixColors(color1, color2);
        $('#mixed-color-display').css('background-color', mixedColor).show();
    });

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function mixColors(color1, color2) {
        var r = Math.floor((color1.r + color2.r) / 2);
        var g = Math.floor((color1.g + color2.g) / 2);
        var b = Math.floor((color1.b + color2.b) / 2);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
});