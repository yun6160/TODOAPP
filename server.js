const express = require('express');
const app = express();

app.use(express.urlencoded({extended : true}));

app.listen(8080, function () {

  console.log('listening on 8080')
});
// 여기까지 서버 띄우기 위한 기본 셋팅


app.get('/', function(요청, 응답){
  응답.sendFile(__dirname + '/index.html');
  // 슬래시: 홈페이지라는 뜻
});

// get 함수는 파라미터 두개 받는데 그게 하나는 '/'고 하나는 function(){}
// 이때 function(){} 은 함수안의 함수라 콜백함수라고 함 -> 순차적으로 실행하고 싶을때 
// .get('경로', function(요청내용, 응답할 방법){})

app.get('/write', function(요청, 응답){
  응답.sendFile(__dirname + '/write.html');
  
});

app.post('/add', function(요청, 응답){
  응답.send('전송완료')
  console.log(요청.body)
});