import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

//shared/apis/src/types/index.ts
export type CommonApiResponse<T> = {
  code: number;
  data: T[];
  message: string;
  timestamp: string;
};

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CommonApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CommonApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        data: Array.isArray(data) ? data : [data],
        message: 'success',
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
