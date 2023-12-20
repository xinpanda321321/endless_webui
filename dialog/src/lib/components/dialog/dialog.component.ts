import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import {
//   ModalDismissReasons,
//   NgbActiveModal,
//   NgbModalRef,
// } from '@ng-bootstrap/ng-bootstrap';
import { Icon, IconComponent, IconSize } from '@webui/ui';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@webui/models';
// import { Dialog } from '@angular/cdk/dialog';

// export type DialogRef = NgbModalRef;
// export type DialogDismissReason = ModalDismissReasons;

@Component({
  standalone: true,
  selector: 'webui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
})
export class DialogComponent {
  @Input() public title?: string;
  public Icon = Icon;
  public IconSize = IconSize;

  constructor(private active: DialogRef) {}

  public dismiss() {
    this.active.close();
  }

  public close(result?: unknown) {
    return this.active.close(result);
  }
}
