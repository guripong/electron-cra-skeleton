
import React from 'react';

console.log("@@app.js@@")
console.log(global.window)
const ipcRenderer = window.ipcRenderer;

function App() {
  
  
  const handleTestSync = ()=>{
      ///////////////동기(synchronous) 사용법  blocking방식입니다 응답을 기다립니다. 변수에 응답값이 할당될때까지 기다립니다///////////////
    console.log("야를 보냄");
    var response_from_main = ipcRenderer.sendSync('synchronous-message', '야');
    console.log( response_from_main+ "가 왔음") // "pong"이 출력됩니다.
  }
  const handleTestAsync = ()=>{
    ipcRenderer.send('asynchronous-message', '있'); //main.js에 잇을 보냄
    console.log("있 보냄 1초뒤 메시지도착해야함");
  }




  React.useEffect(()=>{
    console.log("안쪽임")
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg + "이 왔음") // main.js에서 메세지가 온것에 대한 다시응답
    })
  },[])
  
  return (
    <div className="App">
      ctr+r 새로고침 <br/>
      ctr+shift+i  콘솔창<br/>
        리엑트앱 a
        <button onClick={handleTestSync}>sync통신확인</button>
        <button onClick={handleTestAsync}>async통신확인</button>
    </div>
  );
}

export default App;
