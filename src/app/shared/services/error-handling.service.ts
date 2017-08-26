import { Injectable } from '@angular/core';
import { IError } from '../interfaces/error';
import { isJSON } from '../utils/isJSON';

@Injectable()
export class ErrorHandlingService {

    public errorBody: IError;
    public errorString: string;

    public generateErrorMessage(error: {}): string {
        if (isJSON(error['_body'])) {
            this.errorBody = JSON.parse(error['_body']);
            this.processErrorBody();
        }
        return this.errorString;
    }

    private processErrorBody(): void {
        if (this.errorBody.messages) {
            this.errorString = '';
            for (const message of this.errorBody.messages) {
                this.errorString += message;
            }
        }
    }

}
