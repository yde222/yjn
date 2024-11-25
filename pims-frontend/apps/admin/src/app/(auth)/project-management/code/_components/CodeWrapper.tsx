'use client'

import {
  useCreateCodeGroupMutation,
  useCreateCodeMutation,
  useDeleteCodeGroupMutation,
  useDeleteCodeMutation,
  useGetAllCodeGroupsQuery,
  useLazyGetAllCodeDetailsQuery,
  useUpdateCodeGroupMutation,
  useUpdateCodeMutation,
} from '@pims-frontend/apis/lib/features/common/code/controller/CodeManagementController'
import { type CodeGroupResDto } from '@pims-frontend/apis/lib/features/common/code/dto/response/CodeGroupResDto'
import {
  CodeResDto,
  CodeTranslationData,
} from '@pims-frontend/apis/lib/features/common/code/dto/response/CodeResDto'
import { LanguageData } from '@pims-frontend/apis/lib/features/common/code/dto/response/MultiLanguageResDto'
import { useGetEnableUseLanguageQuery } from '@pims-frontend/apis/lib/features/common/menu/controller/MenuController'
import { Button } from '@pims-frontend/ui/components/ui/button'
import CommonTable from '@pims-frontend/ui/components/ui/custom/CommonTable'
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import { useEffect, useRef, useState } from 'react'
import { codeColInfo } from '../_constants/colInfo/codeColInfo'
import { GroupColInfo } from '../_constants/colInfo/groupColInfo'
import { CustomGridOnClick, gridUtil } from '../_utils/gridUtil'
import AddCodeDialog from './AddCodeDialog'
import CodeDetailSheet from './CodeDetailSheet'
// import paletteEnum from './Palette'

const CodeWrapper = () => {
  const { toast } = useToast()
  const { data: languageData } = useGetEnableUseLanguageQuery({ keyword: '' })

  const { data } = useGetAllCodeGroupsQuery({
    keyword: '',
  })

  const [getCodes, { data: codeData }] = useLazyGetAllCodeDetailsQuery()
  const [createCodeGroup] = useCreateCodeGroupMutation()
  const [updateCodeGroup] = useUpdateCodeGroupMutation()
  const [deleteCodeGroup] = useDeleteCodeGroupMutation()
  const [createCode] = useCreateCodeMutation()
  const [updateCode] = useUpdateCodeMutation()
  const [deleteCode] = useDeleteCodeMutation()

  // 버튼을 숨기고 보이기 위한 Ref 선언
  const subButtonWrapperRef = useRef<HTMLDivElement | null>(null)

  const [subButtonShow, setSubButtonShow] = useState(false)
  const [selectCodeGroupId, setSelectCodeGroupId] = useState<
    number | undefined
  >(undefined)

  const labelRef = useRef<HTMLDivElement | null>(null) // 라벨을 위한 Ref

  let _clickCodeGroupUid: number
  if (subButtonWrapperRef.current) {
    subButtonWrapperRef.current.style.display = 'none'
  }

  // locale을 변환하는 함수
  const convertLocaleToKey = (locale: string) => {
    if (locale) {
      return locale.toLowerCase().replace('-', '')
    }
  }

  // 언어별 템플릿 생성 함수
  const createLanguageColumns = (languageData: LanguageData[]) => {
    return languageData.map(lang => ({
      accessorKey: `${convertLocaleToKey(lang.locale)}CodeName`, // locale을 기반으로 key 설정
      header: `코드값 (${lang.languageName})`, // 언어 이름을 기반으로 header 설정
      visible: '1',
      size: '60',
      type: 'Text',
      canedit: 1,
    }))
  }
  useEffect(() => {
    if (languageData) {
      // 언어별 템플릿을 배열로 변환하여 추가
      const languageColumns = createLanguageColumns(languageData) // languageData에서 data 배열 접근
      const index =
        codeColInfo.findIndex(col => col.accessorKey === 'codeValue') + 1
      codeColInfo.splice(index, 0, ...languageColumns)
      codeColInfo.push(...languageColumns)
    }
  }, [languageData]) // languageData도 의존성에 추가

  useEffect(() => {
    if (data) {
      gridUtil({
        colInfo: GroupColInfo,
        data: data,
        gridId: 'gridCodeGroup',
        onClickRow: rowClick,
      })
    }
  }, [data])

  const rowClick: CustomGridOnClick<CodeGroupResDto> = params => {
    // 체크박스 클릭 무시
    if (params.col === 'Panel') return
    if (params.col === 'isEditable') return
    if (params.grid?.id === 'gridCodeGroup') {
      if (params.col === 'codeGroupUid') {
        const codeGroupUid = params.row.codeGroupUid
        if (codeGroupUid) {
          setSelectCodeGroupId(Number(codeGroupUid))
          getCodes({ codeGroupUid: Number(codeGroupUid) }).unwrap()
          setSubButtonShow(true)
        }
      }
    }
  }
  useEffect(() => {
    if (codeData) {
      gridUtil({
        colInfo: codeColInfo,
        data: codeData?.map((item, index) => {
          const newItem = { ...item, order: index + 1 }
          if (newItem.codeTranslations) {
            newItem.codeTranslations.forEach(
              (translation: CodeTranslationData) => {
                newItem[convertLocaleToKey(translation.locale) + 'CodeName'] =
                  translation.codeName
              },
            )
          }
          return newItem
        }),

        gridId: 'gridCodeDetail',
        onClickRow: rowClick,
      })
    }
  }, [codeData])

  const newBtn = () => {
    const grid = Grids['gridCodeGroup']
    if (grid) {
      const row = grid.AddRow(undefined, undefined, 1) // 새로운 행 추가

      // 기본값 설정
      grid.SetValue(row, 'codeGroupName', '', 1)
      grid.SetValue(row, 'codeGroupDescription', '', 1)
      grid.SetValue(row, 'isEditable', true, 1)
      grid.SetValue(row, 'isEnabled', true, 1)
    }
  }

  const newBtn2 = () => {
    const grid = Grids['gridCodeDetail']
    if (grid) {
      const row = grid.AddRow(undefined, undefined, 1) // 새로운 행 추가

      // 새로운 행에 대한 기본값 설정
      grid.SetValue(row, 'codeGroupUid', selectCodeGroupId, 1)
      grid.SetValue(row, 'codeUidCanEdit', '0', 1)
      grid.SetValue(row, 'isEditable', true, 1)
      grid.SetValue(row, 'isEnabled', true, 1)
      grid.SetValue(row, 'codeValue', '', 1) // 필요한 기본값 추가
    }
  }

  const saveBtn = () => {
    const rows = Grids['gridCodeGroup']?.GetSelRows() as any[]

    if (!rows || rows.length === 0) {
      alert('저장할 데이터 행을 선택해주세요')
      return
    }
    for (const row of rows) {
      // 새로운 행 생성 (POST)
      if (!row.codeGroupUid && row.Added === 1) {
        const requestBody = {
          codeGroupName: row.codeGroupName || 'string',
          codeGroupDescription: row.codeGroupDescription || 'string',
          projectUid: row.projectUid ?? 0,
          codeGroupReferenceValue: row.codeGroupReferenceValue || 'string',
          majorCategory: row.majorCategory ?? 0,
          middleCategory: row.middleCategory ?? 0,
          minorCategory: row.minorCategory ?? 0,
          isEditable: row.isEditable ?? true,
          isEnabled: row.isEnabled ?? true,
        }

        createCodeGroup(requestBody)
      }
      // 기존 데이터 수정 (PUT)
      else if (row.codeGroupUid && row.Changed === 1) {
        const requestBody = {
          codeGroupName: row.codeGroupName || 'string',
          codeGroupDescription: row.codeGroupDescription || 'string',
          projectUid: row.projectUid ?? 0,
          codeGroupReferenceValue: row.codeGroupReferenceValue || 'string',
          majorCategory: row.majorCategory ?? 0,
          middleCategory: row.middleCategory ?? 0,
          minorCategory: row.minorCategory ?? 0,
          isEditable: row.isEditable ?? true,
          isEnabled: row.isEnabled ?? true,
          codeGroupUid: row.codeGroupUid ?? 0,
        }

        updateCodeGroup(requestBody)
      }
    }
  }

  const makeCodeTranslations = (row: TRow & CodeResDto) => {
    let translationData: CodeTranslationData[] = []
    if (languageData) {
      languageData.map(item => {
        translationData.push({
          locale: item.locale,
          codeName: row[convertLocaleToKey(item.locale) + 'CodeName']
            ? row[convertLocaleToKey(item.locale) + 'CodeName']
            : '',
        })
      })
    }

    return translationData
  }

  const saveBtn2 = () => {
    const rows = Grids['gridCodeDetail']?.GetSelRows() as any[]

    if (!rows || rows.length === 0) {
      alert('저장할 데이터 행을 선택해주세요')
      return
    }

    for (const row of rows) {
      // 새로운 행 생성 (POST)

      if (row.codeUid === '' && row.Added === 1 && row.codeGroupUid) {
        const requestBody = {
          codeName: row.codeName,
          codeValue: row.codeValue || 'string',
          codeReferenceValue: row.codeReferenceValue || 'string',
          codeColor: row.codeColor || 'DEFAULT',
          codeOrder: row.order || 0,
          codeTranslations: makeCodeTranslations(row),
          isEditable: row.isEditable, // 조건에 따라 설정
          isEnabled: row.isEnabled,
          codeGroupUid: row.codeGroupUid,
        }
        createCode(requestBody)
      }
      // 기존 데이터 수정 (PUT)
      else if (row.codeUid && row.Changed === 1 && row.codeGroupUid) {
        const requestBody = {
          codeName: row.codeName,
          codeValue: row.codeValue || 'string',
          codeReferenceValue: row.codeReferenceValue || 'string',
          codeColor: row.codeColor || 'DEFAULT',
          codeOrder: row.order || 0,
          codeTranslations: makeCodeTranslations(row),
          isEditable: row.isEditable, // 조건에 따라 설정
          isEnabled: row.isEnabled,
          codeGroupUid: row.codeGroupUid,
          codeUid: row.codeUid,
        }
        updateCode(requestBody)
      }
    }
  }

  const deleteBtn = () => {
    const rows = Grids['gridCodeGroup']?.GetSelRows() as any[]

    if (!rows || rows.length === 0) {
      alert('삭제할 데이터 행을 선택해주세요')
      return
    }

    // 사용자 확인
    const confirmDelete = window.confirm(
      `${rows.length}개의 항목을 삭제하시겠습니까?`,
    )
    if (!confirmDelete) return

    // 삭제 작업을 수행하는 Promise 배열
    const deletePromises = rows.map(row => {
      const codeGroupUid = row.codeGroupUid
      deleteCodeGroup({ codeGroupUid })
    })

    // 모든 삭제 작업이 완료된 후
    Promise.allSettled(deletePromises).then(results => {
      const failedDeletions = results.filter(
        result => result.status === 'rejected',
      )

      if (failedDeletions.length > 0) {
        alert(`${failedDeletions.length}개의 항목 삭제에 실패했습니다.`)
      } else {
        alert('선택한 모든 항목이 삭제되었습니다.')
      }
    })
  }

  const deleteBtn2 = () => {
    const rows = Grids['gridCodeDetail']?.GetSelRows() as any[]

    if (!rows || rows.length === 0) {
      alert('삭제할 데이터 행을 선택해주세요')
      return
    }

    // 사용자 확인
    const confirmDelete = window.confirm(
      `${rows.length}개의 항목을 삭제하시겠습니까?`,
    )
    if (!confirmDelete) return

    // 모든 선택된 행에 대해 삭제 요청
    const deletePromises = rows.map(row => {
      const codeGroupUid = row.codeGroupUid
      const codeUid = row.codeUid
      deleteCode({ codeGroupUid, codeUid })
    })
  }

  // 조회 버튼 클릭 핸들러
  const handleSearchClick = () => {
    Grids['gridCodeGroup']?.Reload()
  }

  function refreshBtn2() {
    Grids['gridCodeDetail']?.Reload()

    return false
  }

  return (
    <>
      <div className="flex justify-end items-center gap-2 mb-3">
        <Button variant={'destructive'} onClick={handleSearchClick}>
          조회
        </Button>
        <Button variant={'destructive'} onClick={newBtn}>
          신규 로우
        </Button>
        <Button variant={'destructive'} onClick={saveBtn}>
          체크 저장
        </Button>
        <Button variant={'destructive'} onClick={deleteBtn}>
          삭제
        </Button>
      </div>
      <CommonTable uuid="gridCodeGroup" />
      <br />
      {/* 서브 버튼들 */}
      {subButtonShow ? (
        <div
          className="flex justify-between items-center gap-2 mb-3" // 기본적으로 hidden 상태
        >
          {/* 라벨 영역 */}
          <div ref={labelRef} className="mr-auto">
            라벨 초기 값
          </div>

          {/* 버튼들 */}
          <Button
            variant={'destructive'}
            onClick={() => {
              refreshBtn2()
            }}
          >
            재조회
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => {
              newBtn2()
            }}
          >
            신규 로우
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => {
              saveBtn2()
            }}
          >
            체크 저장
          </Button>
          <Button variant={'destructive'} onClick={deleteBtn2}>
            삭제
          </Button>
        </div>
      ) : null}

      {/* <paletteEnum /> */}

      <CommonTable uuid="gridCodeDetail" />

      <CodeDetailSheet />
      <AddCodeDialog />
    </>
  )
}

export default CodeWrapper
