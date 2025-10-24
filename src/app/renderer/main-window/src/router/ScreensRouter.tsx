
import { HashRouter, Route, Routes } from "react-router-dom";
import { RoutesPath } from "./util/RoutesPath";
import { GuiRoot } from "../gui/GuiRoot";
import { LoadUserProfileScreen } from "../gui/screens/load-user-profile/LoadUserProfileScreen";
import { NewProfileScreen } from "../gui/screens/new_profile/NewProfileScreen";
import { UserDashboard } from "../gui/screens/user-dashboard/UserDashboard";
import { Screen_Welcome } from "../gui/screens/welcome/Screen_Welcome";

export function ScreensRouter() {

    return (

        <HashRouter>

            <Routes>

                <Route element={<GuiRoot />}>

                    <Route index path={RoutesPath.WelcomeScreen} element={<Screen_Welcome />} />
                    
                    <Route path={RoutesPath.LoadUserProfileScreen} element={<LoadUserProfileScreen />} />

                    <Route path={RoutesPath.NewProfileScreen} element={<NewProfileScreen />} />
                    
                    <Route path={RoutesPath.USER_DASHBOARD} element={<UserDashboard />} />
                    
                </Route>

            </Routes>

        </HashRouter>
    )
}