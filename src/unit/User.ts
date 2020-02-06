/**
 *
 * @author 
 * 用户登录逻辑
 *
 */
class User {
    private urlloader: egret.URLLoader = new egret.URLLoader();
    private nextLogin = 0;
    public constructor() {
        //    	this.info = new User;
    }

    public checkUserInfo() {
        Main.app.user = { token: "" };
        var that = this;

        nest.core.startup({ egretAppId: Main.app.app_info.app_id },function() {
            nest.user.isSupport({},function(data) {
                //获取登录方式数组，如["qq","wx"]
                var loginType = data.loginType;
                console.log(loginType);
                //获取是否支持nest.user.getInfo接口，有该字段并且该字段值为1表示支持
                var getInfo = data.getInfo;
            })
            //            that.setCookie("p_i_id",Main.app.getQueryString("p_i_id"),1);            
                        
            nest.user.checkLogin({},function(data) {
                if(data.result == 0) {
                    //用户已经登录过，获取用户token和用户id
                    //这时候就不需要显示登陆界面，直接进入游戏即可
                    //在此获得用户信息
                    //用户登录成功，这时候获取所有实例对象的数据，检查无问题后，再去初始化UI和应用层。
                    //                    Main.app.instance.p_i_id = that.getCookie("p_i_id");                    
                    console.log(data);
//                    Main.app.user.token = data.token;
                    //                    Main.app.user.p_u_id = data.p_u_id;
                    //系统记录用户登录状态
                    that.nextLogin = 1;
                    that.checkLogin();
                    console.log("nest 用户再次登录成功");
//                    console.log(Main.app.user);
                    //获取用户信息试试
                }
                else {
                    //登录成功后再取出来用
                    //用户没有登录，根据loginType显示登陆按钮
                    nest.user.login({ loginType: 'wx' },function(data) {
                        if(data.result == 0) {
//                            //登录成功，获取用户token，并根据token获取用户id，之后进入游戏
//                            //获取id代码请看Nest工程中的LoginView文件，这个代码请务必放在服务端实现
//                            Main.app.user.token = data.token;
//                            Main.app.instance.p_i_id = that.getCookie("p_i_id");
//                            //默认ID
//                            //用户首次登录成功后的页面可以获得用户头像等信息。
//                            //that.checkLogin();
//                            Main.app.reloadApp(that.getCookie("p_i_id"));

                        }
                        else {
                            //登录失败，需要重新登陆
                        }
                    })
                }
            });
        });
    }

    private checkLogin() {
        //        console.log(Main.app.instance.p_i_id);
        //        if(Main.app.instance.p_i_id==""){
        //            Main.app.instance.p_i_id = this.getCookie("p_i_id");
        //        }
        //        console.log(Main.app.instance.p_i_id);
        
        var urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.url = "./api.php?a=checkLogin&p_id=" + Main.app.app_info.p_id + "&tk=" + Main.app.user.token + "&p_i_id=" + Main.app.app_info.p_i_id;// + this.u_id;
        this.urlloader.load(urlreq);
        this.urlloader.addEventListener(egret.Event.COMPLETE,this.checkLoginComplete,this);
    }

    private checkLoginComplete() {
        this.urlloader.removeEventListener(egret.Event.COMPLETE,this.checkLoginComplete,this);
        var data = JSON.parse(this.urlloader.data);
        if(data.msg == "success") {
            Main.app.user = data.data;
            APP_INFO.p_u_id = Main.app.user.p_u_id;
            APP_INFO.uname = Main.app.user.name;
            console.log("服务端获取用户信息成功");
            console.log(Main.app.user);
            
            var userInfo = { "egretId": Main.app.user.serverInfo,
                "level": 1,"serverId": 1,"playerName": Main.app.user.name,"gender":1};
            esa.EgretSA.player.init(userInfo);

            if(this.nextLogin == 1 && Main.app.getQueryString("token") != null) {
                Main.app.reloadApp(APP_INFO.p_i_id);
            }
        }
    }

    public setCookie(c_name,value,expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }

    public getCookie(c_name) {
        if(document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if(c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";",c_start)
                if(c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }
}
