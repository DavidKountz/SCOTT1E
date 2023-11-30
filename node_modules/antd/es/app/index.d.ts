import type { ReactNode } from 'react';
import React from 'react';
import type { CustomComponent } from '../_util/type';
import type { AppConfig, useAppProps } from './context';
export interface AppProps extends AppConfig {
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;
    prefixCls?: string;
    children?: ReactNode;
    component?: false | CustomComponent;
}
declare const useApp: () => useAppProps;
declare const App: React.FC<AppProps> & {
    useApp: typeof useApp;
};
export default App;
