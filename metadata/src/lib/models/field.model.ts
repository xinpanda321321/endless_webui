import { Endpoints } from '@webui/models';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

export type IsHiddenFn = () => boolean;

export type QueryParamValue = string | string[] | boolean;
export type QueryObject = Record<string, QueryParamValue>;

export type AddAllOptions = {
  endpoint: Endpoints;
  property: string;
  properties: Record<string, string>;
  query: QueryObject;
};

export interface ITemplateOptions {
  hideLabel?: boolean;
  dontSendFields?: boolean;
  label?: string;
  type?: string;
  min?: unknown;
  max?: unknown;
  required?: boolean;
  readonly?: boolean;
  display?: string;
  param?: string;
  values?: string[];
  text?: string;
  description?: string;
  editLabel?: string;
  editDescription?: string;
  info?: any;
  bottom?: boolean;
  inlineFilters?: boolean;
  addon?: string;
  placeholder?: string;
  danger?: string;
  step?: number;
  icon?: string;
  noneValue?: string;
  full?: boolean;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  hidePreviewError?: boolean;
  customLabel?: {
    field: string;
    values: { [key: string]: any };
  };
  inline?: boolean;
  additionalDescription?: string;
  rows?: number;
  showButtonIf?: boolean; // Checkbox button
  color?: any;
  bold?: any;
  dropdownCount?: number;
  currency?: boolean;
  listDisplay?: string;
  listParam?: string;
  round?: true;
  array?: boolean;
  pattern?: string;
  patternError?: string;
  add_label?: string;
  iconParsed?: string;
  deleteList?: boolean;
  indent?: boolean;
  hasButtonInAction?: boolean;
}

export interface Field {
  insertData?: Record<string, any>;
  type?: string;
  key?: string;
  read_only?: boolean;
  hide?: boolean;
  many?: boolean;
  list?: boolean;
  children?: Field[];
  showIf?: any[];
  value?: any;
  activeMetadata?: Field[];
  hidden?: BehaviorSubject<boolean>;
  formData?: BehaviorSubject<any>;
  data?: any;
  metadata?: Field[];
  options?: any[];
  dateTable?: boolean;
  prefilled?: any;
  send?: boolean;
  view?: boolean;
  mode?: BehaviorSubject<string>;
  saveField?: boolean;
  endpoint?: string;
  custom?: any;
  collapsed?: boolean;
  editForm?: boolean;
  metadata_query?: string | any;
  add_metadata_query?: string | any;
  customValue?: any;
  default?: any;
  autocompleteData?: Subject<any>;
  autocomplete?: any[];
  query?: any;
  currentQuery?: string;
  useOptions?: boolean;
  doNotChoice?: boolean;
  defaultData?: any;
  delay?: any;
  delayData?: any;
  formId?: number;
  errorMessage?: {
    field: string;
    message: string;
    visible?: boolean;
  };
  checkObject?: any;
  values?: any;
  related?: any;
  readonly?: any;
  update?: any;
  updateFormData?: boolean;
  isPrefilled?: boolean;
  reset?: string[];
  attributes?: Record<keyof ITemplateOptions, any>;
  editEndpoint?: string;
  edit_endpoint?: string;
  useValue?: boolean;
  if_master?: any;
  relatedObjects?: any;
  candidateTabs?: boolean;
  unique?: boolean | string[];
  visibleMode?: boolean;
  disableButtons?: boolean;
  disableActions?: boolean;
  normal?: boolean;
  hideIfNull?: boolean;
  updated?: string[];
  formBuilder?: boolean;
  hideEditButton?: boolean;
  inline?: boolean;
  hideOnMobile?: boolean;
  showOnMobile?: boolean;
  disabled?: {
    keys: string[];
    values: any[];
    messages: string[];
  };
  strField?: string;
  updateFromForm?: boolean;
  tests?: any[];
  sendData?: string[];
  column?: boolean;
  replaceKey?: string;
  activeId?: string;
  withoutIdField?: boolean;
  intl?: boolean;
  candidateForm?: boolean;
  smallModal?: boolean;
  replaceByData?: boolean;
  show?: BehaviorSubject<boolean>;
  // dataList?: any;
  companyPicture?: boolean;
  relatedData?: any;
  relatedDataMap?: any;
  add_form?: boolean;
  translateKey?: string;
  add_endpoint?: string;
  max?: number;
  isHidden?: IsHiddenFn;
  addEndpoint?: string;
  listKey?: string;
  templateOptions?: ITemplateOptions;
  message?: any;
  width?: any;
  hideSelect?: boolean;
  additional_text?: string;
  responseField?: string;
  paginated?: 'on';
  supportData?: any;
  metaType?: any;
  actions?: any;
  help?: any;
  addAll?: AddAllOptions;
}
