import { icons, type LucideProps } from 'lucide-react';

export type ParameterizedIconProps = LucideProps & {
  name: keyof typeof icons;
};

export const ParameterizedIcon = ({
  name,
  ...props
}: ParameterizedIconProps) => {
  const LucideIcon = icons[name];
  return <LucideIcon {...props} />;
};
