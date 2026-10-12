import { interval, map } from "rxjs";
export class Watch {
    watch$ = interval(1000).pipe(map(() => {
        return Date.now();
    }));
}
