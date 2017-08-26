// tslint:disable-next-line:no-any
export const getDomainLocation: (documentUrl: any) => string = (documentUrl: any): string => {
    if (!documentUrl || !document.location) {
        return null;
    }
    let protocol: string = '';
    let hostname: string = '';
    let portNumber: string = '';

    if (documentUrl.location.protocol) {
        protocol = documentUrl.location.protocol;
    }
    if (documentUrl.location.hostname) {
        hostname = documentUrl.location.hostname;
    }
    if (documentUrl.location.port) {
        portNumber = documentUrl.location.port;
    }
    return documentUrl = `${protocol}//${hostname}:${portNumber}`;
};

export const getParameterByName: (paramName: string, url?: string) => string =
    (paramName: string, url: string = window.location.href): string => {
        paramName = paramName.replace(/[\[\]]/g, '\\$&');
        const regex: RegExp = new RegExp('[?&]' + paramName + '(=([^&#]*)|&|#|$)');
        const results: RegExpExecArray = regex.exec(url);
        if (!results) {
            return null;
        }
        // tslint:disable-next-line:no-magic-numbers
        if (!results[2]) {
            return '';
        }
        // tslint:disable-next-line:no-magic-numbers
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
