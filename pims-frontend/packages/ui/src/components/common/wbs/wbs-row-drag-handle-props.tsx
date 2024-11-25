import { swapBlockArrs } from '@pims-frontend/ui/lib/swap';
import { type NonNullableFunction } from '@pims-frontend/ui/lib/utility-types';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableOptions,
} from 'material-react-table';
import { type AdditionalRowKeys } from './cmm-wbs';
import { type TableRowProps } from '@mui/material';

type WbsMuiRowDragHandlePropsProps<TData extends MRT_RowData> = Parameters<
  NonNullableFunction<MRT_TableOptions<TData>['muiRowDragHandleProps']>
>[0] & {
  setData?: React.Dispatch<React.SetStateAction<TData[]>>;
  subrowIndexKey: string;
  additionalRowKeys: Required<AdditionalRowKeys>;
};

export const WbsMuiRowDragHandleProps = <TData extends MRT_RowData>(
  props: WbsMuiRowDragHandlePropsProps<TData>,
) => {
  const { table, setData, subrowIndexKey } = props;

  return {
    onDragEnd: () => {
      const { draggingRow, hoveredRow } = table.getState();
      if (!hoveredRow || !draggingRow) {
        return;
      }

      if (!hoveredRow.original?.[subrowIndexKey]) {
        return;
      }

      const hOWBS = hoveredRow.original[subrowIndexKey];

      // setData((prev) => {
      //   if (
      //     draggingRow.original[subrowIndexKey].includes(hOWBS) ||
      //     hOWBS.includes(draggingRow.original[subrowIndexKey])
      //   ) {
      //     return prev;
      //   }

      //   const draggingRowIndex = prev.findIndex(
      //     (r) => r[subrowIndexKey] === draggingRow.original[subrowIndexKey],
      //   );
      //   const hoveredRowIndex = prev.findIndex(
      //     (r) => r[subrowIndexKey] === hoveredRow.original?.[subrowIndexKey],
      //   );

      //   if (
      //     draggingRowIndex === -1 ||
      //     hoveredRowIndex === -1 ||
      //     draggingRowIndex === hoveredRowIndex
      //   ) {
      //     return prev;
      //   }

      //   const draggingRowWithChildren = prev
      //     .filter((r) =>
      //       r[subrowIndexKey].startsWith(draggingRow.original[subrowIndexKey]),
      //     )
      //     .map((v) => ({
      //       ...v,
      //       [subrowIndexKey]: v[subrowIndexKey].replace(
      //         draggingRow.original[subrowIndexKey],
      //         hoveredRow.original![subrowIndexKey],
      //       ),
      //       [props.additionalRowKeys.isMoved]: true,
      //     }));

      //   const hoveredRowWithChildren = prev
      //     .filter((r) =>
      //       r[subrowIndexKey].startsWith(hoveredRow.original![subrowIndexKey]),
      //     )
      //     .map((v) => ({
      //       ...v,
      //       [subrowIndexKey]: v[subrowIndexKey].replace(
      //         hoveredRow.original![subrowIndexKey],
      //         draggingRow.original[subrowIndexKey],
      //       ),
      //       [props.additionalRowKeys.isMoved]: true,
      //     }));

      //   return swapBlockArrs(
      //     prev,
      //     draggingRowIndex,
      //     draggingRowWithChildren,
      //     hoveredRowIndex,
      //     hoveredRowWithChildren,
      //   );
      // });
    },
  } satisfies TableRowProps;
};
