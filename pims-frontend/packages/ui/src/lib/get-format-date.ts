import { ko, ptBR } from 'date-fns/locale';
import { format } from 'date-fns';

// type format = 'option' | 'localize' | 'formatLong' | 'options';
type getFormatDateProps = {
  date: Date;
  type: string;
  local?: any;
};
export function getFormatDate({ date, type, local = ko }: getFormatDateProps) {
  return format(date, type, { locale: local });
}
