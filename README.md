photo album
==============================
##  查看效果
下载代码，在此文件夹中命令行输入命令：

*   npm install

来安装必要的module


*   node app.js

启动服务器

*   在浏览器中输入 localhost:3000

查看组件效果

可使用电脑或移动设备进行查看~

*   电脑浏览器查看请启用google的Emulate touch screen
*   移动设备需链接您的电脑


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





