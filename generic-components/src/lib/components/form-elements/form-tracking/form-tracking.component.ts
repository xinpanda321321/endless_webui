import { Component, OnDestroy, OnInit } from '@angular/core';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// import { GenericFormService } from '../../../services';
// import { TrackingModalComponent } from '../../../modals';
import { TranslateModule } from '@ngx-translate/core';
import { EventService, EventType, GenericFormService } from '@webui/core';
import { DialogRef, DialogType } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-form-tracking',
  templateUrl: './form-tracking.component.html',
  styleUrls: ['./form-tracking.component.scss'],
  imports: [TranslateModule],
})
export class FormTrackingComponent implements OnInit, OnDestroy {
  public config: any;
  public modalRef!: DialogRef;
  label = '';
  buttonLabel = '';

  constructor(
    private genericFormService: GenericFormService,
    // private modalService: NgbModal,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const { translateKey } = this.config;
    const label = this.config.templateOptions.label;

    this.label = translateKey ? translateKey + '.label' : label;
    this.buttonLabel = translateKey + '.show';
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public showTracking() {
    const timesheet = this.config.formData.value.data;
    const endpoint = `/candidate/location/${timesheet.job_offer.candidate_contact.id}/history/`;

    this.genericFormService
      .getByQuery(endpoint, `?timesheet=${timesheet.id}&limit=-1`)
      .subscribe(res => {
        if (res.results.length) {
          this.eventService.emit(EventType.OpenDialog, {
            type: DialogType.Tracking,
            onInit: (dialogRef: DialogRef) => (this.modalRef = dialogRef),
            options: {
              // backdrop: 'static',
              data: {
                results: res.results,
                timesheet,
              },
            },
          });

          // this.modalRef = this.modalService.open(TrackingModalComponent, {
          //   backdrop: 'static',
          // });
          // this.modalRef.componentInstance.timesheet = timesheet;
          // this.modalRef.componentInstance.data = res.results;
        }
      });
  }
}
