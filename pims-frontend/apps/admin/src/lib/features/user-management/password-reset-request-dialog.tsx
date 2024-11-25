import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@pims-frontend/ui/components/ui/dialog'
import { Input } from '@pims-frontend/ui/components/ui/input'
import { Label } from '@pims-frontend/ui/components/ui/label'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  userManagementActions,
  userManagementSelectors,
} from '../../../app/(auth)/user-management/user/_query/userManagementSlice'

export function PasswordResetRequestDialog() {
  const { resetModal } = useAppSelector(userManagementSelectors.selectUserMgt)
  const dispatch = useAppDispatch()

  return (
    <Dialog
      open={resetModal.isOpen && resetModal.step === 1}
      onOpenChange={open => {
        dispatch(userManagementActions.closeResetModal())
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-background-plain">
        <DialogHeader>
          <DialogTitle>비밀번호 초기화</DialogTitle>
          <DialogDescription>
            {`아래 사용자의 비밀번호를 초기화하시겠습니까?`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 px-6">
          <Label htmlFor="username">대상 사용자</Label>
          <Input
            id="username"
            defaultValue={resetModal.resetTarget?.userName}
            className="col-span-3"
            disabled
          />
        </div>
        <DialogFooter className="sm:justify-between border-t">
          <Button
            variant="outline"
            onClick={() => {
              dispatch(userManagementActions.closeResetModal())
            }}
          >
            취소
          </Button>
          <Button
            variant={'default'}
            onClick={() => {
              dispatch(userManagementActions.nextStepResetModal())
            }}
          >
            초기화
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
