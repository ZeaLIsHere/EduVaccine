import { useWindowDimensions } from 'react-native';

export type ScreenSize = 'phone' | 'tablet';

export interface ResponsiveValues {
  width: number;
  height: number;
  isTablet: boolean;
  screenSize: ScreenSize;
  px: number;
  headerIconSize: number;
  cardPadding: number;
  fontScale: number;
  tabBarHeight: number;
  tabIconSize: number;
  numColumns: number;
}

const TABLET_BREAKPOINT = 768;

export function useResponsive(): ResponsiveValues {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  return {
    width,
    height,
    isTablet,
    screenSize: isTablet ? 'tablet' : 'phone',
    px: isTablet ? 32 : 20,
    headerIconSize: isTablet ? 28 : 22,
    cardPadding: isTablet ? 28 : 16,
    fontScale: isTablet ? 1.15 : 1,
    tabBarHeight: isTablet ? 80 : 70,
    tabIconSize: isTablet ? 28 : 24,
    numColumns: isTablet ? 4 : 2,
  };
}
