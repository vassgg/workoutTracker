import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metric',
  standalone: true
})
export class MetricPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}kg`;
  }

}
