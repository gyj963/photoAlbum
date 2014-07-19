photoAlbum - 一个自制的移动web相册
==============================
##  查看效果
在线预览 ：http://gyj963.github.io/photoAlbum/


可使用电脑或移动设备进行查看~

*注意：电脑浏览器查看请启用google的Emulate touch screen*

##功能介绍
手机效果截图（Android）：

*	点击缩略图可预览大图
![calendar](screenshot/1.jpg)


*	左右滑动大图可查看上一张和下一张，点击大图，停止预览，回到缩略图
![calendar](screenshot/2.jpg)








##  组件的使用
index.js即使用示例

详细说明：
引用public文件夹下javascript（除index.js外）及stylesheets中文件
在html文件中创建一个div并给其定义id（名字自定义），作为相册组件的容器，例如：
```{bash}
<div id="container">
</div>
```

创建装有图片路径的对象的列表，例如：
```{bash}
var photolist=[
	{
		"src":"images/1.jpg"
	},
	{
		"src":"images/2.jpg"
	},
	{
		"src":"images/3.jpg"
	}
];
```

接下来就可以调用相册组件啦，例如：
```{bash}
new PhotoAlbum({
	               "containerId":"container",   //   相册组件容器的id
	               "list":photolist,   //   图片路径对象列表
				   "size":120   //每个正方形缩略图的边长(单位：px)，可省（默认边长：100px）
               });
```





