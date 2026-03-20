import React from 'react';

const createComponent = (name: string) => {
  const Component = (props: Record<string, unknown>) =>
    React.createElement(name, props, props.children as React.ReactNode);

  Component.displayName = name;
  return Component;
};

export const View = createComponent('View');
export const Text = createComponent('Text');
export const SafeAreaView = createComponent('SafeAreaView');
export const ScrollView = createComponent('ScrollView');
export const Pressable = createComponent('Pressable');
export const FlatList = createComponent('FlatList');
export const RefreshControl = createComponent('RefreshControl');
export const Platform = {
  OS: 'ios'
};

export const Button = ({
  title,
  onPress
}: {
  title: string;
  onPress: () => void;
}) => React.createElement('Button', { title, onPress }, title);

export const StyleSheet = {
  create: <T extends object>(styles: T): T => styles
};
