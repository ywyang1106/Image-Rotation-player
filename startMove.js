/* Created by Wen on 2015/5/3.*/
function getStyle(oObjectName, sStyleName){//��ȡ�����м����ʽ����
    if(oObjectName.currentStyle){
        return oObjectName.currentStyle[sStyleName];//��ȡ�м���ʽ
    }
    else{
        return getComputedStyle(oObjectName, false)[sStyleName];//���м���ʽ������ʱ����ȡ���м���ʽ
    }
}
function startMove(oObjectName, sAttributeName, vTarget){//���ĳ������ʵ�ְ��Լ���Ҫ����ĳ�ֱ仯��ʽ�˶�����vTargetΪֹ
    clearInterval(oObjectName.vTimer);//�ص���ʱ��
    oObjectName.vTimer = setInterval(function(){//������ʱ��
        var vCurrentValue = 0;//vAttr��Ӧ�����Եĵ�ǰֵvCurrentValue
        if(sAttributeName == 'opacity'){//��Ӧ͸���ȱ仯��������һ�ַ�ʽ���漰����������
            vCurrentValue = Math.round(parseFloat(getStyle(oObjectName, sAttributeName)) * 100);
        }
        else{
            vCurrentValue = parseInt(getStyle(oObjectName, sAttributeName));//�����ķ�ʽ
        }
        var vSpeed = (vTarget - vCurrentValue) / 6;//�ı���ٶ�
        vSpeed = vSpeed > 0 ? Math.ceil(vSpeed) : Math.floor(vSpeed);//���ٶ�ȡ��
        if(vCurrentValue == vTarget){
            clearInterval(oObjectName.vTimer);//���ﵽĿ�꣬��رն�ʱ��
        }
        else{
            if(sAttributeName == 'opacity'){//��Ӧ͸���ȱ仯��������һ�ַ�ʽ���漰����������
                oObjectName.style.filter = 'alpha(opacity:' + (vCurrentValue + vSpeed) + ')';//IE�����
                oObjectName.style.opacity = (vCurrentValue + vSpeed) / 100;//���������͹ȸ������
            }
            else{//�����ķ�ʽ
                oObjectName.style[sAttributeName] = vCurrentValue + vSpeed + 'px';
            }
        }
    }, 30);//30��Ӧ��ʱ���������ٶ�
}