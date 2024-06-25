import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private allowAccess = false;

  constructor() { }

  grantAccess() {
    this.allowAccess = true;
  }

  revokeAccess() {
    this.allowAccess = false;
  }

  hasAccess(): boolean {
    return this.allowAccess;
  }
}
