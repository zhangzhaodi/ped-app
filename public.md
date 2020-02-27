# 苏盛鹏
> 头部header
```html
<!-- 可配置项
title 标题
params:{
    backShow 返回图标
    leftShow 客服图标
    rightShow 更多图标
}
backRouter 返回的路由 默认return
backStep 返回步数默认 -1
backgroundColor 背景颜色 默认白色 -->
 <Myheader :title="$route.meta.title"></Myheader>
```
> 全局outer
```css
.outer {
  background-color: #f5f6f8;
  font-family: PingFangSC;
}
/* 如果有header 下面的主体内容*/
.outer .main {
  width: 100%;
  position: absolute;
  top: px2vw(108);
}

```
>vant field 
```html
 <van-field v-model="form.postscript" label="附言" placeholder="不超过20字（选填）" />
```
```css
/deep/ .van-cell {
flex: 1;
display: flex;
flex-direction: row;
align-items: center;
}
/deep/ .van-cell:not(:last-child)::after {
border-bottom: 0;
}
/deep/ .van-cell__title {
width: px2vw(130);
font-size: px2vw(30);
color: #262626;
font-weight: 400;
}
```
> 输入框下面的线
```html
在需要加线的地方加
<div class="line"></div>
```
```css
.line {
  position: relative;
}
.line::after {
  content: "";
  width: px2vw(670);
  height: 1px;
  position: absolute;
  top: -0.5px;
  left: px2vw(40);
  background-color: #eff0f1;
}
```