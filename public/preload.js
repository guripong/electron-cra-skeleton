
const { ipcRenderer,remote } = require('electron');
window.ipcRenderer = ipcRenderer;
window.remote = remote;


// window.aaa =1;
// window.require = require;
// console.log("@@preload@@");
// console.log(window);
// window.abc=1;
// console.log("global");
// console.log(global);

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
    

    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type]);
    }
  
    replaceText(`mytestid`,"aaa이부분은 preload.js 에서 미리 load되었습니다");
    

  
  });
  