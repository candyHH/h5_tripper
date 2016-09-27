var userInfo  = info.split('*');
for(var i = 0;i<userInfo.length;i++){
  userInfo[i] = JSON.parse(userInfo[i]);
}


new Vue({
  el: '#show',
  data: {
    userInfo:userInfo,
  }
})
