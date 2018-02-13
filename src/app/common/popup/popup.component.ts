import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ModalManagerService } from '../../services/modal-manager.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  private clickListener: (Event) => void;
  @Input() open: boolean;
  @Input() ignoreMobile: boolean;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(private device: DeviceService,
              private ref: ElementRef,
              private modalManager: ModalManagerService) {
    this.clickListener = (event) => {
      if (this.ignoreMobile && device.isMobile()) {
        return;
      }

      if (ref.nativeElement && !ref.nativeElement.contains(event.target)) {
        this.onClose.emit();
      }
    };
  }

  ngOnInit() {
    this.modalManager.subscribeToClick(this.clickListener);
  }

  ngOnDestroy() {
    this.modalManager.unsubscribeFromClick(this.clickListener);
  }

}
