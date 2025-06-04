declare module 'react-native-actions-sheet' {
  import { ForwardedRef } from 'react';
  import { ViewStyle } from 'react-native';

  export interface ActionSheetRef {
    show(): void;
    hide(): void;
  }

  export interface ActionSheetProps {
    containerStyle?: ViewStyle;
    gestureEnabled?: boolean;
    snapPoints?: number[];
    initialSnapIndex?: number;
    statusBarTranslucent?: boolean;
    drawUnderStatusBar?: boolean;
    useBottomSafeAreaPadding?: boolean;
    children?: React.ReactNode;
  }

  declare const ActionSheet: React.ForwardRefExoticComponent<ActionSheetProps & React.RefAttributes<ActionSheetRef>>;
  export default ActionSheet;
} 