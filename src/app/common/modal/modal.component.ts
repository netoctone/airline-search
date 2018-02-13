import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalManagerService } from '../../services/modal-manager.service';

@Component({
  selector: 'mobile-modal',
  template: `
    <div class="mobile-modal" [ngClass]="{ hidden: !this.open }">
      <ng-content>
      </ng-content>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() open: boolean;

  constructor(private docManager: ModalManagerService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.open) {
      this.docManager.openModal(this, changes.open.currentValue);
    }
  }

  ngOnDestroy() {
    this.docManager.openModal(this, false);
  }

}
