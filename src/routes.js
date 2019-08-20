import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Product from '~/pages/Product';

const Routes = createAppContainer(createSwitchNavigator({ Product, Main }));

export default Routes;
