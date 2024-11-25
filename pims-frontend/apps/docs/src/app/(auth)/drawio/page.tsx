'use client';
import React from 'react';
import { DrawIoEmbed, DrawIoEmbedRef, EventExport } from 'react-drawio';
import { Button } from '@pims-frontend/ui/components/ui/button';
import { CopyIcon } from 'lucide-react';
// import { useToast } from '@pims-frontend/ui/components/ui/use-toast';
import { ToastAction } from '@pims-frontend/ui/components/ui/toast';
import Image from 'next/image';
import { useToast } from '@pims-frontend/ui/components/ui/use-toast';

export default function DrawioPage() {
  const [isDrawIoVisible, setIsDrawIoVisible] = React.useState(false);
  const [imgData, setImgData] = React.useState<string | undefined>(undefined);
  const drawioRef = React.useRef<DrawIoEmbedRef>(null);
  const { toast } = useToast();

  const toggleDrawIo = () => {
    setIsDrawIoVisible(!isDrawIoVisible);
  };

  const closeFunction = (e: EventExport) => {
    setImgData(e.data);
    setIsDrawIoVisible(false);
  };

  return (
    <>
      {/* <DrawIoEmbed ref={drawioRef} onExport={(data) => setImgData(data.data)} /> */}
      {/**
       * 데모입니다
       * https://github.com/marcveens/react-drawio (View) How To USE
       */}
      <div className="my-2">
        <Button
          variant="outline"
          className={'py-2 px-4 mx-2'}
          onClick={toggleDrawIo}
        >
          Edit
        </Button>
        {imgData && (
          <Button
            variant="outline"
            onClick={() => {
              toast({
                style: { overflow: 'auto' },
                title: 'Data',
                description: `${imgData}`,
                action: <ToastAction altText="Exit">Exit</ToastAction>,
              });
            }}
          >
            ViewData
          </Button>
        )}
      </div>
      {isDrawIoVisible && (
        <DrawIoEmbed
          ref={drawioRef}
          xml={imgData}
          urlParameters={{
            ui: 'atlas',
            spin: true,
            libraries: true,
            saveAndExit: false,
            dark: true,
          }}
          onExport={closeFunction}
          onClose={() => setIsDrawIoVisible(false)}
        />
      )}
      <div className="pt-5">
        {imgData && (
          <Image src={imgData} alt="image" width={500} height={300} />
        )}
      </div>
    </>
  );
}
