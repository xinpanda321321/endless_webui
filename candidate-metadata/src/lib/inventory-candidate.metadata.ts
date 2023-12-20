import { List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = () => ({
  list: new List.main.element('rent_tools', 'Rent Tools')
    .disableSearch()
    .disableEdit()
    .setButtons([])
    .setColumns([
      new List.column.element('image', 'Image').setContent([
        new List.picture.element('image', false),
      ]),
      new List.column.element('tool_name', 'Tool Name').setContent([
        new List.text.element('name', 'Name'),
      ]),
      new List.column.element('street_address', 'Tool Location').setContent([
        new List.text.element('street_address', 'Name'),
      ]),
      new List.column.element('buttons', 'Actions').setContent([
        new List.button.element('id', 'emptyPost')
          .setDisplay('Rent')
          .setTranslationKey('action.rent')
          .setEndpoint(`${Endpoints.InventoryCandidate}{id}/confirm/`)
          .setStyles([
            'success',
            'shadow',
            'shadow-success',
            'size-m',
            'resize',
          ]),
      ]),
    ]),
});

export const inventoryCandidate = {
  list,
};
