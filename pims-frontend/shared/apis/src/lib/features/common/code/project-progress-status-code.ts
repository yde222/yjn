import { ComboboxSelectOptionProps } from '@pims-frontend/ui/components/ui/select'
import { type CodeResDto } from './dto/response/CodeResDto'

const COLOR_MAPPER = {
  '001': 'yellow',
  '002': 'green',
  '003': 'purple',
  '004': 'red',
} as const

export function transformProjectProgressStatusCode(
  codes: CodeResDto[],
): ComboboxSelectOptionProps[] {
  return codes.map(code => ({
    value: code.codeUid,
    displayString: code.codeValue,
    type: 'badge_status',
    badgeStatusProps: {
      size: 'lg',
      background: 'default',
      badgestatus:
        COLOR_MAPPER[code.codeUid.toString() as keyof typeof COLOR_MAPPER],
    },
  }))
}

export function findSelectOptionsFromValue(
  codes: CodeResDto[],
  value: string,
): ComboboxSelectOptionProps {
  const code = codes.find(code => code.codeUid.toString() === value)
  return {
    value: code?.codeUid.toString() || ``,
    displayString: code?.codeValue || ``,
    type: 'badge_status',
    badgeStatusProps: {
      size: 'lg',
      background: 'default',
      badgestatus:
        COLOR_MAPPER[code?.codeUid.toString() as keyof typeof COLOR_MAPPER],
    },
  }
}
