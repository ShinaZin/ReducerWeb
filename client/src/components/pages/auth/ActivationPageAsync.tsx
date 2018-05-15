import { asyncComponent } from 'react-async-component';
import { Loader } from '../../common/Loader';

export default asyncComponent({
  resolve: () => import('./ActivationPage'),
  LoadingComponent: Loader  
});