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
	this._style=opts.style;
	//构造三部曲
	this.init();
	this.renderDOM();
	this.bindDOM();
};

photoAlbum.prototype.init=function()
{
	this._breviary=document.createElement("div");
	this._breviary.id = "breviary";
	this._large=document.createElement("div");
	this._large.id = "large";
	this._container.appendChild(this._large);

	this._winW=window.innerWidth;
	this._winH=window.innerHeight;
	this._breviaryUl=document.createElement("ul");
	this._wholeCount=this._photos.length;
	this._marginBottom="5px";
	switch (this._style){
		case "ratio":
			this._lisInOneLine=[];
			this._lisInOneLineWidth=0;
			break;
		case "square":
			break;
		default :break;
	}
};

photoAlbum.prototype.renderDOM=function()
{
	var parent=this
//	    当前是第几张图
	,curphoto=0;
	for(var i=0;i<parent._wholeCount;i++){
		//	正在处理的照片的索引
		var img=new Image();
		img.onload = function(){
			this._li=document.createElement("li");
			this._img=document.createElement("img");
			this._img.setAttribute("src",this.src);
			this._img.id = curphoto;
			curphoto+=1;
			switch (parent._style){
				case "ratio":
					parent.renderImgs_ratio(parent, this, curphoto);
					break;
				case "square":
					parent.renderImgs_square(parent, this, curphoto);
					break;
			}
		};
		img.src = this._photos[i].src;
	}
	parent._breviary.appendChild(parent._breviaryUl);
	parent._container.appendChild(parent._breviary);
};

photoAlbum.prototype.renderImgs_ratio=function(parent,_this,_curphoto){
//	    目前照片宽度
	var thisLiW=0
//	    横版还是竖版？
	,ratio_style="";
//	如果图片宽度比高度大20%，则认为这张图是横版, 否则认为是竖版
	if(_this.width/_this.height>1.2){
//		横版   (缩略图尺寸 130[宽]*100[高])
		ratio_style="horizontal";
		thisLiW=130;
	}else{
//		竖版   (缩略图尺寸 80[宽]*100[高])
		ratio_style="vertical";
		thisLiW=80;
	}
	_this._img.className=ratio_style;
	_this._li.appendChild(_this._img);
	_this._li.className=ratio_style;
	if(parent._lisInOneLineWidth+thisLiW<=parent._winW){
		parent._lisInOneLineWidth+=thisLiW;
		parent._lisInOneLine.push(_this._li);
	}else{
		parent.renderPaddingOfLi();
		parent._lisInOneLine.length=0;
		parent._lisInOneLine.push(_this._li);
		parent._lisInOneLineWidth=thisLiW;
	}
//	如果处理的照片是最后一个，要再次调用renderPaddingOfLi以确保当前暂存列表中已经完全处理完
	if(_curphoto==parent._wholeCount){
		parent.renderPaddingOfLi();
	}
};

photoAlbum.prototype.renderImgs_square=function(parent,_this,_curphoto){
//	目前照片宽度
	var thisLiW=100
//	图片相隔最小间隙（padding）
	,minPadding=0
//	一行能放的图个数
	,numOfLine=Math.floor(parent._winW/(thisLiW+minPadding))
//	实际图片相隔间隙
	,paddingLeft=(parent._winW-numOfLine*thisLiW)/numOfLine
//	横版还是竖版？
	,square_style="";
//	如果图片宽度比高度大20%，则认为这张图是横版, 否则认为是竖版
	if(_this.width/_this.height>1.2){
//		横版图 方块风格   (缩略图尺寸 100[宽]*100[高] 高显示完全，以填充满整个方块)
		square_style="square_horizontal";
	}else{
//		竖版图 方块风格   (缩略图尺寸 100[宽]*100[高] 宽显示完全，以填充满整个方块)
		square_style="square_vertical";
	}
	_this._img.className=square_style;
	_this._li.appendChild(_this._img);
	_this._li.className="square";
//	如果是每行第一个图片就不加paddingLeft 不然就要加
	if(_curphoto%numOfLine!=1){
		_this._li.style.paddingLeft=paddingLeft+"px";
	}
	_this._li.style.marginTop=paddingLeft+"px";
	parent._breviaryUl.appendChild(_this._li);
};

photoAlbum.prototype.renderPaddingOfLi=function(){
//	一行能放的图个数
	var numOfLine=this._lisInOneLine.length
//	图片相隔间隙
	,paddingLeft=0;
	if(numOfLine>1){
		paddingLeft=Math.floor((this._winW-this._lisInOneLineWidth)/numOfLine);
	}
	for(var i=0;i<numOfLine;i++){
		var _thisLi=this._lisInOneLine[i];
		if(i!=0){
			_thisLi.style.paddingLeft=paddingLeft+"px";
		}
		_thisLi.style.marginTop=this._marginBottom;
		this._breviaryUl.appendChild(_thisLi);
	}
};
photoAlbum.prototype.loadImg=function(parent,_curImgId){
	var curImg=document.getElementById(_curImgId);
	console.log("curImg :",curImg);
	var largeImg=new Image();
	largeImg.onload=function(){
		var ratio_img=curImg.height/curImg.width;
		var ratio_win=parent._winH/parent._winW;
		var img=document.createElement("img");
		img.src = curImg.src;
//		ratio_img<=ratio_win则认为这是一张横版
		if(ratio_img<=ratio_win){
			img.width=parent._winW;
//			算出图片真实高度
			var realH=ratio_img*img.width;
//			算出图片上方留白
			var panddingTop=parseInt((parent._winH-realH)/2);
			img.style.paddingTop=panddingTop+"px";
		}
//		ratio_img>ratio_win则认为这是一张竖版
		else if(ratio_img>ratio_win){
			img.height=parent._winH;
			var realW=img.height/ratio_img;
//			算出图片左边留白
			var paddingLeft=parseInt((parent._winW-realW)/2);
			img.style.paddingLeft=paddingLeft+"px";
		}
		var largeChildren=parent._large.childNodes;
		if(largeChildren.length>0){
			parent._large.removeChild(largeChildren[0]);
		}
		parent._large.appendChild(img);
	}
	largeImg.src = curImg.src;
}

photoAlbum.prototype.bindDOM=function()
{
	var parent=this;
	var curImg={};
	$(this._breviary).on("tap","img",function(){
		parent._large.style.display="block";
		curImg=this;
		var curImgId=this.id;
		parent.loadImg(parent,curImgId);
	});
	$(this._large).on("tap",function(){
		parent._large.style.display="none";
	}).on("swipeRight",function(){
        var lastImgId=curImg.id-1;
        if(lastImgId>=0){
	        parent.loadImg(parent,lastImgId);
	        curImg=document.getElementById(lastImgId);
		}
    }).on("swipeLeft",function(){
        var nextImgId=parseInt(curImg.id)+1;
        if(nextImgId<=parent._wholeCount){
            parent.loadImg(parent,nextImgId);
	        curImg=document.getElementById(nextImgId);
        }
    });
};

new photoAlbum({
	"containerId":"container",
	"list":photolist,
//	显示方式：正方形  （每个图片都是小正方形的缩略图）
	"style":"square"
////	显示方式：比例  （缩略图能看得出该图片是竖版图还是横版图）
//	"style":"ratio"
});
