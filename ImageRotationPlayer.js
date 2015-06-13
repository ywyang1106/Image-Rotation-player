function getByClass(oParent, sClassName){//�Ӹ���������ѡ���Լ���Ҫ����sClassName
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
    var oDiv = document.getElementById('playImages');//dѡ��div
    var oBtnPrev = getByClass(oDiv, 'prev')[0];//ѡ����һ����ť
    var oBtnNext = getByClass(oDiv, 'next')[0];//ѡ����һ����ť
    var oMarkLeft = getByClass(oDiv, 'mark_left')[0];//ѡ��������
    var oMarkRight = getByClass(oDiv, 'mark_right')[0];//ѡ��������
    var oDivSmall = getByClass(oDiv, 'small_pic')[0];//��oDiv��ѡ������Ϊsmall_pic����
    var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];//��small_pic��ѡ���������ul
    var aLiSmall = oDivSmall.getElementsByTagName('li');//��small_pic��ѡ���������li
    var oUlBig = getByClass(oDiv, 'big_pic')[0];//��oDiv��ѡ������Ϊbig_pic����
    var aLiBig = oUlBig.getElementsByTagName('li');//��big_pic��ѡ���������li
    var iNowZIndex = 2;//��ʾ�����������������ͼ��Ӧ��z-index
    var iNowFlag = 0;//��¼��ǰ������ͼƬ��δ�����ظ����ͼƬʱҲ��������״̬

    oUlSmall.style.width = aLiSmall.length * aLiSmall[0].offsetWidth + 'px';//�ó�Сͼ�ܹ��Ŀ��
    //���Ұ�ť���뵭��
    oBtnPrev.onmouseover = oMarkLeft.onmouseover = function(){//�������������ʱ���ڰ�ť��ʱ��ʾ��ť
        startMove(oBtnPrev, 'opacity', 100);
    };
    oBtnPrev.onmouseout = oMarkLeft.onmouseout = function(){//����Ƴ������򼰰�ťʱ��ť����
        startMove(oBtnPrev, 'opacity', 0);
    };
    oBtnNext.onmouseover = oMarkRight.onmouseover = function(){//�������������ʱ���ڰ�ť��ʱ��ʾ��ť
        startMove(oBtnNext, 'opacity', 100);
    };
    oBtnNext.onmouseout = oMarkRight.onmouseout = function(){//����Ƴ������򼰰�ťʱ��ť����
        startMove(oBtnNext, 'opacity', 0);
    };
    //�����ӦСͼʱ����ͼ�л�����Ӧ�Ĵ�ͼ
    function funcImageDisplay(){//��ͼ�������̷�װ�ɺ���funcImageDisplay
        aLiBig[iNowFlag].style.zIndex = iNowZIndex++;
        for(var i = 0; i < aLiSmall.length; i++){
            startMove(aLiSmall[i], 'opacity', 60);//��Сͼ����ʾ�ɰ�͸Ĥ״̬
        }
        startMove(aLiSmall[iNowFlag], 'opacity', 100);//����ǰͼ��Ӧ��Сͼ���ó�Ϊ��ǰͼƬ����͸��״̬
        aLiBig[iNowFlag].style.height = 0;//����ͼ������������ʾ���ȸ߶�Ϊ0��Ȼ��ʼ��ʾ
        startMove(aLiBig[iNowFlag], 'height', 320);
        if(iNowFlag == 0){//���Сͼ�������һ����ʾ��С����
            startMove(oUlSmall, 'left', 0);
        }
        else if(iNowFlag == aLiSmall.length - 1){
            startMove(oUlSmall, 'left', -(iNowFlag - 2) * aLiSmall[0].offsetWidth);
        }
        else{
            startMove(oUlSmall, 'left', -(iNowFlag - 1) * aLiSmall[0].offsetWidth);
        }
    }
    //Сͼ�ϵ����Ӧ��ͼ��ʾ
    for(var i = 0; i < aLiSmall.length; i++){
        aLiSmall[i].index = i;//����ǰͼƬ�ӱ��
        aLiSmall[i].onclick = function (){
            if(this.index == iNowFlag) return;//����ǰ��ʾͼƬ�����ͼƬ����ִ��
            iNowFlag = this.index;
            funcImageDisplay();
        };
        //�������Сͼʱ�ĵ��뵭����ʾ
        aLiSmall[i].onmouseover = function (){
            startMove(this, 'opacity', 100);
        };
        aLiSmall[i].onmouseout = function (){
            if(this.index != iNowFlag){//����Ƴ�ʱ��Ϊ��ǰҳ���򲻱�͸������֮��͸��
                startMove(this, 'opacity', 60);
            }
        };
    }
    //���Ҽ����������Ӧ��ӳ
    oBtnPrev.onclick = function(){
        iNowFlag--;
        if(iNowFlag == -1){//�����һ��ʱ������ǰΪ��һ�ţ���iNowFlag����Ϊ���һ��
            iNowFlag = aLiSmall.length - 1;
        }
        funcImageDisplay();
    };
    oBtnNext.onclick = function(){
        iNowFlag++;
        if(iNowFlag == aLiSmall.length){//�����һ��ʱ������ǰΪ���һ�ţ���iNowFlag����Ϊ��һ��
            iNowFlag = 0;
        }
        funcImageDisplay();
    };
    //�Զ����Ź��ܣ���û����������Ƴ�ʱ��������ʱ�����Զ�����ͼƬ
    clearInterval(timer);
    var timer = setInterval(oBtnNext.onclick, 2000);
    oDiv.onmouseover = function(){
        clearInterval(timer);
    };
    oDiv.onmouseout = function(){
        timer = setInterval(oBtnNext.onclick, 2000);
    };
};