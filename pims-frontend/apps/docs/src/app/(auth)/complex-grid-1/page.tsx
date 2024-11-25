import { WbsWrapper } from './wbs-wrapper';

export const dynamic = 'force-dynamic';

const fetchData = async () => {
  const res = await fetch(
    `${process.env.__NEXT_PRIVATE_ORIGIN}/wbs-tree-data.json`,
  );
  const data = await res.json();
  return data;
};

export default async function ComplexGridFirstPage() {
  const wbsGridData = await fetchData();

  return (
    <div className="p-2">
      <div className="prose dark:prose-invert max-w-none text-center">
        <h1>Complex Grid 1</h1>
        <h2>WBS Sample</h2>
      </div>
      <WbsWrapper data={wbsGridData} />
    </div>
  );
}
