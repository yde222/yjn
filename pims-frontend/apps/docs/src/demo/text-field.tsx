import { Input } from '@pims-frontend/ui/components/ui/input';
import { Label } from '@pims-frontend/ui/components/ui/label';
import { cn } from '@pims-frontend/ui/lib/utils';
import { LucideIcon } from 'lucide-react';
import { createContext, useContext } from 'react';

type InputContextType = {
  id: string;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

// 메인 Input 컴포넌트
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  children: React.ReactNode;
  variant?: string;
};

const CompoundInput = ({
  id,
  children,
  variant = 'default',
  ...props
}: InputProps) => {
  let variantname = '';
  if (variant === 'distructive') {
    variantname = 'border border-[#E54666]';
  }
  return (
    <InputContext.Provider value={{ id }}>
      <div className="relative">
        {children}
        <Input id={id} {...props} className={cn(`pl-10 ${variantname}`)} />
        {/* 아이콘을 위한 왼쪽 패딩 */}
      </div>
    </InputContext.Provider>
  );
};

// Icon 서브컴포넌트
type IconProps = {
  icon: LucideIcon;
};

const Icon = ({ icon: Icon }: IconProps) => {
  return (
    <div className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-11">
      <Icon className="w-5 h-5" />
    </div>
  );
};

// Label 서브컴포넌트
type LabelProps = {
  children: React.ReactNode;
};

const InputLabel = ({ children }: LabelProps) => {
  const context = useContext(InputContext);
  if (!context) throw new Error('Label must be used within a CompoundInput');

  return <Label htmlFor={context.id}>{children}</Label>;
};

// CompoundInput에 서브컴포넌트 연결
CompoundInput.Icon = Icon;
CompoundInput.Label = InputLabel;

export { CompoundInput };
