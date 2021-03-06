//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;
    private loading_png = 0;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 1400;
        this.textField.width = 1080;
        this.textField.height = 800;
        this.textField.textColor = 0x333333;
        this.textField.textAlign = "center";
        this.loading = new egret.Bitmap();
        this.addChild(this.loading);
        

        var that = this;
        
        RES.getResByUrl("resource/loading/company2.png",function(event: any) {
            that.img1 = event;
            that.loading_png++;
            that.coonton();
        },this);    
        
        RES.getResByUrl("resource/loading/company.png",function(event: any) {
            that.img2 = event;
            that.loading_png++;
            that.coonton();
        },this);        
        
    }
    private loading:egret.Bitmap;
    private img1;
    private img2;
    private coonton(){
        var that = this;
        if(this.loading_png==2){
            that.loading.texture = that.img2;
            
            that.loading.x = (that.stage.width - that.loading.width) / 2;
            that.loading.y = 600;

            var tw = egret.Tween.get(that.loading);
            tw.wait(2000).to({ alpha: 0 },400).call(function() {
                that.loading.texture = that.img1;
            }).to({alpha:1},400);
        }
    }

    public setProgress(current, total):void {
        this.textField.text = "LOADING..." + current + "/" + total;
    }
}
