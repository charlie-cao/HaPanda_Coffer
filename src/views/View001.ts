/**
 *
 * @author 
 *
 */
class View001 extends eui.Component {
    public sound;
    public soundChannel;

    public sd_bg;
    public sC_bg;    

    public em_index_png: BreathImage;
    public bt_start: eui.Image;
    public bt_help: eui.Image;

    public view_help_png: eui.Image;


    public constructor() {
        super();
        this.init();
        this.percentWidth = 100;
        this.percentHeight = 100;
    }

    private init(): void {
        EXML.load("resource/components/View001Skin.exml",this.onLoaded,this);
    }



    private onLoaded(clazz: any,url: string): void {
        this.skinName = clazz;
        this.hideAll();
        if(Main.main.isDelLoadingView == false) {
            Main.main.stage.removeChild(Main.main.loadingView);
            Main.main.isDelLoadingView = true;
        }
        
        this.viewStartShow();
        
        this.sd_bg = RES.getRes("bmg_001_mp3");
        var channel: egret.SoundChannel = this.sC_bg;
        if(channel) {
            //调用soundChannel对象的stop方法停止播放音频
            console.log(channel);
            channel.stop();
            this.sC_bg = null;
            return;
        }
        channel = this.sd_bg.play();

    }
    
    private viewStartShow() {
        var that = this;
        //动画 音效 事件
        that.em_index_png.y = -1000;
        var tw = egret.Tween.get(that.em_index_png);
        tw.to({ alpha: 1,y: 325 },400,egret.Ease.backInOut);
        
        

        
//        var texture = RES.getRes("em_index_png");
//        var a: BreathImage = new BreathImage(texture);
//        this.addChild(a);
//        a.play();
//        a.y = 540;
//        a.x = 540;
//        var blurFliter = new egret.BlurFilter(1,1);
//        a.filters = [blurFliter];
//        
//        this.swapChildren(that.em_index_png,a);
        
        that.bt_start.y = 2000;
        var tw = egret.Tween.get(that.bt_start);
        tw.to({ alpha: 1,y: 898 },400,egret.Ease.backInOut);

        that.bt_help.y = 2000;
        var tw = egret.Tween.get(that.bt_help);
        tw.to({ alpha: 1,y: 1166 },400,egret.Ease.backInOut);

        that.bt_start.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            that.viewStartDestory();
        },that)

        that.bt_help.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            that.viewHelpShow();
        },that)
        that.viewHelpShow();
    }

    private viewStartDestory() {
        var that = this;
        //动画 音效 事件
        var tw = egret.Tween.get(that.em_index_png);
        tw.to({ alpha: 0,y: -1000 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_start);
        tw.to({ alpha: 0,y: 2000 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_help);
        tw.to({ alpha: 0,y: 2000 },400,egret.Ease.backInOut).call(function() {
            Main.main.views.removeChildAt(Main.main.view001);
            Main.main.view002 = new View002();
            Main.main.views.addChild(Main.main.view002);             
        });


    }



    private viewHelpShow() {
        var that = this;
        var tw = egret.Tween.get(that.view_help_png);
        tw.to({ y: 0 },400,egret.Ease.backInOut);
        that.view_help_png.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            var tw = egret.Tween.get(that.view_help_png);
            tw.to({ y: -2000 },400,egret.Ease.backInOut);
        },that)
    }


    private hideAll() {
        this.em_index_png.alpha = 0;
        this.bt_start.alpha = 0;
        this.bt_help.alpha = 0;

    }
}
