import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const MODAL_OPEN_CLASS = 'modal-is-open';

type Listener = (Event) => void;

@Injectable()
export class ModalManagerService {

  private listeners: Listener[] = [];
  private modals: Object[] = [];

  constructor(@Inject(DOCUMENT) private _document: Document) {
    _document.body.parentElement.addEventListener('mousedown', (event) => {
      for (const listener of this.listeners) {
        listener(event);
      }
    });
  }

  subscribeToClick(listener: Listener) {
    if (this.listeners.indexOf(listener) <= 0) {
      this.listeners.push(listener);
    }
  }

  unsubscribeFromClick(listener: Listener) {
    const i = this.listeners.indexOf(listener);
    if (i >= 0) {
      this.listeners.splice(i, 1);
    }
  }

  private setClass(open: boolean) {
    if (open) {
      this._document.body.parentElement.classList.add(MODAL_OPEN_CLASS);
    } else {
      this._document.body.parentElement.classList.remove(MODAL_OPEN_CLASS);
    }
  }

  openModal(component: Object, open: boolean) {
    const i = this.modals.indexOf(component);
    if (open) {
      if (i <= -1) {
        this.modals.push(component);
      }
      if (this.modals.length == 1) {
        this.setClass(true);
      }
    } else {
      if (i > -1) {
        this.modals.splice(i, 1);
      }
      if (this.modals.length == 0) {
        this.setClass(false);
      }
    }
  }

}
