import { Provider } from 'react-redux';
import { store } from '@/store';
import { WrapperView } from '@/components/ui';
import '@/styles/layout';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <WrapperView>
        <slot />
      </WrapperView>
    </Provider>
  );
}
