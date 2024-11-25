'use client';

import { UserDetailResDto } from '@pims-frontend/apis/lib/features/common/user/dto/response/UserDetailResDto';
import { Button } from '@pims-frontend/ui/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@pims-frontend/ui/components/ui/sheet';
import {
  RadixTabs,
  RadixTabsList,
  RadixTabsTrigger,
} from '@pims-frontend/ui/components/ui/tabs';
import React from 'react';
import { BaseInfoTab } from './base-info-tab';
import { ConnectHistoryTab } from './connect-history-tab';

export type SheetState = {
  isOpen: boolean;
  data: UserDetailResDto | null;
};

export type UserDetailSheetProps = {
  sheetState: [SheetState, React.Dispatch<React.SetStateAction<SheetState>>];
};

export function UserDetailSheet(props: UserDetailSheetProps) {
  const ref = React.useRef<HTMLFormElement>(null);
  const [sheet, setSheet] = props.sheetState;

  return (
    <Sheet
      open={sheet.isOpen}
      onOpenChange={(open) => {
        setSheet((prev) => ({
          ...prev,
          isOpen: open,
        }));
      }}
    >
      <RadixTabs defaultValue="base-info">
        <SheetContent className="p-0 flex flex-col min-w-[640px] h-screen gap-0">
          <SheetHeader className="flex-none w-full bg-background-plain">
            <SheetTitle className="p-6">사용자 정보</SheetTitle>
            <RadixTabsList className="flex justify-start gap-2 px-6 bg-transparent">
              <RadixTabsTrigger value="base-info" variant={'bottomActive'}>
                기본 정보
              </RadixTabsTrigger>
              <RadixTabsTrigger
                value="connect-history"
                variant={'bottomActive'}
              >
                접속 이력
              </RadixTabsTrigger>
            </RadixTabsList>
          </SheetHeader>
          <div className="flex-grow py-10 overflow-y-auto bg-background-plain">
            <BaseInfoTab sheetState={props.sheetState} ref={ref} />
            <ConnectHistoryTab />
          </div>
          <SheetFooter className="p-3 flex-none bg-background-plain border-t border-t-border-normal">
            <Button
              className="bg-primary-normal"
              onClick={() => {
                ref.current?.requestSubmit();
                setSheet((prev) => ({
                  ...prev,
                  isOpen: false,
                }));
              }}
            >
              확인
            </Button>
          </SheetFooter>
        </SheetContent>
      </RadixTabs>
    </Sheet>
  );
}
