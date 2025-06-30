import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormdataService {
  private editUserdata: any = null;
  private editMode = false;

  sendUserdata(data: any) {
    this.editUserdata = data;
    this.editMode = true;
  }

  getUserdata() {
    return this.editUserdata;
  }

  isInEditMode(): boolean {
    return this.editMode;
  }

  clearUserdata() {
    this.editUserdata = null;
    this.editMode = false;
  }

  clearEditMode() {
    this.editMode = false;
  }
}
