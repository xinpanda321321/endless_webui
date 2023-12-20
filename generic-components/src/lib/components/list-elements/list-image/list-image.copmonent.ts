import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { getContactAvatar, isCandidate, isMobile } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.scss'],
  imports: [CommonModule, TranslateModule, FaIconComponent],
})
export class ListImageComponent implements OnInit {
  public config: any;
  public src!: string;
  public icon!: IconName;
  public iconClass!: string;
  public last!: boolean;
  public file!: string;
  public contactAvatar!: string;

  public isMobileDevice = isMobile() && isCandidate();

  label = '';

  @ViewChild('filelink')
  public link!: ElementRef<HTMLAnchorElement>;

  public ngOnInit() {
    if (this.config.type === 'picture') {
      this.src =
        this.config.value && this.config.value.origin
          ? this.config.value.origin
          : false;

      if (this.config.value && this.config.file === undefined) {
        this.file = this.config.value;
      }
    } else if (this.config.type === 'icon') {
      if (this.config.values) {
        this.icon = this.config.values[this.config.value];
        if (this.config.color) {
          this.getColor(this.config.value);
          return;
        }
        this.setClass(this.config.value);
      }
    }

    if (!this.src && this.config.contactName && !this.config.signature) {
      this.contactAvatar = getContactAvatar(this.config.contactName);
    }

    this.label = this.config.translateKey
      ? this.config.translateKey
      : this.config.label;
  }

  public getColor(value: string) {
    this.iconClass = this.config.color[value]
      ? `text-${this.config.color[value]} me-1`
      : 'text-muted me-1';
  }

  public setClass(value: boolean) {
    this.iconClass =
      value === true
        ? 'text-success'
        : value === false
        ? 'text-danger'
        : 'text-muted';
  }

  public getExtension(link: string) {
    return link.split('.').pop();
  }

  public downloadFile() {
    this.link.nativeElement.click();
  }

  get emptyValue() {
    return !this.file && !this.src && !this.contactAvatar;
  }
}
