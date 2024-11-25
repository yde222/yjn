'use client'

import {
  useBulkDeleteGlobalMenusMutation,
  useBulkUpdateGlobalMenusMutation,
  useCreateGlobalMenusMutation,
  useDeleteGlobalMenusMutation,
  useGetAllGlobalMenusQuery,
  useGetEnableUseLanguageQuery,
  useLazyGetAllGlobalMenusQuery,
  useUpdateGlobalMenusMutation,
} from '@pims-frontend/apis/lib/features/common/menu/controller/MenuController'
import { Button } from '@pims-frontend/ui/components/ui/button'
import CommonTable from '@pims-frontend/ui/components/ui/custom/CommonTable'
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import { useEffect } from 'react'
import { gridUtil, type RowClickEvent } from '../_utils/gridUtil'
import MenuIconGallery from './MenuIconGallery'

import { MenuCreateReqDto } from '@pims-frontend/apis/lib/features/common/menu/dto/request/MenuCreateReqDto'
import { MenuUpdateReqDto } from '@pims-frontend/apis/lib/features/common/menu/dto/request/MenuUpdateReqDto'
import { MenuDeleteReqDto } from '@pims-frontend/apis/lib/features/common/menu/dto/request/MenuDeleteReqDto'
import {
  MenuResDto,
  MenuTranslationData,
} from '@pims-frontend/apis/lib/features/common/menu/dto/response/MenuResDto'

export const GlobalMenuSheet = () => {
  const menuReqDto = { menuType: 'ADMIN' }

  const { data, error, isLoading } = useGetAllGlobalMenusQuery(menuReqDto)
  const [create] = useCreateGlobalMenusMutation()
  const [updateRow] = useUpdateGlobalMenusMutation()
  const [deleteRow] = useDeleteGlobalMenusMutation()
  const [bulkUpdate] = useBulkUpdateGlobalMenusMutation()
  const [bulkDelete] = useBulkDeleteGlobalMenusMutation()

  const { data: languageData } = useGetEnableUseLanguageQuery({ keyword: '' })
  const { toast } = useToast()

  const colInfo = [
    {
      accessorKey: 'menuUid',
      header: '메뉴 ID',
      size: '50',
      visible: '1',
      type: 'Text',
      canEdit: '1',
    },
    {
      accessorKey: 'menuName',
      header: '메뉴명',
      size: '150',
      visible: '1',
      type: 'Text',
      canEdit: '1',
    },
    {
      accessorKey: 'menuUrl',
      header: '메뉴 주소',
      visible: '1',
      type: 'Text',
      canEdit: '1',
      placeholder: '메뉴주소입력',
    },
  ]

  const rowClick = (info: RowClickEvent) => {
    if (info.col === 'Panel') return
    return
  }

  let gridRef = null

  type CombinedRowType = TRow & MenuResDto

  useEffect(() => {
    if (data && languageData) {
      const data = languageData.map(item => {
        colInfo.push({
          accessorKey: `${item.locale}`,
          header: `${item.locale}`,
          visible: '1',
          size: '100',
          type: 'Text',
          canEdit: '1',
        })
      })
      colInfo.push(
        {
          accessorKey: 'parentMenuUid',
          header: '상위 메뉴',
          visible: '0',
          size: '10',
          type: 'Text',
          canEdit: '1',
        },
        {
          accessorKey: 'menuType',
          header: '메뉴 타입',
          visible: '0',
          size: '10',
          type: 'Text',
          canEdit: '1',
        },
        {
          accessorKey: 'menuLevel',
          header: '메뉴 레벨',
          visible: '0',
          size: '10',
          type: 'Text',
          canEdit: '1',
        },
        {
          accessorKey: 'menuOrder',
          header: '메뉴 순서',
          visible: '1',
          size: '120',
          type: 'Text',
          canEdit: '1',
        },
        {
          accessorKey: 'menuIcon',
          header: '메뉴 아이콘',
          visible: '1',
          type: 'Text',
          canEdit: '1',
          placeholder: '',
        },
        {
          accessorKey: 'isEnabled',
          header: '사용 여부',
          visible: '1',
          size: '150',
          type: 'Bool',
          canEdit: '1',
        },
        {
          accessorKey: 'isEditable',
          header: '수정 가능 여부',
          visible: '1',
          size: '150',
          type: 'Bool',
          canEdit: '1',
        },
        {
          accessorKey: 'isCopyable',
          header: '복제 가능 여부',
          visible: '1',
          size: '150',
          type: 'Bool',
          canEdit: '1',
        },
      )
    }
  }, [data])

  const setGrid = (data: MenuResDto[]) => {
    if (data) {
      const processData = (items: MenuResDto[]): MenuResDto[] => {
        return items.map((item: MenuResDto) => {
          const newItem = { ...item }
          if (newItem.menuTranslations) {
            newItem.menuTranslations.forEach(
              (translation: MenuTranslationData) => {
                newItem[translation.locale] = translation.menuName
              },
            )
          }

          // 하위 children이 있을 경우 재귀적으로 처리
          if (newItem.children && newItem.children.length > 0) {
            newItem.children = processData(newItem.children)
          }
          return newItem
        })
      }

      gridRef = gridUtil({
        colInfo: colInfo,
        data: processData(data),
        gridId: 'menuGrid',
        cbFunction: rowClick,
      })
    }
  }

  useEffect(() => {
    if (data) {
      setGrid(data)
    }
  }, [data])

  const saveBtn = () => {
    if (!Grids['menuGrid']) return
    let rows = Grids['menuGrid'].GetSelRows()

    if (!rows || rows.length === 0) {
      toast({
        title: `저장할 row를 체크해주세요`,
      })
      return
    }

    let addData: MenuCreateReqDto[] = []
    let updData: MenuUpdateReqDto[] = []
    let delData: MenuDeleteReqDto[] = []

    const makeMenuTranslations = (row: TRow & MenuResDto) => {
      let MenuTranslationData: MenuTranslationData[] = []
      if (languageData) {
        languageData.map(item => {
          MenuTranslationData.push({
            locale: item.locale,
            menuName: row[item.locale] ? row[item.locale] : '',
          })
        })
      }
      return MenuTranslationData
    }
    rows.forEach(row => {
      const genRow = row as TRow & MenuResDto
      const parentRow = row.parentNode as TRow & MenuResDto
      if (genRow.Added) {
        addData.push({
          projectUid: 6,
          parentMenuUid: parentRow ? parentRow.menuUid : 0,
          menuName: genRow.menuName,
          menuTranslations: makeMenuTranslations(genRow),
          menuUrl: genRow.menuUrl,
          menuIcon: genRow.menuIcon,
          menuLevel: genRow.menuLevel,
          menuType: 'ADMIN',
          menuOrder: genRow.menuOrder,
          isEditable: genRow.isEditable,
          isCopyable: genRow.isCopyable,
          isEnabled: genRow.isEnabled,
        })
      }
      if (!row.Added && row.Changed) {
        const genRow = row as TRow & MenuResDto
        const parentRow = row.parentNode as TRow & MenuResDto
        updData.push({
          menuUid: genRow.menuUid,
          projectUid: 6,
          parentMenuUid: parentRow ? parentRow.menuUid : 0,
          menuName: genRow.menuName,
          menuTranslations: makeMenuTranslations(genRow),
          menuUrl: genRow.menuUrl,
          menuIcon: genRow.menuIcon,
          menuType: 'ADMIN',
          menuLevel: genRow.menuLevel,
          menuOrder: genRow.menuOrder,
          isEditable: genRow.isEditable,
          isEnabled: genRow.isEnabled,
          isCopyable: genRow.isCopyable,
        })
      }

      if (row.Deleted) {
        const genRow = row as TRow & MenuResDto
        delData.push({
          menuUid: genRow.menuUid,
        })
      }
    })
    console.log('genRow', updData)
    if (addData.length > 0) {
      create(addData)
    }
    if (updData.length > 0) {
      bulkUpdate(updData)
    }
    if (delData.length > 0) {
      bulkDelete(delData)
    }
    addData = []
    updData = []
    delData = []
    rows = []
  }

  const CollapseAll = () => {
    if (Grids['menuGrid']) {
      Grids['menuGrid'].CollapseAll()
    }
  }

  return (
    <>
      <div className="flex justify-end items-center gap-2 mb-3">
        <Button variant={'default'} onClick={saveBtn}>
          저장하기
        </Button>
        <Button variant={'default'} onClick={CollapseAll}>
          접기
        </Button>
      </div>
      <CommonTable uuid="menuGrid" />
      {/* <MenuIconGallery /> */}
    </>
  )
}
