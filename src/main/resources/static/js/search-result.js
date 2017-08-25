/**
 * Created by zzg on 2017/4/26.
 */

var  page = {
    "pageId":"",
    "data":null,
    "maxshowpageitem":10,//最多显示的页码个数
    "pagelistcount":20,//每一页显示的内容条数
      "init":function(listCount,currentPage,options){
        this.data=options.data,
        this.pageId=options.id,
    this.maxshowpageitem=options.maxshowpageitem,//最多显示的页码个数
    this.pagelistcount=options.pagelistcount//每一页显示的内容条数
    page.initPage(listCount,currentPage);
  },
  /**
     * 初始化数据处理
     * @param listCount 列表总量
     * @param currentPage 当前页
     */
  "initPage":function(listCount,currentPage){
        var maxshowpageitem = page.maxshowpageitem;
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = page.pagelistcount;
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }   
        page.pagelistcount=pagelistcount;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
     
        page.setPageListCount(listCount,currentPage);
   },
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(listCount,currentPage){
        var pageCount = 1;
        if(listCount>=0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        $("#"+page.pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(listCount,currentPage){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(listCount,currentPage);
        page.initPageEvent(listCount);
        page.viewPage(currentPage,listCount,page.pagelistcount,page.data)
//      fun(currentPage);
    },
    //页面显示功能
     "viewPage":function (currentPage,listCount,pagelistcount,data){
            var NUM=listCount%pagelistcount==0?listCount/pagelistcount:parseInt(listCount/pagelistcount)+1;
            if(currentPage==NUM){
                var result=data.slice((currentPage-1)* pagelistcount,data.length);
            }
            else{
                var result=data.slice((currentPage-1)*pagelistcount,(currentPage-1)*pagelistcount+pagelistcount);
            }
            options.callBack(result);
    },
    "initPageEvent":function(listCount){
        $("#"+page.pageId +">li[class='pageItem']").on("click",function(){
            page.setPageListCount(listCount,$(this).attr("page-data"),page.fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>&lt;上一页</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount;
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>尾页</li>";
       return appendStr;

    }
}
var datas=[
    {"name":"大白菜镜像","material":"大白菜超级U盘启动制作工具一款专业的U盘制作工具，一键U盘装机工具...","list":"1","data":"2017-8-1"},
    {"name":"父子俩野营时喂了一只野猫 打开帐篷震惊","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳","list":"2","data":"2017-8-15"},
    {"name":"iPhone 7为啥卖不动？终于知道了！","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"3"},
    {"name":"7吨超美国！中国革命性大卫星领先世界1代","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"4"},
    {"name":"昨晚全世界都被杭州美哭了(图)","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳","list":"5"},
    {"name":"A系处理器成历史！苹果从零自研GPU","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"6"},
    {"name":"黑科技让NVMe SSD性能爆炸！再不浪费容量","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"7"},
    {"name":"都是泪！QQ最新大数据：年轻人看完沉默了","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳","list":"8"},
    {"name":"特斯拉什么车都要造：但就是不造它","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"9"},
    {"name":"新一代宝马X4首次现身：内外大换血！","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"10"},
    {"name":"又降价！Intel狂推首款可超频i3 中国特供","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"11"},
    {"name":"父子俩野营时喂了一只野猫 打开帐篷震惊","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳","list":"12"},
    {"name":"iPhone 7为啥卖不动？终于知道了！","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"13"},
    {"name":"7吨超美国！中国革命性大卫星领先世界1代","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"14"},
    {"name":"昨晚全世界都被杭州美哭了(图)","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳","list":"15"},
    {"name":"A系处理器成历史！苹果从零自研GPU","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"16"},
    {"name":"黑科技让NVMe SSD性能爆炸！再不浪费容量","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"17"},
    {"name":"都是泪！QQ最新大数据：年轻人看完沉默了","material":"切片吐司、紫薯、铁棍山药、糖桂花、炼乳","list":"18"},
    {"name":"特斯拉什么车都要造：但就是不造它","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"19"},
    {"name":"新一代宝马X4首次现身：内外大换血！","material":"明虾、番茄酱、白糖、白醋、葱、姜、淀粉","list":"20"},
    {"name":"二十四节气怎样来的？老祖宗真智慧","material":"三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽","list":"21"}
];
var options={
	"id":"page",//显示页码的元素
	"data":datas,//显示数据
    "maxshowpageitem":10,//最多显示的页码个数
    "pagelistcount":20,//每页显示数据个数
    "callBack":function(result){
    	     var cHtml="";
        for(var i=0;i<result.length;i++){
            cHtml+="<li>"+"<img class=\"pull-left content-img\" src=\"../img/bg-"+result[i].list+".jpg\">"
            +"<a>"+"<h3>"+ result[i].name+"</h3>"
            +"<p class=\"search-font pull-left  text-justify\">"+result[i].material+"</p>"
            +"<form role=\"role\" class=\"pull-right\">"+"<button class=\"btn btn-success pull-right\">"+"下载"+"</button>"+"<form>"
            +"<p class=\"data text-right\">"+result[i].data+"</p>"+"</a>"+"</li>";//处理数据
        }
        $("#demoContent").html(cHtml);//将数据增加到页面中
    }
};
   page.init(datas.length,1,options);
var searchResult=document.getElementById("searchResult").innerText;
var searchContent=document.getElementById("searchContent");
searchContent.innerText=searchResult+"kldad";
