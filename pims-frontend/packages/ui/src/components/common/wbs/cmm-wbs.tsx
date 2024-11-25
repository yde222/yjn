'use client'

import { Divider } from '@mui/material'
import { getExpandState } from '@pims-frontend/ui/lib/get-expand-state'
import {
  getMRT_SelectAllHandler,
  MaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_RowData,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table'
import React from 'react'
import { DynamicIcon } from '../../ui/dynamic-icon'
import { createColumnsFromData } from '../cmm-material-react-table'
import { WbsBottomToolbar } from './wbs-bottom-toolbar'
import { WbsMuiExpandButtonProps } from './wbs-expand-button-props'
import { WbsMuiRowDragHandleProps } from './wbs-row-drag-handle-props'
import { WbsMuiTableBodyRowProps } from './wbs-table-body-row-props'
import { WbsTopToolbar } from './wbs-top-toolbar'

export type AdditionalRowKeys = {
  isMoved?: string
  isCreated?: string
  isDeleted?: string
}

type DataState<T extends MRT_RowData> = [
  T[],
  React.Dispatch<React.SetStateAction<T[]>>,
]

type AdditionalRowType = Partial<Record<keyof AdditionalRowKeys, boolean>>
export type CommonWBSProps<WBSData extends MRT_RowData> = {
  dataState: DataState<WBSData>
  initialData: WBSData[]
  subrowIndexKey?: string
  initialExpandedDepth?: `${number}`
  additionalRowKeys?: AdditionalRowKeys
}

export function CommonWBS<WBSData extends MRT_RowData>(
  props: CommonWBSProps<WBSData>,
) {
  const { subrowIndexKey = 'WBS', initialExpandedDepth = '2' } = props
  const additionalRowKeys = {
    isMoved: props.additionalRowKeys?.isMoved ?? 'isMoved',
    isCreated: props.additionalRowKeys?.isCreated ?? 'isCreated',
    isDeleted: props.additionalRowKeys?.isDeleted ?? 'isDeleted',
  } satisfies Required<AdditionalRowKeys>

  type RowData = WBSData & AdditionalRowType

  const [data, _setData] = props.dataState
  const columns = React.useMemo(
    () =>
      createColumnsFromData<RowData>(data, [
        '작업명',
        'depth',
        'childrenCount',
        'parent',
      ]),
    [data],
  )

  console.log('columns', columns)
  console.log('data', data)
  console.log('initialExpandedDepth', initialExpandedDepth)
  console.log('subrowIndexKey', subrowIndexKey)
  const [options, setOptions] = React.useState<
    Omit<MRT_TableOptions<WBSData>, 'data' | 'columns'>
  >({
    enableSubRowSelection: true,
  })

  const subrowData = data // [reconstructData(subrowIndexKey, data)];

  const handleResetData = React.useCallback(() => {
    // setData(props.initialData);
  }, [])

  const handleDeleteData = React.useCallback((ids: string[]) => {
    // setData((prev) => {
    //   return prev.map((row) => {
    //     if (ids.some((id) => row[subrowIndexKey].startsWith(id))) {
    //       return { ...row, [additionalRowKeys.isDeleted]: true };
    //     }
    //     return row;
    //   });
    // });
  }, [])

  const handleAddDataAbove = React.useCallback(
    (targetId: string) => {
      // setData(addDataAbove(targetId, subrowIndexKey));
    },
    [subrowIndexKey],
  )

  const handleAddDataBelow = React.useCallback(
    (targetId: string) => {
      // setData(addDataBelow(targetId, subrowIndexKey));
    },
    [subrowIndexKey],
  )

  const handleIndentLeft = React.useCallback(
    (targetId: string) => {
      // setData(indentLeft(targetId, subrowIndexKey));
    },
    [subrowIndexKey],
  )

  const table = useMaterialReactTable<RowData>({
    data: subrowData,
    columns: columns,
    manualPagination: true,
    enablePagination: true,

    enableExpanding: true,
    enableExpandAll: false,
    paginateExpandedRows: true,
    muiExpandButtonProps: WbsMuiExpandButtonProps,

    enableColumnActions: false,
    enableColumnFilters: false,
    enableColumnFilterModes: false,
    enableColumnDragging: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    displayColumnDefOptions: {
      'mrt-row-drag': {
        header: '',
      },
      'mrt-row-expand': {
        header: '작업명',
      },
    },

    enableRowDragging: true,
    enableRowOrdering: true,
    enableRowSelection: true,
    enableSelectAll: true,
    getRowId: row => row[subrowIndexKey],
    // NOTE: enableSubRowSelection은 top toolbar에서 선택할 수 있도록 함
    enableSubRowSelection: options.enableSubRowSelection,
    muiSelectAllCheckboxProps: props => ({
      onChange: e => {
        if (!options.enableSubRowSelection) {
          setOptions(prev => ({
            ...prev,
            enableSubRowSelection: true,
          }))
        }
        // NOTE: getMRT_SelectAllHandler는 material-react-table의 내부 함수
        getMRT_SelectAllHandler(props)(e)
      },
    }),

    enableCellActions: true,
    enableClickToCopy: 'context-menu',
    enableEditing: true,
    editDisplayMode: 'cell',
    renderCellActionMenuItems: ({ closeMenu, table, row }) => [
      <MRT_ActionMenuItem
        key={`${row.id}_copy_row_above`}
        icon={<DynamicIcon name="copy-plus" />}
        label={'위에 새 행 복사'}
        onClick={() => {
          handleAddDataAbove(row.id)
          closeMenu()
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={`${row.id}_copy_row_below`}
        icon={<DynamicIcon name="copy-plus" />}
        label={'아래에 새 행 복사'}
        onClick={() => {
          handleAddDataBelow(row.id)
          closeMenu()
        }}
        table={table}
      />,
      <Divider key={`${row.id}_action_separator`} />,
      <MRT_ActionMenuItem
        key={`${row.id}_indent_right`}
        icon={<DynamicIcon name="arrow-left-to-line" />}
        label={'상위 행으로 변경'}
        onClick={() => {
          handleIndentLeft(row.id)
          closeMenu()
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={`${row.id}_indent_left`}
        icon={<DynamicIcon name="arrow-right-to-line" />}
        label={'하위 행으로 변경'}
        onClick={() => {
          closeMenu()
        }}
        table={table}
      />,
    ],

    muiTableBodyRowProps: props =>
      WbsMuiTableBodyRowProps({
        ...props,
        additionalRowKeys: additionalRowKeys,
      }),

    muiRowDragHandleProps: props =>
      WbsMuiRowDragHandleProps({
        ...props,
        // setData,
        subrowIndexKey,
        additionalRowKeys: additionalRowKeys,
      }),

    enableTopToolbar: true,
    renderTopToolbar: props => (
      <WbsTopToolbar
        table={props.table}
        data={data}
        initialExpandedDepth={initialExpandedDepth}
        enableSubRowSelection={options.enableSubRowSelection}
        onEnableSubRowSelectionChange={checked =>
          setOptions(prev => ({
            ...prev,
            enableSubRowSelection: checked,
          }))
        }
      />
    ),

    enableBottomToolbar: true,
    renderBottomToolbar: props => (
      <WbsBottomToolbar
        table={props.table}
        subrowIndexKey={subrowIndexKey}
        data={data}
        onResetData={handleResetData}
        onDeleteData={handleDeleteData}
        onAddDataAbove={handleAddDataAbove}
      />
    ),

    mrtTheme: {
      // NOTE: 이거 안하면, hsl(NaN NaN undefined) 이런식으로 나와서 transparent처리됨 (pinned column이 가리질 않음)
      baseBackgroundColor: 'hsl(var(--background))',
    },

    localization: {
      expandAll: '모두 펼치기',
      expand: '펼치기',
      collapseAll: '모두 닫기',
      collapse: '닫기',
    },

    initialState: {
      density: 'compact',
      columnPinning: {
        left: [
          'mrt-row-select',
          'mrt-row-drag',
          subrowIndexKey,
          'mrt-row-expand',
        ],
      },
      showGlobalFilter: false,
      expanded: getExpandState(initialExpandedDepth, data, subrowIndexKey),
    },
  })

  React.useEffect(() => {
    document.body.style.cursor = table.getState().draggingRow ? 'grabbing' : ''
  }, [table.getState().draggingRow])

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  )
}
