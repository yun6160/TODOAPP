const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://yun6160:6160dbs@cluster0.bu5yz.mongodb.net/todoapp?retryWrites=true&w=majority', function (에러, client) {
  if (에러) {
    return console.log(에러)
  }

  db = client.db('todoapp');

  app.listen(8080, function () {
    console.log('listening on 8080')
  });

})


// 여기까지 서버 띄우기 위한 기본 셋팅


app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/index.html');
  // 슬래시: 홈페이지라는 뜻
});

// get 함수는 파라미터 두개 받는데 그게 하나는 '/'고 하나는 function(){}
// 이때 function(){} 은 함수안의 함수라 콜백함수라고 함 -> 순차적으로 실행하고 싶을때 
// .get('경로', function(요청내용, 응답할 방법){})

app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/write.html');

});

app.post('/add', function (요청, 응답) {
  응답.send('전송완료')
  console.log(요청.body.todo)
  console.log(요청.body.startdate)
  
  // 오브젝트 데이터타입으로 자료 저장
  db.collection('post').insertOne({할일 : 요청.body.todo, 날짜 : 요청.body.startdate}, function(에러, 결과){
    console.log('저장완료');
  });
});

app.get('/list', function (요청, 응답) {
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('list.ejs', { posts : 결과 });
  });
  //파일명 post인 애들 모두 찾아주세요
  // 1. DB에서 자료 찾아주세요
  // 2. 찾은걸 ejs 파일에 집어넣어주세요

});