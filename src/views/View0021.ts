/**
 *
 * @author 
 *
 */
class View0021 extends eui.Component {
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

    public right_em = 2;

    public speed=1;
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

        //定时产生元素
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
    }    
    private startGame() {
        var that = this;
        this.soundPlayReadyGo();



        
 

        egret.setInterval(this.addEm,this,500,this.row_left,"left");
        egret.setInterval(this.addEm,this,500,this.row_right,"right");


        
        this.bt_left.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            if(that.ems_left[that.ems_left.length - 1].t == that.right_em) {
                that.win();
            } else {
                that.lose();
            }
            that.soundPlayBtnClick();
        },this)

        this.bt_right.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            if(that.ems_right[that.ems_right.length - 1].t == that.right_em) {
                that.win();
            } else {
                that.lose();
            }
            that.soundPlayBtnClick();
        },this)
    }

    private win(){
        this.face_01_png.source = RES.getRes("face_02_png");
        this.score.text = (parseInt(this.score.text) + 1).toString();
        console.log("加分");        
    }
    
    private lose(){
        this.face_01_png.source = RES.getRes("face_01_png");
        this.lifes.text = (parseInt(this.lifes.text) - 1).toString();
        console.log("减分");
        if(parseInt(this.lifes.text) < 0) {
            this.gameOver();
            egret.log("GAMEOVER");
        }        
    }
    
    private soundPlayBtnClick(){
        var sound = this.sound;
        var channel: egret.SoundChannel = this.soundChannel;
        if(channel) {
            //调用soundChannel对象的stop方法停止播放音频
            console.log(channel);
            channel.stop();
            this.soundChannel = null;
            return;
        }
        channel = sound.play(0,1);
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
        var type = this.randomPix(3,1);
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

        tw2.to({ y: cp.height },500).call(function() {
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
