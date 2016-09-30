var userInfo  = info.split('*');
console.log(userInfo);
for(var i = 0;i<userInfo.length;i++){
  userInfo[i] = JSON.parse(userInfo[i]);
}

console.log(userInfo);

new Vue({
  el: '#show',
  data: {
    userInfo:userInfo,
  }
})
