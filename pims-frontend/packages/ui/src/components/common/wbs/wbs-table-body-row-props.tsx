import { type TableRowProps } from '@mui/material';
import { type NonNullableFunction } from '@pims-frontend/ui/lib/utility-types';
import { type MRT_RowData, type MRT_TableOptions } from 'material-react-table';
import { type AdditionalRowKeys } from './cmm-wbs';

type WbsMuiTableBodyRowPropsProps<TData extends MRT_RowData> = Parameters<
  NonNullableFunction<MRT_TableOptions<TData>['muiTableBodyRowProps']>
>[0] & {
  additionalRowKeys: Required<AdditionalRowKeys>;
};

export const WbsMuiTableBodyRowProps = <TData extends MRT_RowData>(
  props: WbsMuiTableBodyRowPropsProps<TData>,
): TableRowProps => {
  const backgroundColor = () => {
    if (props.row.original[props.additionalRowKeys.isDeleted]) {
      return 'hsl(var(--table-deleted-row))';
    }

    if (props.row.original[props.additionalRowKeys.isCreated]) {
      return 'hsl(var(--table-created-row))';
    }

    if (props.row.original[props.additionalRowKeys.isMoved]) {
      return 'hsl(var(--table-moved-row))';
    }

    // default
    return 'hsl(var(--background))';
  };

  return {
    sx: {
      backgroundColor: backgroundColor(),
    },
  };
};
