import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

// import {
//   FilterBlockComponent,
//   FilterEvent,
//   FilterService,
// } from '@webui/dynamic-form';
import {
  GoogleMapsModule,
  MapAnchorPoint,
  MapInfoWindow,
} from '@angular/google-maps';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent, SvgIconComponent } from '@webui/ui';
import { MapService, Marker } from '../../services';
import { FilterBlockComponent } from '@webui/generic-components';
import { FilterService } from '@webui/core';
import { FilterEvent } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    GoogleMapsModule,
    TranslateModule,
    SvgIconComponent,
    LoaderComponent,
    FilterBlockComponent,
  ],
  providers: [MapService, FilterService],
})
export class MapComponent implements OnInit, OnDestroy {
  private _hasFilters = new BehaviorSubject<boolean>(false);
  private _loading = new BehaviorSubject<boolean>(false);

  @ViewChild('filterBlock') public elementRef!: ElementRef;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  public filtersOfList!: any[];
  public markers?: Marker[];
  public currentPosition: any;
  public currentQuery!: string;

  public config = {
    list: 'jobsitesMap',
    filters: this.mapService.getFilters(),
  };

  public options: google.maps.MapOptions = {
    zoom: 13,
  };
  public icons: Record<
    string,
    {
      exist: boolean;
      name: string;
      translateKey: string;
      path: string;
    }
  > = {
    current: {
      exist: false,
      name: 'Your current position',
      translateKey: 'current_position',
      path: '/assets/img/location-yellow.svg',
    },
    client: {
      exist: false,
      name: 'Clients',
      translateKey: 'client.label',
      path: '/assets/img/location-orange.svg',
    },
    jobsite: {
      exist: false,
      name: 'Jobsites',
      translateKey: 'jobsite.label',
      path: '/assets/img/location-blue.svg',
    },
    client_hq: {
      exist: false,
      name: 'Primary Client addresses',
      translateKey: 'primary_client.label',
      path: '/assets/img/location-red.svg',
    },
    jobsite_open: {
      exist: false,
      name: 'Jobsites with Booking on "Open" state',
      translateKey: '',
      path: '/assets/img/location-bluesky.svg',
    },
  };
  public types = ['current', 'client_hq', 'jobsite', 'jobsite_open', 'client'];

  // Tallinn
  public defaultLatitude = 59.436962;
  public defaultLongitude = 24.753574;

  public currentMarker?: Marker;

  public hasFilters$ = this._hasFilters.asObservable();
  public loading$ = this._loading.asObservable();

  constructor(
    private mapService: MapService,
    private filterService: FilterService
  ) {}

  public ngOnInit() {
    this.getCurrentPosition();

    this.filterService.filters = {
      endpoint: this.mapService.endpoint,
      list: this.config,
    };
    this.filtersOfList = this.filterService.getFiltersByEndpoint(
      this.mapService.endpoint
    );
  }

  public ngOnDestroy() {
    this.filterService.clean(this.mapService.endpoint, this.config.list);
  }

  public getPositions(query = '') {
    this.types.forEach(el => {
      this.icons[el].exist = false;
    });

    this._loading.next(true);

    this.mapService.getPositions(query).subscribe(res => {
      this._loading.next(false);

      this.markers = res;
      this.markers.forEach(el => (this.icons[el.type].exist = true));
      this.currentQuery = query;

      if (this.currentPosition) {
        this.icons['current'].exist = true;
        this.markers.push(this.currentPosition);
      }
    });
  }

  public filterHandler(e: FilterEvent) {
    this._hasFilters.next(false);

    if (e.reset) {
      if (this.currentQuery !== '') {
        this.markers = undefined;
        this.getPositions();

        this.filterService.resetFilters(e.list);
      }
    } else {
      const query = this.filterService.getQuery(e.list);

      if (this.currentQuery !== query) {
        this.markers = undefined;
        this.getPositions('?' + query);
      }
    }
  }

  public getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.currentPosition = {
          type: 'current',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        this.currentPosition.type = 'current';

        this.getPositions();
      },
      () => {
        this.currentPosition = {
          type: 'current',
          lat: this.defaultLatitude,
          lng: this.defaultLongitude,
        };
        this.getPositions();
      }
    );
  }

  public openInfo(marker: Marker, anchor: MapAnchorPoint) {
    this.currentMarker = marker;
    this.infoWindow.open(anchor);
  }

  public onToggle() {
    this._hasFilters.next(!this._hasFilters.value);
  }
}
