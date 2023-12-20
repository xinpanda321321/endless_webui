export const Picture = 'picture';

export class PictureElement {
  type = Picture;

  field: string;

  file?: boolean;
  signature?: boolean;
  showIf?: Array<string | { [key: string]: any }>;

  constructor(field: string, file?: boolean) {
    this.field = field;
    this.file = file;
  }

  setSignature() {
    this.signature = true;

    return this;
  }

  setShowIfRule(showIf: Array<string | { [key: string]: any }>) {
    this.showIf = showIf;

    return this;
  }
}
