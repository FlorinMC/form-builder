import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

    constructor(private snackBar: MdSnackBar) { }

    public showSnackbar(msg: string, action: string = null, duration: number = 5000, extraClasses?: string[]): void {
        this.snackBar.open(msg, action, {
            duration,
            extraClasses,
        });
    }
}