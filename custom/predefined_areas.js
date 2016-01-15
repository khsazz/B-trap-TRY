/**
 * Created by Sazz on 1/8/2016.
 */

var options = {
    data: ["Banani", "Dhanmondi", "Gulshan", "Lalbag", "Mohammadpur","Mohakhali",
        "Uttara", "Motijheel", "Farmgate", "Jatrabari", "Mirpur", "Basundhara", "Baridhara", "Badda", "Khilgaon",
        "Kakrail", "Gulistan", "Sonargaon",
        "Nilkhet", "Kataban", "Shahbag", "Old Dhaka", "Paltan", "Panthapath", "Malibag", "Rajuk", "Shantinagar"],
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
