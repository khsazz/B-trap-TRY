/**
 * Created by Sazz on 1/8/2016.
 */

var options = {
    data: ["Mirpur", "Dhanmondi", "Gulshan", "Green Road", "Uttara", "Moghbazar", "Hajaribagh", "Lalmatia", "Zigatola",
            "Elephant Road", "Hatirpool", "Kalabagan", "Panthapath", "Shahbag", "Sukrabad", "Framgate", "Agargaon",
            "Kallyanpur", "Pallabi", "Shamoly", "Banani", "Baridhara", "Bashundhara", "Dhaka Cantonment", "Gulshan 2",
            "Mohakhali", "Nakhalpara", "Tejgaon", "Badda", "Banasree", "Bashabo", "Eskaton Road", "Fakirapool",
            "Farmgate", "Gandaria", "Gopibagh", "Jatrabari", "Jurain", "Kamalapur", "Kakrail", "Khilgaon", "Khilkhet",
            "Lalbagh", "Malibagh", "Motijheel", "New Eskaton", "Purana Paltan", "Ramna", "Rampura", "Shahjadpur",
            "Shanir Akhra", "Tikatuli", "Shiddeshwari"],
    theme: "blue-light",
    list: {
        maxNumberOfElements: 5,
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
    requestDelay: 250,
    placeholder: "My Location"
};
var options2 = {
    url: function(phrase) {
        return "json/getDocNames/" + phrase;
    },

    getValue: "name",
    theme: "blue-light",
    list: {
        maxNumberOfElements: 5,
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
    placeholder: "Search By Doctor Name"
};
$(document).ready(function () {
    $("#placesearch").easyAutocomplete(options);
});

function initDoctorNameSearch () {
    $("#doctorName").easyAutocomplete(options2);
}
