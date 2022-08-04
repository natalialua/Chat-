const expandSection = function() {
    "use strict";

    $("#startContainer, #contact, #help").css("margin-top", $(".navbar-header").outerHeight(true) + 10 + "px");
    $("#chatButtons").css("top", $(".navbar-header").outerHeight(true) + 10 + "px");
    $("#chat").css("margin-top", $(".navbar-header").outerHeight(true) + $("#chatButtons").outerHeight(true) + 10 + "px");


    $("#chat").css("margin-bottom", $("#messageForm").outerHeight(true) + 10 + "px");
    $("#notificationsContainer").css("margin-bottom", $("#messageForm").outerHeight(true) + 2 + "px");

    
    $("#startContainer").height("auto");
    var height = $("#startContainer").outerHeight(true);

 
    if (height < $(window).height()) {

      
        $("#startContainer").height(($(window).height() - height) + $("#startContainer").height());
    }
};

$(window).on("load orientationchange resize", expandSection);