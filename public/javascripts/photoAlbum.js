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
	this._winW=window.innerWidth;
//	this._winH=window.innerHeight;
	this._ul=document.createElement("ul");
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
	var parent=this;
//	当前是第几张图
	var _curphoto=0;
//	总照片数
	for(var i=0;i<parent._wholeCount;i++){
		//	正在处理的照片的索引
		var img=new Image();
		img.onload = function(){
			this._li=document.createElement("li");
			this._img=document.createElement("img");
			this._img.setAttribute("src",this.src);
			_curphoto+=1;
			switch (parent._style){
				case "ratio":
					parent.renderImgs_ratio(parent, this, _curphoto);
					break;
				case "square":
					parent.renderImgs_square(parent, this, _curphoto);
					break;
			}
		};
		img.src = this._photos[i].src;
	}
	parent._breviary.appendChild(parent._ul);
	parent._container.appendChild(parent._breviary);
};

photoAlbum.prototype.renderImgs_ratio=function(parent,_this,_curphoto){
//	目前照片宽度
	var _thisLiW=0;
//	横版还是竖版？
	var ratio_style="";
//	如果图片宽度比高度大20%，则认为这张图是横版, 否则认为是竖版
	if(_this.width>_this.height*1.2){
//		横版   (缩略图尺寸 130[宽]*100[高])
		ratio_style="horizontal";
		_thisLiW=130;
	}else{
//		竖版   (缩略图尺寸 80[宽]*100[高])
		ratio_style="vertical";
		_thisLiW=80;
	}
	_this._img.className=ratio_style;
	_this._li.appendChild(_this._img);
	_this._li.className=ratio_style;
	if(parent._lisInOneLineWidth+_thisLiW<=parent._winW){
		parent._lisInOneLineWidth+=_thisLiW;
		parent._lisInOneLine.push(_this._li);
	}else{
		parent.renderPaddingOfLi();
		parent._lisInOneLine.length=0;
		parent._lisInOneLine.push(_this._li);
		parent._lisInOneLineWidth=_thisLiW;
	}
//	如果处理的照片是最后一个，要再次调用renderPaddingOfLi以确保当前暂存列表中已经完全处理完
	if(_curphoto==parent._wholeCount){
		parent.renderPaddingOfLi();
	}
};

photoAlbum.prototype.renderImgs_square=function(parent,_this,_curphoto){
//	目前照片宽度
	var _thisLiW=100;
//	图片相隔最小间隙（padding）
	var _minPadding=0;
//	一行能放的图个数
	var _numOfLine=Math.floor(parent._winW/(_thisLiW+_minPadding));
//	实际图片相隔间隙
	var _paddingLeft=(parent._winW-_numOfLine*_thisLiW)/_numOfLine;
//	横版还是竖版？
	var square_style="";
//	如果图片宽度比高度大20%，则认为这张图是横版, 否则认为是竖版
	if(_this.width>_this.height*1.2){
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
	if(_curphoto%_numOfLine!=1){
		_this._li.style.paddingLeft=_paddingLeft+"px";
		_this._li.style.marginBottom=_paddingLeft+"px";
	}
	parent._ul.appendChild(_this._li);
};

photoAlbum.prototype.renderPaddingOfLi=function()
{
//	一行能放的图个数
	var _numOfLine=this._lisInOneLine.length;
//	图片相隔间隙
	var _paddingLeft=0;
	if(_numOfLine>1){
		_paddingLeft=Math.floor((this._winW-this._lisInOneLineWidth)/_numOfLine);
	}
	for(var i=0;i<_numOfLine;i++){
		var _thisLi=this._lisInOneLine[i];
		if(i!=0){
			_thisLi.style.paddingLeft=_paddingLeft+"px";
			_thisLi.style.marginBottom=this._marginBottom;
		}
		this._ul.appendChild(_thisLi);
	}
};

photoAlbum.prototype.bindDOM=function()
{
};

new photoAlbum({
	"containerId":"container",
	"list":photolist,
//	显示方式：正方形  （每个图片都是小正方形的缩略图）
	"style":"square"
////	显示方式：比例  （缩略图能看得出该图片是竖版图还是横版图）
//	"style":"ratio"
});
