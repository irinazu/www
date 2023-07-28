
var trs=document.getElementsByTagName("tr")
var d=[]


for (let i = 1; i < trs.length; i++) {
    var c_totalsize=trs[i].querySelector('.c_totalsize') 
    var c_time=trs[i].querySelector('.c_time')
    let member = {    
        c_time: c_time.innerHTML, 
        c_totalsize: c_totalsize.innerHTML        
      };
    d.push(member)
}


var chart = am4core.create("chartdiv", am4charts.XYChart);

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "c_totalsize";
categoryAxis.title.text = "Размер";

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.dataFields.category = "c_time";
valueAxis.title.text = "Время";

console.log(d)
chart.data = d;

