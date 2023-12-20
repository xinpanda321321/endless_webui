import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import {
  FlatDialogComponent,
  FlatDialogConfig,
} from '../flat-dialog/flat-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlatDialogComponent, TranslateModule],
})
export class ConfirmDialogComponent {
  instanceName?: string;
  payload!: Record<string, string>;

  dialogConfig: FlatDialogConfig = {
    hasCloseButton: false,
  };

  @ViewChild(FlatDialogComponent) dialogComponent?: FlatDialogComponent;

  public onDismiss() {
    this.dialogComponent?.dismiss();
  }

  public onDelete() {
    this.dialogComponent?.close();
  }
}
