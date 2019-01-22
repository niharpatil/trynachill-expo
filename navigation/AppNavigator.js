import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ActivityLauncherScreen from '../screens/ActivityLauncherScreen';
import ActivityLandingScreen from '../screens/ActivityLandingScreen'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  ActivityLauncher: ActivityLauncherScreen,
  ActivityLanding: ActivityLandingScreen,
});