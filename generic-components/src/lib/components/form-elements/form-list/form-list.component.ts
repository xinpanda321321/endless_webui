import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Optional,
  forwardRef,
} from '@angular/core';

// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';

import { FormatString } from '@webui/utilities';
// import { smallModalEndpoints } from '../../../helpers';

import {
  CheckPermissionService,
  GenericFormService,
  TimelineAction,
  TimelineService,
} from '@webui/core';
// import {
//   GenericFormService,
//   TimelineService,
//   TimelineAction,
// } from '../../../services';
import { Field } from '@webui/metadata';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { CloseButtonComponent, SpinnerComponent } from '@webui/ui';
import { DialogRef, dialogConfig, smallModalEndpoints } from '@webui/models';
import { GenericFormComponent } from '../../../generic-form/generic-form.component';
import { GenericListComponent } from '../../../generic-list/generic-list.component';
import { Dialog } from '@angular/cdk/dialog';
// import { GenericFormComponent } from '../../generic-form/generic-form.component';
// import { GenericListComponent } from '../../generic-list/generic-list.component';

@Component({
  standalone: true,
  selector: 'webui-form-list',
  templateUrl: 'form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    SubscriptionRequiredDirective,
    GenericFormComponent,
    SpinnerComponent,
    forwardRef(() => GenericListComponent),
    CloseButtonComponent,
  ],
})
export class FormListComponent implements OnInit, OnDestroy {
  @ViewChild('modal')
  public modalTemplate: any;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  public config!: Field;
  public errors: any;
  public message: any;
  public key: any;
  public label!: boolean;
  public count!: number;

  public modalData: any;
  public format = new FormatString();

  public modalRef!: DialogRef;

  public update!: Subject<number>;
  public query!: string;
  public showButton!: boolean;

  public allowMethods!: string[];
  public formData!: any;

  public defaultValues: any[] = [];
  public defaultQueries: any;
  public addedData: any[] = [];

  public saveProcess$?: Observable<boolean>;

  public hasAddForm?: boolean;
  public addFormConfig: any;

  public initialized!: boolean;
  public metadataQuery!: string;
  public addMetadataQuery!: string;
  labelTranslateKey!: string;
  helpTranslateKey!: string;

  private subscriptions: Subscription[];

  get hasAddButton() {
    const { delay, disableButtons } = this.config;

    return (
      (this.showButton || delay) &&
      this.checkPermissions('post') &&
      !disableButtons &&
      !this.hasAddForm
    );
  }

  constructor(
    private modal: Dialog,
    private permission: CheckPermissionService,
    private gfs: GenericFormService,
    private cd: ChangeDetectorRef,
    @Optional() private timelineService: TimelineService
  ) {
    this.subscriptions = [];
  }

  public ngOnInit() {
    if (!this.config.hide) {
      this.initialize();
      this.checkFormData();
      // this.checkTimelineChange();
    }
    this.checkHiddenProperty();
    this.allowMethods = this.permission.getAllowMethods(
      undefined,
      this.config.endpoint as string
    );
    this.hasAddForm = this.config.add_form;

    if (this.config.templateOptions?.label) {
      this.labelTranslateKey = this.config.templateOptions?.label
        ? `tabs.${this.config.translateKey}.label`
        : '';
      this.helpTranslateKey = this.config.translateKey
        ? `tabs.${this.config.translateKey}.help`
        : '';
    }

    if (this.hasAddForm) {
      this.addFormConfig = this.getAddFormConfig();
    }

    if (
      this.formData &&
      'type' in this.formData &&
      this.config.insertData &&
      this.config.insertData['model']
    ) {
      this.config.insertData['model'] =
        this.config.insertData['model'][this.formData?.type];
    }
  }

  public checkHiddenProperty() {
    if (this.config && this.config.hidden) {
      const subscription = this.config.hidden.subscribe(hide => {
        if (hide) {
          this.config.hide = hide;
        } else {
          if (!this.initialized) {
            this.initialize();
            this.checkFormData();
          }
          this.config.hide = hide;
        }

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public initialize(): void {
    this.update = new Subject();
    if (this.config.query) {
      this.query = this.generateQuery(this.config.query).slice(1);
    }
    if (this.config.delay) {
      this.config.data = {
        length: 0,
        results: [],
        sendData: [],
      };
      this.config.delayData[this.config.endpoint as string] = this.config;
    }

    if (
      this.config.metadata_query &&
      typeof this.config.metadata_query !== 'string'
    ) {
      this.config.metadata_query = this.parseMetadataQuery(
        this.config,
        'metadata_query'
      );
    }

    if (
      this.config.add_metadata_query &&
      typeof this.config.add_metadata_query !== 'string'
    ) {
      this.config.add_metadata_query = this.parseMetadataQuery(
        this.config,
        'add_metadata_query'
      );
    }

    this.initialized = true;
  }

  public parseMetadataQuery(data: any, field: string) {
    const keys = Object.keys(data[field]);
    const result = keys.map(query => {
      return `${query}=${data[field][query]}`;
    });
    return result.join('&');
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public addObject() {
    // if (
    //   this.config.add_endpoint &&
    //   this.config.add_endpoint.indexOf('fillin') > -1
    // ) {
    //   const urlPath = this.router.url.split('/');
    //   urlPath.splice(urlPath.length - 1, 1, 'fillin').join('/');
    //   this.router.navigate([urlPath.join('/')]);
    //   return;
    // }

    this.modalData = this.getAddFormConfig();

    const { endpoint } = this.modalData;

    // let windowClass = this.config.visibleMode ? 'visible-mode' : '';

    const size = 'lg';
    let windowClass = '';

    if (
      (endpoint.includes('/candidate_contacts/') ||
        endpoint.includes('/companies/')) &&
      endpoint.includes('/languages/')
    ) {
      // size = undefined;
      windowClass = 'small-modal';
    }

    if (smallModalEndpoints.includes(endpoint)) {
      // size = undefined;
      windowClass += 'small-modal';
    }

    this.modalRef = this.modal.open(
      this.modalTemplate,
      dialogConfig({
        size: size as any,
        windowClass,
      })
    );
  }

  public formEvent(e: any, closeModal?: () => void) {
    if (e.type === 'formRegistration') {
      this.saveProcess$ = e.form.saveProcess;
    }

    if (e.type === 'sendForm' && e.status === 'success') {
      if (closeModal) {
        closeModal();
      }

      setTimeout(() => {
        this.updateList(e);
      }, 600);

      if (this.timelineService) {
        this.timelineService.emit(TimelineAction.Update);
      }
    }
  }

  public updateList(event: any) {
    if (
      this.config.delay &&
      this.checkOnUnique(event.sendData, this.config.unique as string[])
    ) {
      this.addedData.push(event.viewData);
      this.config.data.sendData.push(event.sendData);

      this.updateDataInTheList(this.defaultValues, this.addedData);
    }
    this.update.next(Date.now());
  }

  public checkedHandler(e: any) {
    this.event.emit(e);
  }

  public eventHandler(e: any) {
    if (e && e.type === 'createObject') {
      this.addObject();
    }

    if (e && this.config.templateOptions) {
      this.config.templateOptions.label = e.__str__;
    }
  }

  public checkCount(count: number): void {
    this.count = count;
    const showButton: boolean =
      !!this.config.templateOptions?.add_label || !!this.config.add_endpoint;
    this.showButton = this.config.max
      ? showButton && this.config.max > this.count
      : showButton;
  }

  public checkPermissions(type: string): boolean {
    if (this.allowMethods) {
      return this.allowMethods.indexOf(type) > -1;
    } else {
      return false;
    }
  }

  public checkOnUnique(data: any, fields: string[]) {
    if (!fields) {
      return true;
    }
    let check = true;
    fields.forEach((el: string) => {
      const inputValue = this.getValueByKey(el, data);
      this.config.data.sendData.find((field: any) => {
        const value = this.getValueByKey(el, field);
        if (inputValue === value) {
          check = false;
        }
      });

      this.config.data.results.find((field: any) => {
        const value = this.getValueByKey(el, field);
        if (inputValue === value) {
          check = false;
        }
      });
    });
    return check;
  }

  public getValueByKey(key: string, data: any): any {
    const keysArray = key.split('.');
    const firstKey: string = keysArray.shift() as string;
    if (keysArray.length === 0) {
      return data && data[firstKey];
    } else if (keysArray.length > 0) {
      const combineKeys = keysArray.join('.');
      return this.getValueByKey(combineKeys, data[firstKey]);
    }
  }

  public checkFormData() {
    if (this.config.formData) {
      const subscription = this.config.formData.subscribe(({ data, key }) => {
        this.formData = data;
        this.checkDefaultValues(data);
      });

      this.subscriptions.push(subscription);
    }
  }

  // public checkTimelineChange() {
  //   if (this.timelineService) {
  //     const subscription = this.timelineService.action$
  //       .pipe(skip(1))
  //       .subscribe(() => this.update.next(true));

  //     this.subscriptions.push(subscription);
  //   }
  // }

  public checkDefaultValues(data: any) {
    const format = new FormatString();
    if (this.config.default) {
      if (!this.defaultQueries) {
        this.defaultQueries = {};
      }
      const keys = Object.keys(this.config.default);
      let fullfilled = true;
      keys.forEach(key => {
        const value = format.format(this.config.default[key], data);
        this.defaultQueries[key] = value;
        if (!value) {
          fullfilled = false;
        }
      });

      if (fullfilled) {
        this.gfs
          .getByQuery(
            this.config.endpoint as string,
            this.generateQuery(this.defaultQueries)
          )
          .subscribe((res: any) => {
            this.defaultValues = res.results;
            this.updateDataInTheList(this.defaultValues, this.addedData);
            this.update.next(Date.now());
          });
      } else {
        this.defaultValues = [];
        this.updateDataInTheList(this.defaultValues, this.addedData);
        this.update.next(Date.now());
      }
      return;
    }
  }

  public generateQuery(data: any): string {
    const keys = Object.keys(data);
    const values = keys.map(key => {
      if (Array.isArray(data[key])) {
        const result: string[] = [];
        data[key].forEach((el: any) => {
          result.push(`${key}=${el}`);
        });
        return result.join('&');
      }

      return `${key}=${data[key]}`;
    });

    return `?${values.join('&')}`;
  }

  public updateDataInTheList(defaultData: any[], addedData: any[]) {
    this.pasredAddedData(
      addedData,
      defaultData,
      this.config.unique as string[]
    );
    this.pasredAddedData(
      this.config.data.sendData,
      defaultData,
      this.config.unique as string[]
    );
    this.config.data.results = [...defaultData, ...addedData];
  }

  public pasredAddedData(
    addedData: any[],
    defaultData: any[],
    fields: string[]
  ) {
    if (!fields) {
      return;
    }
    if (defaultData && defaultData.length) {
      fields.forEach((el: string) => {
        const inputValues: string[] = [];
        defaultData.forEach(field => {
          inputValues.push(this.getValueByKey(el, field));
        });

        for (let i = 0; i < addedData.length; i++) {
          const value = this.getValueByKey(el, addedData[i]);
          if (inputValues.indexOf(value) > -1) {
            addedData.splice(i, 1);
            i--;
          }
        }
      });
    }
  }

  private getAddFormConfig() {
    const { endpoint, add_endpoint, templateOptions, prefilled, delay } =
      this.config;

    const config = {
      title: templateOptions?.add_label,
      endpoint: add_endpoint || endpoint,
      data: <any>null,
    };

    if (prefilled) {
      config.data = {};
      const keys = Object.keys(prefilled);

      keys.forEach(el => {
        config.data[el] = {
          action: 'add',
          data: {
            value: delay ? undefined : prefilled[el],
            read_only: true,
            editForm: true,
          },
        };

        if (delay) {
          this.modalData.data[el].data.hide = true;
        }
      });
    }

    return config;
  }
}
