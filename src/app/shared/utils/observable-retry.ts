export interface IRetry {
    attempts?: number;
    delay?: number;
}
// tslint:disable:no-any
export const retryWhenRequestFails: any = ({ attempts = 4, delay = 1000 }: IRetry = {}) => {
    return (errors: any) => {
        return errors
            .scan((acc: number, value: any) => {
                acc += 1;
                if (acc < attempts) {
                    return acc;
                }
                throw new Error(value);

            }, 0)
            .delay(delay);
    };
};
