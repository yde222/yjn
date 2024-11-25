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

export type CustomGridOnClick<T> = (params: {
  grid: TGrid
  row: TRow & T
  col: string
}) => boolean | number | null | undefined | void

type grudUtilProps<T> = {
  data: any[]
  colInfo: {
    accessorKey: string
    header: string
    visible: string
    size?: string
    type: string
    canedit: number
    option?: { name: string; value: string }[]
  }[]
  gridId: string
  onClickRow?: CustomGridOnClick<T>
}

export const gridUtil = <T>({
  colInfo,
  data,
  gridId,
  onClickRow,
}: grudUtilProps<T>) => {
  if (Grids[gridId]) Grids[gridId].Dispose()

  var isDeleteField = false

  if (colInfo.some(item => item.accessorKey === 'delete')) {
    isDeleteField = true
  }

  const gridColumns = colInfo.map(col => {
    const isEnumType = col.type === 'Enum'

    // EnumType이고 option이 존재하는 경우에만 처리
    const enumKeys =
      isEnumType && col.option
        ? `|${col.option.map(opt => opt.value).join('|')}`
        : ''

    const enumNames =
      isEnumType && col.option
        ? `|${col.option.map(opt => opt.name).join('|')}`
        : ''

    const style =
      col.accessorKey === 'codeGroupUid'
        ? "Style='color: #35699e; font-weight: bold; cursor: pointer;'"
        : ''

    return `<C
          Name='${col.accessorKey}'
          Type='${col.type}'
          Visible='${col.visible}'
          MinWidth='80'
          RelWidth='1'
          CanEdit='${col.canedit}'
          Width='${col.size}'
          ${isEnumType ? `CanSort='1' Align='left' EnumKeys='${enumKeys}' Enum='${enumNames}' IconAlign='Right' ShowHint='0'` : ''}
          ${style}
        />`
  })

  let bodyDatas = ''
  if (data && data.length) {
    for (let i = 0; i < data.length; i++) {
      const row = data[i]

      if (row) {
        let attributes = ''
        for (const [key, value] of Object.entries(row)) {
          let displayValue = value // 기본적으로 value를 사용
          if (isDeleteField) {
            attributes += " deleteIcon='/Trash.svg' deleteIconAlign='center' "
          }
          attributes += `${key}='${displayValue}' `
          if (key === 'isEditable' || key === 'isEnabled') {
            // 체크박스 값을 '0' 또는 '1'로 설정
            attributes += `${key}='${displayValue ? '1' : '0'}' `
          }
        }

        // attributes를 포함한 <I /> 태그 생성
        bodyDatas += `<I ${attributes.trim()} />`
      }
    }
  }

  const header = ` ${colInfo.map(({ accessorKey, header }) => `${accessorKey}='${header}'`).join(' ')}`
  const tgrid = `
  <Grid>
    <Def>
      <D Name='Group' Expanded='1'/>
      <D Name='R' Calculated='1' CalcOrder=''/>
    </Def>
    <Toolbar Visible='0'/>
    <Cfg 
      id="${gridId}"  
      SafeCSS='1' 
      Deleting='0' 
      Selecting='1' 
      Code='GTBEZCPSIIQIKC' 
      CanHide='2' 
      MaxWidth='1' 
      ${gridId === 'gridCodeGroup' ? "NoVScroll='0'" : "NoVScroll='1'"}
      ConstWidth='0' 
      Dragging='1' 
      StandardTip='0'
    />
    <Cols>
      ${gridColumns}
    </Cols>
    <Body>
      <B>
        ${bodyDatas}
      </B>
    </Body>
    <Header id='Header' NoEscape='1' ${header} />
  </Grid>
`

  const currentGrid = TreeGrid(tgrid, gridId)

  if (onClickRow && Grids) {
    Grids.OnClick = (grid, row, col, x, y, event) => {
      return onClickRow({ grid, row: row as TRow & T, col })
    }
    Grids.OnValueChanged = function (G, row, col, val, oldval) {
      if (val !== oldval) {
        if (G === Grids['gridCodeGroup']) {
          G.SelectRow(row, 1)
        } else if (G === Grids['gridCodeDetail']) {
          G.SelectRow(row, 1)
        }
      }
    }
    Grids.OnRowMove = function (G, row, oldparent, oldnext) {
      // onDragEnd()
      if (G === Grids[gridId]) {
        G.SelectRow(row, 1) // 1: 선택, 0: 선택 해제
      }
    }
    return currentGrid
  }
}
