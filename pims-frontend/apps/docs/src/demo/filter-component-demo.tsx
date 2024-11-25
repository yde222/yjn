'use client';

import { ListTitle } from '@pims-frontend/ui/components/common/cmm-typography';
import { Button } from '@pims-frontend/ui/components/ui/button';
import { CommandDialog } from '@pims-frontend/ui/components/ui/command';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@pims-frontend/ui/components/ui/dialog';
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon';
import {
  ScrollArea,
  ScrollBar,
} from '@pims-frontend/ui/components/ui/scroll-area';
import { SheetFooter } from '@pims-frontend/ui/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@pims-frontend/ui/components/ui/tabs';
import React from 'react';

// Generate a large number of tabs
const tabData = Array.from({ length: 20 }, (_, i) => ({
  value: `tab${i + 1}`,
  label: `Tab ${i + 1}`,
  content: `This is the content for Tab ${i + 1}. It can be quite long and will scroll independently.`,
}));

export function UserGridFilter() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        variant={'outline'}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        <ParameterizedIcon name="Filter" className="w-4 h-4 mr-2" />
        {'필터'}
      </Button>
      <CommandDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
        dialogContentClassName="w-[557px] max-w-none"
      >
        <DialogHeader className="flex flex-row items-center py-1.5 border-b">
          <DialogTitle className="sr-only">사용자 정보 필터</DialogTitle>
          <DialogDescription className="">필터</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="tab1" className="h-[540px] flex">
          <div className="min-w-60 border-r relative">
            <ScrollArea className="h-full p-2">
              <ListTitle>필터 목록</ListTitle>
              <TabsList className="flex flex-col h-full items-stretch bg-transparent gap-2">
                {tabData.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="justify-between px-4 py-2 text-left data-[state=active]:bg-muted"
                  >
                    {tab.label}
                    <ParameterizedIcon name="ChevronRight" />
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          <div className="p-4">
            {tabData.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="h-full mt-0"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">{tab.label}</h2>
                    <p>{tab.content}</p>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <p key={index} className="mt-4">
                        Additional paragraph {index + 1} to demonstrate
                        scrolling in the content area.
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </div>
        </Tabs>
        <SheetFooter className="p-3 flex-none bg-background-plain border-t border-t-border-normal">
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            필터 적용
          </Button>
        </SheetFooter>
      </CommandDialog>
    </>
  );
}
