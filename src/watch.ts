import { interval, map, Observable } from "rxjs";

export class Watch {
  watch$: Observable<number> = interval(1000).pipe(
    map(() => {
      return Date.now();
    }),
  );
}
