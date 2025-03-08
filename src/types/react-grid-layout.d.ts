declare module 'react-grid-layout' {
    import * as React from 'react';
    
    export interface LayoutItem {
      w: number;
      h: number;
      x: number;
      y: number;
      i: string;
      minW?: number;
      minH?: number;
      maxW?: number;
      maxH?: number;
      moved?: boolean;
      static?: boolean;
      isDraggable?: boolean;
      isResizable?: boolean;
    }
    
    export type Layout = LayoutItem[];
    
    export interface Layouts {
      [key: string]: Layout;
    }
    
    export interface ReactGridLayoutProps {
      className?: string;
      style?: React.CSSProperties;
      layout?: Layout;
      cols?: number;
      rowHeight?: number;
      width?: number;
      margin?: [number, number];
      containerPadding?: [number, number];
      maxRows?: number;
      isDraggable?: boolean;
      isResizable?: boolean;
      isBounded?: boolean;
      useCSSTransforms?: boolean;
      transformScale?: number;
      preventCollision?: boolean;
      compactType?: 'vertical' | 'horizontal';
      onLayoutChange?: (layout: Layout) => void;
      onDragStart?: (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
      onDrag?: (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
      onDragStop?: (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
      onResizeStart?: (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
      onResize?: (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
      onResizeStop?: (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
    }
    export interface ResponsiveProps {
      className?: string;
      style?: React.CSSProperties;
      layouts: Layouts;
      breakpoints: { [key: string]: number };
      cols: { [key: string]: number };
      margin?: [number, number];
      containerPadding?: [number, number];
      rowHeight?: number;
      maxRows?: number;
      isDraggable?: boolean;
      isResizable?: boolean;
      isBounded?: boolean;
      useCSSTransforms?: boolean;
      transformScale?: number;
      preventCollision?: boolean;
      compactType?: 'vertical' | 'horizontal';
      children?: React.ReactNode; 
      onLayoutChange?: (layout: Layout, layouts: Layouts) => void;
      onBreakpointChange?: (newBreakpoint: string, newCols: number) => void;
      onWidthChange?: (containerWidth: number, margin: [number, number], cols: number, containerPadding: [number, number]) => void;
    }
    export type WidthProviderProps = ReactGridLayoutProps;
    
    // Créez un type pour les props de ResponsiveGridLayout
type ResponsiveGridLayoutProps = {
    className: string;
    layouts: LayoutsState;
    breakpoints: { [key: string]: number };
    cols: { [key: string]: number };
    rowHeight: number;
    margin: [number, number];
    onLayoutChange: (layout: Layout, allLayouts: Layouts) => void;
    draggableHandle: string;
    isBounded: boolean;
    useCSSTransforms: boolean;
    children?: React.ReactNode;
  };
  
  // Utilisez ce type pour l'assertion
  const ResponsiveGridLayout = WidthProvider(Responsive) as React.ComponentType<ResponsiveGridLayoutProps>;
  
    export default class ReactGridLayout extends React.Component<ReactGridLayoutProps> {}
    export class Responsive extends React.Component<ResponsiveProps> {}
    export function WidthProvider<P>(ComposedComponent: React.ComponentType<P>): React.ComponentType<P>;
  }