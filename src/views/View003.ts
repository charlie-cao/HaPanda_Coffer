/**
 *
 * @author 
 *
 */
class View003 extends eui.Component {
    public sound;
    public soundChannel;
    
    public bt_restart: eui.Image;
    public bt_rank: eui.Image;
    public gameover: eui.Image;
    public bt_share: eui.Image;
    
    public bilibili:eui.Component;
    
    public constructor() {
        super();
        this.init();
        this.percentWidth = 100;
        this.percentHeight = 100;
    }

    private init(): void {
        EXML.load("resource/components/View003Skin.exml",this.onLoaded,this);
    }
    
    private onLoaded(clazz: any,url: string): void {
        this.skinName = clazz;

        this.hideAll();
        this.viewGameOverShow();
        this.sound = RES.getRes("gameover_mp3");
        this.soundChannel = this.sound.play(0,1);
    }

    private viewGameOverShow() {
        var that = this;
        var tw = egret.Tween.get(that.gameover);
        tw.to({ alpha: 1,y: 452 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_restart);
        tw.to({ alpha: 1,y: 675 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_share);
        tw.to({ alpha: 1,y: 881 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_rank);
        tw.to({ alpha: 1,y: 1071 },400,egret.Ease.backInOut).call(function(){
        });
        
        that.bilbil();
        

        that.bt_restart.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            that.viewGameOverDestory();
        },that)
    }

    private viewGameOverDestory() {
        var that = this;
        var tw = egret.Tween.get(that.gameover);
        tw.to({ alpha: 1,y: -1000 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_restart);
        tw.to({ alpha: 1,y: 2000 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_share);
        tw.to({ alpha: 1,y: 2000 },400,egret.Ease.backInOut);

        var tw = egret.Tween.get(that.bt_rank);
        tw.to({ alpha: 1,y: 2000 },400,egret.Ease.backInOut).call(function(){
            Main.main.views.removeChildAt(Main.main.view003);
            Main.main.view002 = new View002();
            Main.main.views.addChild(Main.main.view002);  
        });
    }

    private bilbil(){
        var that = this;
        var text = ['是不是我打开的方式不对',
            '程序猿罢工了啊',
            '这TM游戏能玩么',
            '出BUG了',
            '程序猿是死了么',
            '史上第一款吐槽游戏',
            '没见过这么不负责任的游戏',
            '我擦。我擦，我擦。。。。',
            '            我屮艸芔茻',
            '这什么鬼',
            '不好玩',
            '坑爹呢。',
            '搞不懂。',
            '这是我毕生玩过的难度最高的游戏。',
            '膜拜，神一般的存在。',
            '我居然完了25分哎，：P',
            '再也不玩游戏了',
            '程序员你给我出来',
            '史上第一款鬼畜游戏。新次元开启了。。'];
            
            for(var i=0;i<text.length;i++){
                var d:eui.Label = new eui.Label;
                d.text = text[i + 1];
                d.size = this.randomPix(90,60);
                var color = [0xff8063,0x59e46f,0xff00ff,0x00c0ff,0x2181ad];
                d.textColor = color[this.randomPix(4,0)];
                d.x = 1280;
                var r_y = this.randomPix(8,1);
                d.y =   140*r_y;
                that.bilibili.addChild(d);
                var tw = egret.Tween.get(d,{loop:true});
                var time = 100*this.randomPix(40,0);
                tw.wait(time).to({ x: -1000 },4000);                
            }
            
            
        console.log(text.length);
            
    }
    
    private randomPix(max = 3,min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
//    private setD(t){
//        var d: eui.Label = new eui.Label;
//        d.text = text[i + 1];
//        d.x = 2000;
//        d.y = 200;
//        that.addChild(d);
//        var tw = egret.Tween.get(d);
//        tw.to({ x: -1000 },800);         
//    }

    private hideAll() {
        
        this.bt_restart.alpha = 0;
        this.bt_restart.y = 2000;

        this.bt_rank.alpha = 0;
        this.bt_rank.y = 2000;

        this.gameover.alpha = 0;
        this.gameover.y = -1000;

        this.bt_share.alpha = 0;
        this.bt_share.y = 2000;
        
    }
}
