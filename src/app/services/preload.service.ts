import { Injectable } from '@angular/core';

@Injectable()
export class PreLoadService {

  public loading = false;
  constructor() { }

  hide() {
    this.loading = false;
  }

  show() {
    this.loading = true;
  }

}
