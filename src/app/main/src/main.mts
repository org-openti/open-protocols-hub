import { Menu } from "electron";
import { getMainWindowInstance } from "./windows/main/main-window.mjs";

Menu.setApplicationMenu(null)

getMainWindowInstance().then((mainWindow) => {

    mainWindow.show()
})
