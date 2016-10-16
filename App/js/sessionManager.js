var sessionManager = {
    constants: {
        sessionKey: "16122013"
    },
    setSession: function (data) {
        data = JSON.stringify(data);
        localStorage.setItem(this.constants.sessionKey, data);
    },
    getSession: function () {
        var info = localStorage.getItem(this.constants.sessionKey);
        if (info == null || info == "") {
            return {};
        } else {
            return JSON.parse(info);
        }
    },
    isLoggedIn:function(){
        var info = localStorage.getItem(this.constants.sessionKey);
        if (info == null || info == "") {
            return false;
        } else {
            return true;
        }
    }

}