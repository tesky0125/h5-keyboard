# h5-keyboard

realize keyboard in h5 env.

## 解决痛点

iOS不支持带小数点的Native键盘  
设置type=number时，输入非有效数值返回空串  
自定义H5键盘的光标定位问题  
Native键盘弹起遮盖input导致无法输入  

## 支持特性

自定义input组件，支持输入、删除与清空，聚焦与失焦  
自定义keyboard组件，支持输入小数点，且支持输入异常不返回空  
屏蔽Native键盘，支持聚焦时不显示Native键盘  
支持光标闪烁&点击移动光标  
支持光标移至中间，并输入和删除  
支持键盘顶起input组件，不被keyboard遮盖  
页面切换时自动隐藏keyboard与input失焦  

## demos

![keyboard](http://rylanyan.com/backup/images/gif//keyboard.gif)
![keyboard-2](http://rylanyan.com/backup/images/gif//keyboard-2.gif)
