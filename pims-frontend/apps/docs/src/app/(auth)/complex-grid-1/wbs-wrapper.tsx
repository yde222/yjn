'use client';

import { MRT_RowData } from '@pims-frontend/ui/components/common/cmm-material-react-table';
import { Skeleton } from '@pims-frontend/ui/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';

const CommonWBS = dynamic(
  () =>
    import('@pims-frontend/ui/components/common/wbs/cmm-wbs').then(
      (mod) => mod.CommonWBS,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="min-w-full min-h-[800px]" />,
  },
);

type WbsWrapperProps<TData extends MRT_RowData> = {
  data: TData[];
};

export function WbsWrapper<TData extends MRT_RowData>(
  props: WbsWrapperProps<TData>,
) {
  const [data, setData] = React.useState<MRT_RowData[]>(() => props.data);

  if (data.length === 0) {
    return (
      <>
        <p>Empty Grid.</p>
      </>
    );
  }

  return (
    <>
      <CommonWBS initialData={props.data} dataState={[data, setData]} />
    </>
  );
}
