function getByClass(oParent, sClassName){//从父级对象中选中自己需要的类sClassName
    var aElements = oParent.getElementsByTagName('*');
    var aResult = [];
    for(var i = 0; i < aElements.length; i++){
        if(aElements[i].className == sClassName){
            aResult.push(aElements[i]);
        }
    }
    return aResult;
}
window.onload = function(){
    var oDiv = document.getElementById('playImages');//d选中div
    var oBtnPrev = getByClass(oDiv, 'prev')[0];//选中上一个按钮
    var oBtnNext = getByClass(oDiv, 'next')[0];//选中下一个按钮
    var oMarkLeft = getByClass(oDiv, 'mark_left')[0];//选中左区域
    var oMarkRight = getByClass(oDiv, 'mark_right')[0];//选中右区域
    var oDivSmall = getByClass(oDiv, 'small_pic')[0];//从oDiv中选中类名为small_pic的类
    var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];//在small_pic里选中其下面的ul
    var aLiSmall = oDivSmall.getElementsByTagName('li');//在small_pic里选中其下面的li
    var oUlBig = getByClass(oDiv, 'big_pic')[0];//从oDiv中选中类名为big_pic的类
    var aLiBig = oUlBig.getElementsByTagName('li');//在big_pic里选中其下面的li
    var iNowZIndex = 2;//表示现在在最上面的那种图对应的z-index
    var iNowFlag = 0;//记录当前是哪张图片，未免在重复点击图片时也出现下拉状态

    oUlSmall.style.width = aLiSmall.length * aLiSmall[0].offsetWidth + 'px';//得出小图总共的宽度
    //左右按钮淡入淡出
    oBtnPrev.onmouseover = oMarkLeft.onmouseover = function(){//鼠标移入左区域时及在按钮上时显示按钮
        startMove(oBtnPrev, 'opacity', 100);
    };
    oBtnPrev.onmouseout = oMarkLeft.onmouseout = function(){//鼠标移出左区域及按钮时按钮隐藏
        startMove(oBtnPrev, 'opacity', 0);
    };
    oBtnNext.onmouseover = oMarkRight.onmouseover = function(){//鼠标移入右区域时及在按钮上时显示按钮
        startMove(oBtnNext, 'opacity', 100);
    };
    oBtnNext.onmouseout = oMarkRight.onmouseout = function(){//鼠标移出右区域及按钮时按钮隐藏
        startMove(oBtnNext, 'opacity', 0);
    };
    //点击对应小图时，大图切换到对应的大图
    function funcImageDisplay(){//大图下拉过程封装成函数funcImageDisplay
        aLiBig[iNowFlag].style.zIndex = iNowZIndex++;
        for(var i = 0; i < aLiSmall.length; i++){
            startMove(aLiSmall[i], 'opacity', 60);//将小图都显示成半透膜状态
        }
        startMove(aLiSmall[iNowFlag], 'opacity', 100);//将当前图对应的小图设置成为当前图片即无透明状态
        aLiBig[iNowFlag].style.height = 0;//将大图从上往下拉显示，先高度为0，然后开始显示
        startMove(aLiBig[iNowFlag], 'height', 320);
        if(iNowFlag == 0){//解决小图左右最后一张显示的小问题
            startMove(oUlSmall, 'left', 0);
        }
        else if(iNowFlag == aLiSmall.length - 1){
            startMove(oUlSmall, 'left', -(iNowFlag - 2) * aLiSmall[0].offsetWidth);
        }
        else{
            startMove(oUlSmall, 'left', -(iNowFlag - 1) * aLiSmall[0].offsetWidth);
        }
    }
    //小图上点击对应大图显示
    for(var i = 0; i < aLiSmall.length; i++){
        aLiSmall[i].index = i;//给当前图片加标记
        aLiSmall[i].onclick = function (){
            if(this.index == iNowFlag) return;//若当前显示图片即点击图片，则不执行
            iNowFlag = this.index;
            funcImageDisplay();
        };
        //鼠标移入小图时的淡入淡出显示
        aLiSmall[i].onmouseover = function (){
            startMove(this, 'opacity', 100);
        };
        aLiSmall[i].onmouseout = function (){
            if(this.index != iNowFlag){//鼠标移出时若为当前页面则不变透明，反之则透明
                startMove(this, 'opacity', 60);
            }
        };
    }
    //左右键点击动作对应反映
    oBtnPrev.onclick = function(){
        iNowFlag--;
        if(iNowFlag == -1){//点击上一个时，若当前为第一张，则将iNowFlag设置为最后一张
            iNowFlag = aLiSmall.length - 1;
        }
        funcImageDisplay();
    };
    oBtnNext.onclick = function(){
        iNowFlag++;
        if(iNowFlag == aLiSmall.length){//点击下一个时，若当前为最后一张，则将iNowFlag设置为第一张
            iNowFlag = 0;
        }
        funcImageDisplay();
    };
    //自动播放功能，在没有鼠标移入移出时，开启定时器，自动播放图片
    clearInterval(timer);
    var timer = setInterval(oBtnNext.onclick, 2000);
    oDiv.onmouseover = function(){
        clearInterval(timer);
    };
    oDiv.onmouseout = function(){
        timer = setInterval(oBtnNext.onclick, 2000);
    };
};