var helpers = {
    init: function () {
        $.material.init();
        if ($('[data-toggle="tooltip"]').length > 0)
            $('[data-toggle="tooltip"]').tooltip();

        var $search = $(".search-card");
        $(".take-search").focusin(function () {
            $search.toggleClass("search-focus");
            $search.find("i.fa-times").toggleClass("hidden");
        })
        $(".take-search").focusout(function () {
            $search.toggleClass("search-focus");
            $search.find("i.fa-times").toggleClass("hidden");
        })
    },
    constants: {
        isOpenMenu: true,
        menu: $("#menu"),
        content: $("#content")
    },
    server: "http://localhost:8081/",
    toServer: function (method, url, data, successCalback, errorCalback) {
        $.ajax({
            url: this.server + url,
            data: data,
            type: method,
            success: successCalback,
            error: function (jqXHR, textStatus, errorThrown) {
                noty({
                    text: textStatus,
                    theme: 'relax',
                    type: 'error',
                    timeout: 4000,
                    animation: {
                        open: 'animated fadeInDown', // jQuery animate function property object
                        close: 'animated fadeOutUp', // jQuery animate function property object
                    }
                });
                errorCalback(jqXHR, textStatus, errorThrown);
            }
        })
    },
    setTimeout: function (timeout, callback) {
        setTimeout(function () {
            callback();
        }, timeout);
    },
    menu: function () {
        if (this.constants.isOpenMenu) {
            this.constants.isOpenMenu = false;
            this.constants.menu.removeClass("animated sladeInLeft");
            this.constants.menu.addClass("animated sladeOutLeft");
            this.constants.menu.hide("");

        } else {
            this.constants.isOpenMenu = true;
            this.constants.menu.removeClass("animated sladeOutLeft");
            this.constants.menu.addClass("animated sladeInLeft");
            this.constants.menu.show("");
        }
    }
}