import * as _ from 'lodash';

export const isJSON: (str: string) => boolean = (str: string): boolean => {
    return !_.isError(_.attempt(JSON.parse.bind(null, str)));
};
