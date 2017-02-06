angular.module('starter.services')
.service('CommonServices', function ($ionicLoading) {
        return {
          toasterInfo:function(msg,type,time) {
            time == null ?time = 1500:time=time
            type == null ?type = 'success':type=type
            if(type == 'success')
               $ionicLoading.show({ template: '<i style="color:#fff;" class="ion ion-ios-checkmark-outline"></i> '+ msg, noBackdrop: true, duration: time })
             else{
               $ionicLoading.show({ template: '<i style="color:#fff;" class="ion ion-ios-close-outline"></i> '+ msg, noBackdrop: true, duration: time })
            }
            return null;
          },
          waiting:function(IsShow){
            if(IsShow){
              $ionicLoading.show({ template: '<ion-spinner></ion-spinner>' })
            }else{
              $ionicLoading.hide();
            }
            
          },
          checkNum:function(v){
              var re=/^[0-9]*[1-9][0-9]*$/
              return re.test(v)
          },
          checkPrice:function(v){
              var re=/^[0-9]*[0-9][0-9]*\.?[0-9]{0,2}$/
              return re.test(v)

          },
          checkEmail:function(v){
              var re=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
              return re.test(v)
          },
          checkPhone:function(v){
              var re=/^1[34578]\d{9}$/
              return re.test(v)
          },
          checkFloat:function(v,bit){//bit 几位小数
              var st='^[0-9]+[0-9]*\\.+[0-9]{0,'+bit+'}$'
              var re=new RegExp(st)
              return re.test(v)
          },
          diffDate:function(StartDate,EndDate){
            var date1=new Date()
            var date2=new Date(EndDate)
            var date3=date2.getTime()-date1.getTime();//时间差秒
            //计算出相差天数
            var days=Math.floor(date3/(24*3600*1000))
            //计算出小时数
            var leave1=date3%(24*3600*1000)   //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))
            hours = hours + days*24;
            if(hours < 10){
                hours = "0"+hours
            }
              
            //增加天数

            //计算相差分钟数
            var leave2=leave1%(3600*1000)       //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))
              if(minutes < 10)
              minutes = "0"+minutes
            //计算相差秒数
            var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000)
            if(seconds < 10)
              seconds = "0"+seconds
            return hours + ":" + minutes + ":" + seconds;
          },
          PersentDate:function(StartDate,EndDate){
            var start = moment(StartDate);
            var end = moment(EndDate);
            var currdate =moment();
            var span1 = end.diff(start)
            var span2 = end.diff(currdate)
            if(span1 < 0 || span2<0){
              return '0%'
            }else{
              return parseInt(span2 * 100 / span1) + "%"
            }
          }
          
          

        }
    })