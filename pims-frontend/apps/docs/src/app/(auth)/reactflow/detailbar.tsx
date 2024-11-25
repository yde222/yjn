'use client';

import { EdgeForm } from './edge-form';
import { NodeForm } from './node-form';
import { type SelectedDataType } from './page';

export function Detailbar({ detail }: { detail: SelectedDataType }) {
  return (
    <>
      <div className="relative border-l-2 px-3 w-1/5">
        <h3 className="text-xl">{detail?.click_name}</h3>
        <p className="text-sm text-[#626F86] mb-5">{detail?.click_desc}</p>
        {detail?.clicked === 'node' && <NodeForm detail={detail} />}
        {detail?.clicked === 'edges' && <EdgeForm detail={detail} />}
        {!detail && <div>너의꿈을 펼쳐봐..</div>}
        {detail && <pre>{JSON.stringify(detail, null, 2)}</pre>}
      </div>
    </>
  );
}
