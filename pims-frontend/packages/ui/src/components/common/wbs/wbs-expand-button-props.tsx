import { type IconButtonProps } from '@mui/material';
import { NonNullableFunction } from '@pims-frontend/ui/lib/utility-types';
import { AxeIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { type MRT_RowData, type MRT_TableOptions } from 'material-react-table';
import { type PropsWithChildren } from 'react';

export type WbsMuiExpandButtonPropsProps<TData extends MRT_RowData> =
  Parameters<
    NonNullableFunction<MRT_TableOptions<TData>['muiExpandButtonProps']>
  >[0];

function ExpandButtonWithTaskName({
  taskName,
  children,
  className,
  ...rest
}: PropsWithChildren<{ taskName: string; className?: string }>) {
  return (
    <div {...rest} className={'flex flex-row items-center'}>
      {children}
      <span className="ml-4 prose dark:prose-invert font-normal text-sm">
        {taskName}
      </span>
    </div>
  );
}

export function WbsMuiExpandButtonProps<TData extends MRT_RowData>(
  props: WbsMuiExpandButtonPropsProps<TData>,
): IconButtonProps {
  const children = () => {
    if (props.row.getIsExpanded() && props.row.original.subRows.length > 0) {
      return (
        <ExpandButtonWithTaskName taskName={props.row.original['작업명']}>
          <MinusIcon />
        </ExpandButtonWithTaskName>
      );
    }

    if (props.row.getCanExpand()) {
      return (
        <ExpandButtonWithTaskName taskName={props.row.original['작업명']}>
          <PlusIcon />
        </ExpandButtonWithTaskName>
      );
    }

    return (
      <ExpandButtonWithTaskName taskName={props.row.original['작업명']}>
        <div className="w-6 h-6" />
      </ExpandButtonWithTaskName>
    );
  };

  return {
    // component: ExpandButtonWithTaskName,
    disableRipple: true,
    children: children(),
    sx: {
      justifyContent: 'flex-start',
      opacity: 1,
      width: 'fit-content',
    },
  };
}
