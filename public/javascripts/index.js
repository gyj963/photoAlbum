/**
 * Created by Administrator on 14-7-7.
 */
var photolist=[
	{
		"src":"images/1.jpg"
	},
	{
		"src":"images/2.jpg"
	},
	{
		"src":"images/3.jpg"
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
		"src":"images/7.jpg"
	},
	{
		"src":"images/8.jpg"
	},
	{
		"src":"images/9.jpg"
	},
	{
		"src":"images/10.jpg"
	}
];
new photoAlbum({
	               "containerId":"container",
	               "list":photolist,
	               "style":"square",   //	显示方式：正方形  （每个图片都是小正方形的缩略图）
				   "size":100
               });