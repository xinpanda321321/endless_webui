import { Form, InputType, List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = () => ({
  list: new List.main.element('inventory', 'Inventory')
    .setActions({
      options: [
        {
          endpoint: `${Endpoints.Inventory}delete`,
          label: 'delete',
          selectionError: 'Please select at least one tool!',
          confirm: true,
          message: 'are_you_sure',
          property: 'name',
          required: true,
        },
      ],
      label: 'Actions',
      agree_label: 'agree',
      button_label: 'action.go',
      decline_label: 'decline',
    })
    .setButtons([
      {
        action: 'add_object',
        label: 'action.add_new_tool',
      },
    ])
    .disableSearch()
    .setColumns([
      new List.column.element('id', 'Item ID').setContent([
        new List.text.element('id', 'Name'),
      ]),
      new List.column.element('image', 'Image').setContent([
        new List.text.element('images', 'Name'),
      ]),
      new List.column.element('tool_name', 'Tool Name').setContent([
        new List.text.element('name', 'Name'),
      ]),
      new List.column.element('rent_price', 'Rent Price').setContent([
        new List.text.element('rent_price')
          .setCurrency()
          .setFormatValue('{currency}{field}'),
      ]),
      new List.column.element('rent_type', 'Rent Type').setContent([
        new List.select.element('rent_type').setValues({
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
        }),
      ]),
      new List.column.element('street_address', 'Tool Location').setContent([
        new List.text.element('street_address', 'Name'),
      ]),
      new List.column.element('qr_code', 'Qr Code').setContent([
        new List.text.element('qr_code', 'Name'),
      ]),
    ]),
});

const formadd = () => [
  new Form.row.element().setChildren([
    new Form.group.element('').setChildren([
      new Form.input.element('name', 'Tool name', InputType.Text),
      new Form.input.element(
        'rent_price',
        'Price',
        InputType.Number
      ).updateTemplate({
        description: 'Rent price for the tool',
      }),
    ]),

    new Form.group.element('').setChildren([
      new Form.select.element('rent_type', 'Rent Type').addOptions({
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
      }),
      new Form.input.element(
        'street_address',
        'Street address',
        InputType.Text
      ).updateTemplate({
        description: 'Location of the tool to rent from',
      }),
    ]),
  ]),

  new Form.imageList.element('files', 'Images'),
];

const form = () => [
  new Form.row.element().setChildren([
    new Form.group.element('').setChildren([
      new Form.input.element('name', 'Tool name', InputType.Text),
      new Form.input.element(
        'rent_price',
        'Price',
        InputType.Number
      ).updateTemplate({
        description: 'Rent price for the tool',
      }),
    ]),

    new Form.group.element('').setChildren([
      new Form.select.element('rent_type', 'Rent Type').addOptions({
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
      }),
      new Form.input.element(
        'street_address',
        'Street address',
        InputType.Text
      ).updateTemplate({
        description: 'Location of the tool to rent from',
      }),
    ]),
  ]),

  new Form.imageList.element('files', 'Images'),
];

export const inventory = {
  list,
  formadd,
  form,
};
