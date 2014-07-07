/**
 * Created by Administrator on 14-7-4.
 */
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

photoAlbum.prototype.renderDOM=function(){
	var parent=this
		,curphoto=0;    //	    当前是第几张图

	for(var i=0;i<parent._wholeCount;i++){
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
	var thisLiW=0           //	    目前照片宽度
		,ratio_style="";    //	    横版还是竖版？

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
	_this._img.setAttribute("class",ratio_style);
	_this._li.appendChild(_this._img);
	_this._li.setAttribute("class",ratio_style+" animated bounceIn");
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
	var thisLiW=100         //	目前照片宽度
		,minPadding=0       //	图片相隔最小间隙（padding）
		,numOfLine=Math.floor(parent._winW/(thisLiW+minPadding))  //	一行能放的图个数
		,paddingLeft=(parent._winW-numOfLine*thisLiW)/numOfLine   //	实际图片相隔间隙
		,square_style="";   //	横版还是竖版？

//	如果图片宽度比高度大20%，则认为这张图是横版, 否则认为是竖版
	if(_this.width/_this.height>1.2){
//		横版图 方块风格   (缩略图尺寸 100[宽]*100[高] 高显示完全，以填充满整个方块)
		square_style="square_horizontal";
	}else{
//		竖版图 方块风格   (缩略图尺寸 100[宽]*100[高] 宽显示完全，以填充满整个方块)
		square_style="square_vertical";
	}
//	_this._img.className=square_style+",zoom";
	_this._img.setAttribute("class",square_style);
	_this._li.appendChild(_this._img);
	_this._li.setAttribute("class","square animated bounceIn");

//	如果是每行第一个图片就不加paddingLeft 不然就要加
	if(_curphoto%numOfLine!=1){
		_this._li.style.paddingLeft=paddingLeft+"px";
	}
	_this._li.style.marginTop=paddingLeft+"px";
	parent._breviaryUl.appendChild(_this._li);
};

photoAlbum.prototype.renderPaddingOfLi=function(){
	var numOfLine=this._lisInOneLine.length  //	一行能放的图个数
		,paddingLeft=0;    //	图片相隔间隙

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

//	        direction是显示图像来的方向
photoAlbum.prototype.loadImg=function(parent,_curImgId,direction){
	var curImg=document.getElementById(_curImgId)
		,largeImg=new Image()
		,largeChildren=parent._large.childNodes;

	largeImg.onload=function(){
		var ratio_img=curImg.height/curImg.width
			,ratio_win=parent._winH/parent._winW
			,imgEffect="animated "
			,img=document.createElement("img");
		img.src = curImg.src;
		if(direction){
			switch (direction){
				case "left":
					imgEffect+="bounceInLeft";
					break;
				case "right":
					imgEffect+="bounceInRight";
					break;
				default :
					imgEffect+="bounceIn";
					break;
			}
		}
//		ratio_img<=ratio_win则认为这是一张横版
		if(ratio_img<=ratio_win){
			img.width=parent._winW;
			var realH=ratio_img*img.width     //算出图片真实高度
				,panddingTop=parseInt((parent._winH-realH)/2);  //算出图片上方留白
			img.style.paddingTop=panddingTop+"px";
		}
//		ratio_img>ratio_win则认为这是一张竖版
		else if(ratio_img>ratio_win){
			img.height=parent._winH;
			var realW=img.height/ratio_img     //算出图片真实宽度
				,paddingLeft=parseInt((parent._winW-realW)/2);  //算出图片左边留白
			img.style.paddingLeft=paddingLeft+"px";
		}
		if(largeChildren.length>0){
			parent._large.removeChild(largeChildren[0]);
		}
		img.setAttribute("class",imgEffect);
		parent._large.appendChild(img);
	};

	largeImg.src = curImg.src;
};

photoAlbum.prototype.bindDOM=function()
{
	var parent=this
		,curImgId={};

	$(this._breviary).on("tap","img",function(){
		curImgId=this.id;
		parent._large.style.opacity=0;
		parent._large.style.display="block";
//		渐显
		fade(parent._large,"show");
		parent.loadImg(parent,curImgId);
	});
	$(this._large).on("tap",function(){
//		渐隐
		fade(parent._large,"hiden",function(){
			parent._large.style.display="none";
		});
	}).on("swipeRight",function(){
        var lastImgId=curImgId-1;
        if(lastImgId>=0){
	        parent.loadImg(parent,lastImgId,"left");
	        curImgId=lastImgId;
		}
    }).on("swipeLeft",function(){
        var nextImgId=parseInt(curImgId)+1;
        if(nextImgId<parent._wholeCount){
            parent.loadImg(parent,nextImgId,"right");
	        curImgId=nextImgId;
        }
    });
};

//渐显渐隐函数
function fade(obj,method,callback){ //method有两个值show或hiden   callback函数为渐显渐隐结束后的回调函数，若无可省
	var n = (method == "show") ? 0 : 100,
		ie = (window.ActiveXObject) ? true : false;
	var time = setInterval(function(){
		if(method == "show"){
			if(n < 100){
				n+=10;
				if(ie){
					obj.style.cssText = "filter:alpha(opacity="+n+")";
				}else{
					(n==100) ? obj.style.opacity = 1 : obj.style.opacity = "0."+n;
				}
			}else{
				clearTimeout(time);
				callback&&callback();
			}
		}else{
			if(n > 0){
				n-=10;
				if(ie){
					obj.style.cssText = "filter:alpha(opacity="+n+")";
				}else{
					obj.style.opacity = "0."+n;
				}
			}else{
				clearTimeout(time);
				callback&&callback();
			}
		}
	},30);
}
