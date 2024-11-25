import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { DynamicIcon } from './dynamic-icon';
import React from 'react';

export type IconLibraryConsumerProps = {
  type?: 'lucide' | 'feather'; // NOTE: 다른 아이콘 시스템이 있을 경우 Union으로 붙일 것; feather는 그냥 예시임
  iconName: keyof typeof dynamicIconImports;
};

export const IconLibraryConsumer = React.memo(
  function WrappedIconLibraryConsumer(props: IconLibraryConsumerProps) {
    const { type = 'lucide' } = props;

    if (type === 'feather') {
      return <span className="sr-only">feather icon is not supported</span>;
    }

    return <DynamicIcon name={props.iconName} />;
  },
);
