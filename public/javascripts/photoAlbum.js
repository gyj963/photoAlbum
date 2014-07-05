/**
 * Created by Administrator on 14-7-4.
 */
var photolist=[
	{
		"src":"images/1.jpg"
	},
	{
		"src":"images/2.jpg"
	},
	{
		"src":"images/9.jpg"
	},
	{
		"src":"images/4.jpg"
	},
	{
		"src":"images/5.jpg"
	},
	{
		"src":"images/6.jpg"
	},
	{
		"src":"images/8.jpg"
	}
];

function photoAlbum(opts){
	this._container=document.getElementById(opts.containerId);
	this._photos=opts.list;
	//构造三部曲
	this.init();
	this.renderDOM();
	this.bindDOM();
};

photoAlbum.prototype.init=function()
{
	this._breviary=document.createElement("div");
	this._breviary.id = "breviary";
	this._winW=window.innerWidth;
	this._winH=window.innerHeight;
	this._paddingBottom="5px";
};

photoAlbum.prototype.renderDOM=function()
{
	var _ul=document.createElement("ul");
	var _liTmpSaveForCalculatePaddingL=[];
	for(var i=0;i<this._photos.length;i++){
		var img=new Image();
		img.onload = function(){
			var _li=document.createElement("li");
			var _img=document.createElement("img");
			_img.setAttribute("src",this.src);
			var style="";
//			如果图片宽度比高度大20%，则认为这张图是横版, 否则认为是竖版
			if(this.width>this.height*1.2){
//				横版   (缩略图尺寸 130[宽]*100[高])
				style="horizontal";
			}else{
//				竖版   (缩略图尺寸 80[宽]*100[高])
				style="vertical";
			}
			_img.className=style;
			_li.appendChild(_img);
			_li.className=style;
			_ul.appendChild(_li);
		};
		img.src = this._photos[i].src;
	}
	this._breviary.appendChild(_ul);
	this._container.appendChild(this._breviary);
};

photoAlbum.prototype.bindDOM=function()
{
};

new photoAlbum({
	"containerId":"container",
	"list":photolist
});
