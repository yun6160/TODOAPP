const express = require('express');
const app = express();

app.listen(8080, function () {

  console.log('listening on 8080')
});
// 여기까지 서버 띄우기 위한 기본 셋팅

app.get('/beauty', function(요청, 응답){
  응답.send('뷰티용품 쇼핑 페이지임');


});