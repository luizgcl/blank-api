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
    const response = context.switchToHttp().getResponse();
    const start = Date.now();

    const routePath = chalk
      .hex('#87e8de')
      .bold(`${context.getArgs()[0].route.path}`);
    const methodName = chalk
      .hex('#87e8de')
      .bold(`${context.getArgs()[0].route.stack[0].method.toUpperCase()}`);

    const responseStatus =
      response.statusCode > 199 && response.statusCode < 300
        ? chalk.green(`-> [${response.statusCode}]`)
        : response.statusCode > 499
          ? chalk.red(`-> [${response.statusCode}]`)
          : chalk.magenta(`-> [${response.statusCode}]`);

    const responseTime = (duration: number) => {
      const _in = chalk.magenta('in');
      const time = chalk.hex('#87e8de').bold(`${duration}ms`);
      return `${_in} ${time}`;
    };

    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const duration = end - start;
        Logger.debug(
          `» ${methodName} ${routePath} ${responseStatus} ${responseTime(duration)}`,
          'Request',
        );
      }),
    );
  }
}
