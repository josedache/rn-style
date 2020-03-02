import React, {createContext} from 'react';
import {Typography, createTypography} from './typography';
import {Colors, createColors} from './colors';
import {Elevations, createElevations} from './elevations';
import {Spacing, createSpacing} from './spacing';
import {MergeRecursive, PartialRecursive} from '../types';

export * from './typography';
export * from './colors';
export * from './elevations';
export * from './spacing';

export interface Theme {
  colors: Colors;
  typography: Typography;
  elevations: Elevations;
  spacing: Spacing;
}

export type MergeRecursiveTheme<T> = MergeRecursive<T, Theme>;

export const DEFAULT_THEME = createTheme();

export function createTheme<T extends MergeRecursiveTheme<T>>(
  theme: PartialRecursive<T> = {},
): T {
  return {
    spacing: createSpacing,
    ...theme,
    colors: createColors(theme.colors),
    typography: createTypography(theme.typography),
    elevations: createElevations(theme.elevations),
  } as T;
}

export function createContextTheme<T extends MergeRecursive<T, Theme>>(
  theme: PartialRecursive<T> = {},
): React.Context<T> {
  const contextTheme = createTheme(theme);
  const context = createContext(contextTheme);
  return context;
}
