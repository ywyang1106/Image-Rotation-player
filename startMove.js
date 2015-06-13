/* Created by Wen on 2015/5/3.*/
function getStyle(oObjectName, sStyleName){//获取不在行间的样式属性
    if(oObjectName.currentStyle){
        return oObjectName.currentStyle[sStyleName];//获取行间样式
    }
    else{
        return getComputedStyle(oObjectName, false)[sStyleName];//当行间样式不存在时，获取非行间样式
    }
}
function startMove(oObjectName, sAttributeName, vTarget){//针对某个对象实现按自己的要求以某种变化方式运动到以vTarget为止
    clearInterval(oObjectName.vTimer);//关掉定时器
    oObjectName.vTimer = setInterval(function(){//开启定时器
        var vCurrentValue = 0;//vAttr对应的属性的当前值vCurrentValue
        if(sAttributeName == 'opacity'){//对应透明度变化采用另外一种方式，涉及浮点数操作
            vCurrentValue = Math.round(parseFloat(getStyle(oObjectName, sAttributeName)) * 100);
        }
        else{
            vCurrentValue = parseInt(getStyle(oObjectName, sAttributeName));//其他的方式
        }
        var vSpeed = (vTarget - vCurrentValue) / 6;//改变的速度
        vSpeed = vSpeed > 0 ? Math.ceil(vSpeed) : Math.floor(vSpeed);//对速度取整
        if(vCurrentValue == vTarget){
            clearInterval(oObjectName.vTimer);//若达到目标，则关闭定时器
        }
        else{
            if(sAttributeName == 'opacity'){//对应透明度变化采用另外一种方式，涉及浮点数操作
                oObjectName.style.filter = 'alpha(opacity:' + (vCurrentValue + vSpeed) + ')';//IE浏览器
                oObjectName.style.opacity = (vCurrentValue + vSpeed) / 100;//火狐浏览器和谷歌浏览器
            }
            else{//其他的方式
                oObjectName.style[sAttributeName] = vCurrentValue + vSpeed + 'px';
            }
        }
    }, 30);//30对应定时器的运行速度
}