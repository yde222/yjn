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
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  userManagementActions,
  userManagementSelectors,
} from '../../../app/(auth)/user-management/user/_query/userManagementSlice'

export function PasswordResetRevealDialog() {
  const { resetModal } = useAppSelector(userManagementSelectors.selectUserMgt)
  const dispatch = useAppDispatch()
  const toast = useToast()

  return (
    <Dialog
      open={resetModal.isOpen && resetModal.step === 2}
      onOpenChange={open => {
        dispatch(userManagementActions.closeResetModal())
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-background-plain">
        <DialogHeader>
          <DialogTitle>비밀번호를 초기화 했습니다.</DialogTitle>
          <DialogDescription>
            {`아래의 초기화된 비밀번호를 복사하세요.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-6">
          <div className="grid grid-cols-5 items-center gap-2">
            <Input
              id="name"
              defaultValue={
                resetModal.generatedPassword || '생성에 실패하였습니다'
              }
              className="col-span-4"
            />
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(
                  resetModal.generatedPassword || '',
                )
                toast.toast({
                  title: '복사 완료',
                  description: '클립보드에 복사되었습니다.',
                  variant: 'default',
                })
              }}
            >
              복사하기
            </Button>
          </div>
        </div>
        <DialogFooter className="border-t">
          <Button
            type="submit"
            onClick={() => {
              dispatch(userManagementActions.closeResetModal())
            }}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
