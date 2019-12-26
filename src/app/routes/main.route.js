import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListScreen from 'ui/screens/list.screen';

const MainStack = createStackNavigator({
  home: ListScreen,
});

export default createAppContainer(MainStack);
