// Modules to control application life and create native browser window

let { app, BrowserWindow, ipcMain } = require('electron')
// Enable live reload for Electron too


const isDev = require('electron-is-dev');
const path = require('path')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';  //경고창 제거

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg + "가 왔음!!!!! 호를 보냄"); // "ping" 출력

    event.returnValue = '호';
})

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg + "가 왔음!!! 힝을 보낼게") // "ping" 출력
    setTimeout(function(){
        event.reply('asynchronous-reply', '힝2')
    },1000);

})


function createWindow() {
    console.log("createWindow");
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        // alwaysOnTop: true,  //항상 윗쪽
        // frame: false,
        // fullscreenable: false,
        // transparent: true,
        // titleBarStyle: 'customButtonsOnHover',
        // show: false,
        width: 800,
        height: 600,
        // frame: false,
        // transparent: true,
        webPreferences: {
            nodeIntegration: true,
            // enableRemoteModule: true,
            contextIsolation: false,
            // preload: path.join(__dirname, 'preload.js'),
            preload: __dirname + '/preload.js'
        }
    })

    // and load the index.html of the app.
    //   mainWindow.loadFile('index.html')
    console.log("isDev:"+isDev);
   console.log(`${path.join(__dirname, '../build/index.html')}`);
    
   /*
    mainWindow.loadURL(
        `file://${path.join(__dirname, '../build/index.html')}`
    )
    mainWindow.loadFile(
        `${path.join(__dirname, '../build/index.html')}`
    )
    */
    // mainWindow.loadURL('http://localhost:3000')
    mainWindow.loadFile(
        `${path.join(__dirname, '../build/index.html')}`
    )
    
    /*
    if(isDev){
        mainWindow.loadURL('http://localhost:3000')
    }
    else{
        mainWindow.loadFile('../build/index.html')
    }
    */

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()

        console.log("activate완료")
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
