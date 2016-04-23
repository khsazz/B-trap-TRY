/**
 * Created by Sazz on 1/8/2016.
 */

var options = {
    data: ["Mirpur", "Dhanmondi", "Gulshan", "Green Road", "Uttara", "Moghbazar"],
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
var options2 = {
    url: function(phrase) {
        return "json/getDocNames/" + phrase;
    },

    getValue: "name",
    theme: "blue-light",
    list: {
        match: {
            enabled: true
        }
        //showAnimation: {
        //    type: "fade", //normal|slide|fade
        //    time: 200,
        //    callback: function() {}
        //},
        //
        //hideAnimation: {
        //    type: "slide", //normal|slide|fade
        //    time: 200,
        //    callback: function() {}
        //}
    },
    requestDelay: 400,
    placeholder: "Search Doctor Name"
};
$(document).ready(function () {
    $("#placesearch").easyAutocomplete(options);
});

function initDoctorNameSearch () {
    $("#doctorName").easyAutocomplete(options2);
}
