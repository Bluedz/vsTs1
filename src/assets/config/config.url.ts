export class UrlConfig {

    private static server = "http://116.236.151.188/dongchangCsc/rest/interface";
    // private static server = "http://172.29.201.219:8080/dongchangCsc/rest/interface";

    public static authKey = "";
    public static userInfo;

    public static getBaseUrl(): any {
        return this.server;
    }

    public static getLoginUrl ():any {
        //return "http://zhibo.m.sohu.com/api/room/120502/game/up/?target=away_supporter"
        return this.server + "/user/login";
    }

    public static getImgUrl ():any {
        //return "http://zhibo.m.sohu.com/api/room/120502/game/up/?target=away_supporter"
        return this.server + "/common/showImg";
    }

    public static getCallMethod ():any {
        return this.server + "/common/callMethod?authKey=" + UrlConfig.authKey;
    }

    public static getLocalUserInfo ():any {
        let userInfo = {};
        if (typeof(Storage) !== "undefined") {
            let loginId = localStorage.getItem("loginId");
            if (loginId != null && loginId != "undefined") {
                userInfo["loginId"] = loginId;
            }
            let isRemeberStr = localStorage.getItem("isRemeber");
            let isRemeber = false;
            if (isRemeberStr == "true") {
                isRemeber = true;
            } else {
                isRemeber = false;
            }
            userInfo["isRemeber"] = isRemeber;
            if (isRemeber) {
                let password = localStorage.getItem("password");
                if (password != null && password != "undefined") {
                    userInfo["password"] = password;
                }
            }
            
        }
        return userInfo;
    }

    public static setLocalUserInfo (userInfo):any {
        
        if (typeof(Storage) !== "undefined") {
            console.log(userInfo);
            if (userInfo != null && userInfo != "undefined") {
                if (userInfo.loginId) {
                    localStorage.setItem("loginId", userInfo.loginId);
                }
                if (userInfo.password) {
                    localStorage.setItem("password", userInfo.password);
                }
                if (userInfo.isRemeber != null && userInfo.isRemeber != "undefined") {
                    localStorage.setItem("isRemeber", userInfo.isRemeber);
                }
            }
        }
    }
}
