import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import chalk from 'chalk';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const routePath = chalk
      .hex('#87e8de')
      .bold(`${context.getArgs()[0].route.path}`);
    const methodName = chalk
      .hex('#87e8de')
      .bold(`${context.getArgs()[0].route.stack[0].method.toUpperCase()}`);

    return next.handle().pipe(
      tap(() => {
        Logger.debug(`» ${methodName} ${routePath}`, 'Request');
      }),
    );
  }
}
