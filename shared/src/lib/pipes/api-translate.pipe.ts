import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SiteSettingsService } from '@webui/core';
import { Language } from '@webui/models';
import { checkAndReturnTranslation } from '@webui/utilities';
import { map, merge, of } from 'rxjs';

@Pipe({
  standalone: true,
  name: 'apiTranslate',
})
export class ApiTranslatePipe implements PipeTransform {
  constructor(
    private translateService: TranslateService,
    private settings: SiteSettingsService
  ) {}

  transform(value: any) {
    const countryCode = this.settings.settings.country_code;
    const currentLanguage = this.translateService.currentLang as Language;

    return merge(
      of(checkAndReturnTranslation(value, countryCode, currentLanguage)),
      this.translateService.onLangChange.pipe(
        map(({ lang }) => {
          return checkAndReturnTranslation(
            value,
            this.settings.settings.country_code,
            lang as Language
          );
        })
      )
    );
  }
}
