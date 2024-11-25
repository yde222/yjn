'use client';

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@pims-frontend/ui/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@pims-frontend/ui/components/ui/popover';
import { cn } from '@pims-frontend/ui/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  MRT_RowData,
  MRT_TableInstance,
  MRT_TableOptions,
} from 'material-react-table';
import React from 'react';
import { Button } from '../../ui/button';
import {
  getExpandFromTree,
  getExpandState,
} from '@pims-frontend/ui/lib/get-expand-state';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { getMaxDepth } from '@pims-frontend/ui/lib/get-subrows';

type WbsTopToolbarProps<TData extends MRT_RowData> = {
  table: MRT_TableInstance<TData>;
  data: TData[];
  key?: string;
  initialExpandedDepth?: `${number}`;
  enableSubRowSelection?: MRT_TableOptions<TData>['enableSubRowSelection'];
  onEnableSubRowSelectionChange?: (checked: boolean) => void;
};

export function WbsTopToolbar<TData extends MRT_RowData>(
  props: WbsTopToolbarProps<TData>,
) {
  const { key = 'WBS' } = props;

  const options = React.useMemo(() => {
    const possibleRoot = props.data[0];

    if (!possibleRoot) {
      return [
        {
          value: `-1`,
          label: `요약보기`,
        },
      ];
    }

    const rowOptionLength = getMaxDepth(possibleRoot as any);

    return [
      ...Array.from({ length: rowOptionLength - 1 }, (_, idx) => ({
        value: `${idx + 1}`,
        label: `${idx + 1}레벨요약보기`,
      })),
      {
        value: `0`,
        label: `전체`,
      },
    ];
  }, [props.data]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(
    () => props.initialExpandedDepth || '-1',
  );

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      const next = currentValue === value ? '' : currentValue;
      setValue(next);
      setOpen(false);

      if (currentValue === '0') {
        return props.table.toggleAllRowsExpanded(true);
      }

      return props.table.setExpanded(() =>
        getExpandFromTree(currentValue, props.data, key),
      );
    },
    [props.data, value],
  );

  return (
    <div className="flex flex-row justify-start gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {options.find((option) => option.value === value)?.label ||
              '요약보기'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', {
                        'opacity-100': value === option.value,
                        'opacity-0': value !== option.value,
                      })}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex items-center space-x-2">
        <Switch
          id="enableSubRowSelection"
          checked={props.enableSubRowSelection as boolean}
          onCheckedChange={(checked) => {
            props.onEnableSubRowSelectionChange?.(checked);
          }}
        />
        <Label htmlFor="enableSubRowSelection">선택시 하위 Task까지 선택</Label>
      </div>
    </div>
  );
}
