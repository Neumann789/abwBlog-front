import utils from "./utils";

function timeFormat (input) {
  var value=new Date(input);
  var year=value.getFullYear();
  var month=value.getMonth()+1;
  var day=value.getDate();
  var hour=value.getHours();
  var minutes=value.getMinutes();
  var seconds=value.getSeconds();
  return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
}

function categoryFormat(category)  {
  let key = 'navList_'+ category
  console.log("categoryFormat",key)
  return utils.configData.data[key].configVal || key
}

function shortFormat(msg,len = 10) {
  if(msg.length>len){
    return msg.substr(0,len).concat("...")
  }else{
    return msg
  }

}

const install = function (Vue) {
  Vue.filter('timeFormat', timeFormat),
  Vue.filter('categoryFormat', categoryFormat),
  Vue.filter('shortFormat', shortFormat)
}

export default install
