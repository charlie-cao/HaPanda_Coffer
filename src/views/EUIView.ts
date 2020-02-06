/**
 *
 * @author 
 *
 */
class EUIView extends eui.Component {
    public static EUI: EUIView;

    public sound;
    public soundChannel;

    public constructor() {
        super();
        this.init();
        this.percentWidth = 100;
        this.percentHeight = 100;
        EUIView.EUI = this;
    }

    private init(): void {
        EXML.load("resource/components/MainUISkin.exml",this.onLoaded,this);
    }
    
    private onLoaded(clazz: any,url: string): void {
        this.skinName = clazz;
        var that = this;
    }
    
    private hiddenAllEm() {
    }
    
    private initEUI() {
    }
}
