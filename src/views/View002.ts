/**
 *
 * @author 
 *
 */
class View002 extends eui.Component {
    public sound;
    public soundChannel;
    

    public sd_readygo;
    public sC_readygo;


    public row_left: eui.Component;
    public row_right: eui.Component;

    public bt_left: eui.Button;
    public bt_right: eui.Button;

    public ems_left = [];
    public ems_right = [];

    public score: eui.Label;
    public lifes: eui.Label;

    public bg_01_png: eui.Image;
    public bar_right: eui.Image;
    public bar_left: eui.Image;
    public panda_png: eui.Image;
    public panda_qipao_png: eui.Image;
    public life_png: eui.Image;
    public face_01_png: eui.Image;
    public em_01_png: eui.Image;
    public c_01_png: eui.Image;
    public title_01_png: eui.Image;

    public right_em = 1;

    public speed=1;
    
    public level_up:eui.Image;
    public level = 1;
    //间隔 速度
    
    public constructor() {
        super();
        this.init();
        this.percentWidth = 100;
        this.percentHeight = 100;
    }

    private init(): void {
        EXML.load("resource/components/View002Skin.exml",this.onLoaded,this);
    }


    private onLoaded(clazz: any,url: string): void {
        this.skinName = clazz;


        this.lifes.scaleX = 0.8;
        this.lifes.scaleY = 0.8;
        this.score.scaleX = 1.5;
        this.score.scaleY = 1.5;

        this.hideAll();
        this.cartoon();

        this.sound = RES.getRes("bt_01_mp3");
        this.sd_readygo = RES.getRes("readygo_mp3");
        
        
//        console.log(dragonBones.DragonBones.DATA_VERSION);        
//        
//        var dragonbonesData = RES.getRes("Robot_json");
//        var textureData = RES.getRes("texture_json");
//        var texture = RES.getRes("texture_png");
//        
//        var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
//        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
//        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
//        var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("robot");
//        this.addChild(armature.display);
//        armature.display.x = 200;
//        armature.display.y = 300;
//        armature.display.scaleX = 0.5;
//        armature.display.scaleY = 0.5;
//        dragonBones.WorldClock.clock.add(armature);
//        armature.animation.gotoAndPlay("Run");
//        egret.Ticker.getInstance().register(
//            function(frameTime: number) { dragonBones.WorldClock.clock.advanceTime(0.01) },
//            this
//        );  
        
    }
    


    private cartoon() {
        var that = this;

        that.bg_01_png.y = -1000;
        var tw = egret.Tween.get(that.bg_01_png);
        tw.to({ alpha: 1,y: 0 },400,egret.Ease.backInOut);

        that.bar_left.y = -1000;
        var tw = egret.Tween.get(that.bar_left);
        tw.wait(200).to({ alpha: 1,y: 100 },400,egret.Ease.backInOut);

        that.bar_right.y = -1000;
        var tw = egret.Tween.get(that.bar_right);
        tw.wait(300).to({ alpha: 1,y: 200 },400,egret.Ease.backInOut);

        that.title_01_png.y = -1000;
        var tw = egret.Tween.get(that.title_01_png);
        tw.wait(300).to({ alpha: 1,y: 0 },400,egret.Ease.backInOut);

        that.panda_png.y = 2000;
        var tw = egret.Tween.get(that.panda_png);
        tw.wait(300).to({ alpha: 1,y: 1404 },400,egret.Ease.backInOut);

        that.face_01_png.y = 2000;
        var tw = egret.Tween.get(that.face_01_png);
        tw.wait(300).to({ alpha: 1,y: 1544 },400,egret.Ease.backInOut);

        that.panda_qipao_png.y = 2000;
        var tw = egret.Tween.get(that.panda_qipao_png);
        tw.wait(500).to({ alpha: 1,y: 765 },400,egret.Ease.backInOut).call(
            function() {
                that.em_01_png.alpha = 1;
                that.row_left.alpha = 1;
                that.row_right.alpha = 1;
                that.startGame();
            }
        );

        var tw = egret.Tween.get(that.bt_left);
        tw.wait(400).to({ alpha: 1 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_right);
        tw.wait(400).to({ alpha: 1 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.life_png);
        tw.wait(400).to({ alpha: 1 },400,egret.Ease.backInOut);
        var tw = egret.Tween.get(that.score);
        tw.wait(400).to({ alpha: 1 },400,egret.Ease.backInOut);
        var tw = egret.Tween.get(that.lifes);
        tw.wait(400).to({ alpha: 1 },400,egret.Ease.backInOut);
    }

    private hideAll() {
        this.row_left.alpha = 0;
        this.row_right.alpha = 0;

        this.bt_left.alpha = 0;
        this.bt_right.alpha = 0;

        this.score.alpha = 0;
        this.lifes.alpha = 0;

        this.bg_01_png.alpha = 0;
        this.bar_right.alpha = 0;
        this.bar_left.alpha = 0;
        this.panda_png.alpha = 0;
        this.panda_qipao_png.alpha = 0;
        this.life_png.alpha = 0;
        this.face_01_png.alpha = 0;
        this.em_01_png.alpha = 0;
        this.c_01_png.alpha = 0;
        this.title_01_png.alpha = 0;
        
        this.level_up.y = 2000;
    }    
    
    private startGame() {
        var that = this;
        this.soundPlayReadyGo();

        this.levelUp();
        
        this.bt_left.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            var wanmei = that.hitTest(that.ems_left);
            if(typeof(wanmei) != "undefined" && wanmei.t == that.right_em) {
                that.win();
                
            } else {
                that.lose();

                var tw = egret.Tween.get(that.bt_left);
                tw.call(function(){
                        that.bar_left.source = RES.getRes("bar_error_png");
                    }).wait(100).call(function(){
                        that.bar_left.source = RES.getRes("bar_01_png");
                    });
                
            }
            that.soundPlayBtnClick();
        },this)

        this.bt_right.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            var wanmei = that.hitTest(that.ems_right);
            if(typeof (wanmei) != "undefined" &&wanmei.t == that.right_em) {
                that.win();
            } else {
                that.lose();
                var tw = egret.Tween.get(that.bar_right);
                tw.call(function() {
                    that.bar_right.source = RES.getRes("bar_error_png");
                }).wait(100).call(function() {
                    that.bar_right.source = RES.getRes("bar_01_png");
                });
                
            }
            that.soundPlayBtnClick();
        },this)
    }

    private hitTest(ems) {
            //检查元素中所有元素，如果有元素的y值 在线下判断其类型，如果符合条件，加分，否则减分
        var wanmei;
        for(var i = 0;i < ems.length;i++) {
            console.log("em" + i);
            console.log(ems[i].e.y);
            var check_em_type;
            if(ems[i].e.y >= 1550 && ems[i].e.y <= 1550 + 300) {
                //进入区域 完美
                console.log("完美");
                console.log(ems[i].t);
                wanmei = ems[i];
            } else if(ems[i].e.y > 1550 - 150 && ems[i].e.y < 1550) {
                //进入区域 提前了
                console.log("提前了");
                console.log(ems[i].t);
            } else if(ems[i].e.y > 1550 + 300) {
                //进入区域 按晚了
                console.log("按晚了");
                console.log(ems[i].t);
            } else {
                console.log("没有进入区域");
            }

        }
        return wanmei;
    }    

    private win(){
        this.face_01_png.source = RES.getRes("face_02_png");
        this.score.text = (parseInt(this.score.text) + 1).toString();
        
        if(parseInt(this.score.text) == 10 ) {
            console.log("level 2");
            this.level = 2;
            this.levelUp(500,2000);
        }
        if(parseInt(this.score.text) == 20) {
            console.log("level 3");
            this.level = 3;
            this.levelUp(400,1000);
        }
        
        if(parseInt(this.score.text) == 30) {
            console.log("level 4");
            this.level = 4;
            this.levelUp(300,500);
        }

        console.log("加分");        
    }
    
    
    /*速度，其实是秒*/
    private c_speed ;
    private em_speed ;
    private timer_left;
    private timer_right;
    
    
    private levelUp(c_speed = 600,em_speed = 4000){
        this.c_speed = c_speed;
        this.em_speed = em_speed;
        
        egret.clearInterval(this.timer_left);
        egret.clearInterval(this.timer_right);
        
        this.ems_left = [];
        this.ems_right = [];
        egret.Tween.removeAllTweens();
        this.row_left.removeChildren();
        this.row_right.removeChildren();
        
        if(this.level>1){
        var tw = egret.Tween.get(this.level_up);
        tw.to({ y: 688 },400,egret.Ease.backInOut).wait(400).to({ y: -800 },400,egret.Ease.backInOut);
        }
        
        
        this.right_em = this.randomPix(4,1);
        this.em_01_png.source = RES.getRes("em_0"+this.right_em+"_png");
        
        
        
        this.timer_left = egret.setInterval(this.addEm,this,c_speed,this.row_left,"left");
        this.timer_right = egret.setInterval(this.addEm,this,c_speed,this.row_right,"right");            
        
    }
    
    private lose(){
        
        this.face_01_png.source = RES.getRes("face_01_png");
        this.lifes.text = (parseInt(this.lifes.text) - 1).toString();
        console.log("减分");
        if(parseInt(this.lifes.text) <= 0) {
            this.gameOver();
            egret.log("GAMEOVER");
        }        
    }
    
    private soundPlayBtnClick(){
        this.soundChannel =  this.sound.play(0,1);
    }
    private soundPlayReadyGo(){
        var channel: egret.SoundChannel = this.sC_readygo;
        if(channel) {
            //调用soundChannel对象的stop方法停止播放音频
            console.log(channel);
            channel.stop();
            this.sC_readygo = null;
            return;
        }
        channel = this.sd_readygo.play(0,1);        
    }
    private level001() {

    }

    private level002() {

    }

    private level003() {

    }

    private gameOver() {
        Main.main.views.removeChildAt(Main.main.view002);
        Main.main.view003 = new View003();
        Main.main.views.addChild(Main.main.view003);  
    }


    private addEm(cp: eui.Component,left_or_right) {

        var em = new eui.Image();
        var type = this.randomPix(4,1);
        em.source = "em_0" + type + "_png";
        var obj = { e: em,t: type };

        if(left_or_right == "left") {
            this.ems_left.unshift(obj);
        } else {
            this.ems_right.unshift(obj);
        }

        cp.addChild(em);
        var that = this;
        var tw2 = egret.Tween.get(em,{ loop: false });

        tw2.to({ y: cp.height },that.em_speed).call(function() {
            //销毁对象
            cp.removeChild(em);
            if(left_or_right == "left") {
                that.ems_left.pop();
            } else {
                that.ems_right.pop();
            }
        });
    }

    private randomPix(max = 3,min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }






}
