'use client';

import { Progress } from '@pims-frontend/ui/components/ui/progress';
import * as React from 'react';

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border w-[500px] rounded-3xl">
      <Progress value={progress} className="w-[60%] border-1  bg-black" />
    </div>
  );
}
