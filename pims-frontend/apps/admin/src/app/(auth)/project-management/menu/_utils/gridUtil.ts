export type RowClickEvent = {
  grid: TGrid
  row: TRow
  col: string
}

type GridOnClickCallback = (params: {
  grid: TGrid
  row: TRow
  col: string
}) => boolean | number | null | undefined | void

type grudUtilProps = {
  data: any[]
  colInfo: {
    accessorKey: string
    header: string
    visible: string
    size?: string
    type: string
    canEdit?: string
    option?: { name: string; value: string }[]
    placeholder?: string
  }[]
  gridId: string
  cbFunction?: GridOnClickCallback
}

export const gridUtil = ({
  colInfo,
  data,
  gridId,
  cbFunction,
}: grudUtilProps) => {
  if (Grids[gridId]) Grids[gridId].Dispose()

  const gridColumns = colInfo.map(col => {
    return `<C
              Name='${col.accessorKey}'
              Type='${col.type}'
              Visible='${col.visible}'
              MinWidth='80'
              CanEdit='${col.canEdit}'
              ${col.size ? `Width='${col.size}'` : `RelWidth='1'`}
              ${col.placeholder ? `EmptyValue='${col.placeholder}'` : ''}
              ${col.type === 'Enum' ? `CanSort='0' Align='left' EnumKeys='' Enum='' IconAlign='Right' ShowHint='0' ` : ''}
            />`
  })

  const formatRow = row => {
    const attributes = Object.entries(row)
      .filter(([key, value]) => key !== 'children') // childTasks 제외
      .map(([key, value]) => {
        if (
          key === 'isCopyable' ||
          key === 'isEnabled' ||
          key === 'isEditable'
        ) {
          // 체크박스 값을 '0' 또는 '1'로 설정
          return `${key}='${value ? '1' : '0'}'`
        }
        return `${key}='${value}'`
      })
      .join(' ')

    let children = ''
    if (row.children && row.children.length > 0) {
      children = row.children.map(formatRow).join('') // 재귀 호출로 childTasks 처리
    }

    return `<I ${attributes}>${children}</I>`
  }
  const bodyDatas = data.map(formatRow)

  const header = ` ${colInfo.map(({ accessorKey, header }) => `${accessorKey}='${header}'`).join(' ')}`
  const ganttGrid = `
      <Grid>
          <Cfg Code="GTBEZCPSIIQIKC" SafeCSS='1' MaxWidth='1' />
          <Cfg id="${gridId}" MainCol="menuName" />
          <Cfg NumberId="1" IdChars="0123456789"/>
          <Cfg Style="Standard"/>
          <Cfg Paging="2" PageLength="2" MaxPages="20"/>
          <Cfg Deleting="1"/>
          <Cfg Selecting="1"/>
          <Cfg Adding="1"/>
          <Cfg DateStrings="yyyy-MM-dd"/>
          <Cfg SuppressCfg="1"/>
          <Pager Name="Pager" Width="250" Type="Pages" Caption="Test Pager" Visible="0"/>
       
          
          <Cols>
            ${gridColumns}
          </Cols>
          <Header id='Header' ${header} />
          <Toolbar Visible="1"/>
          <Zoom>
              <Z Name="weeks and days" GanttUnits="d" GanttChartRound="w" GanttWidth="18" GanttWidthEx="80"
                  GanttHeader1="w#yyyy-MM(dddddd)" GanttHeader2="d#ddddd"/>
          </Zoom>
          <Calendars>
              <E Name="Workdays" />
          </Calendars>
          <Body>
              <B>
                  ${bodyDatas}
              </B>
          </Body>
      </Grid>
  `
  const currentGrid = TreeGrid(ganttGrid, gridId)
  if (cbFunction && Grids) {
    Grids.OnClick = (grid, row, col) => {
      return cbFunction({ grid, row: row, col })
    }

    Grids.OnValueChanged = function (G, row, col, val, oldval) {
      if (val != oldval) {
        if (G === Grids[gridId]) {
          G.SelectRow(row, 1) // 1: 선택, 0: 선택 해제
        }
      }
    }

    Grids.OnRowDelete = function (G, row) {
      if (G === Grids['menuGrid']) {
        G.SelectRow(row, 1) //1:선택 , 0:선택해제
      }
    }
  }
  return currentGrid
}
