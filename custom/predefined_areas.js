/**
 * Created by Sazz on 1/8/2016.
 */

var options = {
    data: ["Mirpur", "Dhanmondi", "Gulshan", "Green Road"],
    theme: "blue-light",
    list: {
        match: {
            enabled: true
        },
        showAnimation: {
            type: "fade", //normal|slide|fade
            time: 200,
            callback: function() {}
        },

        hideAnimation: {
            type: "slide", //normal|slide|fade
            time: 200,
            callback: function() {}
        }
    },
    requestDelay: 300,
    placeholder: "My Location"
};
$(document).ready(function () {
    $("#placesearch").easyAutocomplete(options);
});
