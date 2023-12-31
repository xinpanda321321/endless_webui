const list = {
  list: {
    list: 'formfield',
    label: 'form field',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Form Field',
      },
    ],
    pagination_label: 'form field',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Form Field',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/core/modelformfields/',
    read_only: true,
    templateOptions: {
      label: 'Modelformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'modelformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/selectformfields/',
    read_only: true,
    templateOptions: {
      label: 'Selectformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'selectformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/dateformfields/',
    read_only: true,
    templateOptions: {
      label: 'Dateformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'dateformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/checkboxformfields/',
    read_only: true,
    templateOptions: {
      label: 'Checkboxformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'checkboxformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/radiobuttonsformfields/',
    read_only: true,
    templateOptions: {
      label: 'Radiobuttonsformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'radiobuttonsformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/fileformfields/',
    read_only: true,
    templateOptions: {
      label: 'Fileformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'fileformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/imageformfields/',
    read_only: true,
    templateOptions: {
      label: 'Imageformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'imageformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/numberformfields/',
    read_only: true,
    templateOptions: {
      label: 'Numberformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'numberformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/textformfields/',
    read_only: true,
    templateOptions: {
      label: 'Textformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'textformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/textareaformfields/',
    read_only: true,
    templateOptions: {
      label: 'Textareaformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'textareaformfield',
    many: false,
  },
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: false,
      label: 'ID',
      type: 'number',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Polymorphic ctype',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'polymorphic_ctype',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/formfieldgroups/',
    read_only: true,
    templateOptions: {
      label: 'Group',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'group',
    many: false,
  },
  {
    key: 'name',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Name',
      max: 50,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'label',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Label',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'placeholder',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Placeholder',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'class_name',
    default: 'form-control',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Class name',
      max: 64,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'required',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Required',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'position',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Position',
      max: 2147483647,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    key: 'help_text',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Help text',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/core/modelformfields/',
    read_only: true,
    templateOptions: {
      label: 'Modelformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'modelformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/selectformfields/',
    read_only: true,
    templateOptions: {
      label: 'Selectformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'selectformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/dateformfields/',
    read_only: true,
    templateOptions: {
      label: 'Dateformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'dateformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/checkboxformfields/',
    read_only: true,
    templateOptions: {
      label: 'Checkboxformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'checkboxformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/radiobuttonsformfields/',
    read_only: true,
    templateOptions: {
      label: 'Radiobuttonsformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'radiobuttonsformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/fileformfields/',
    read_only: true,
    templateOptions: {
      label: 'Fileformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'fileformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/imageformfields/',
    read_only: true,
    templateOptions: {
      label: 'Imageformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'imageformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/numberformfields/',
    read_only: true,
    templateOptions: {
      label: 'Numberformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'numberformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/textformfields/',
    read_only: true,
    templateOptions: {
      label: 'Textformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'textformfield',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/textareaformfields/',
    read_only: true,
    templateOptions: {
      label: 'Textareaformfield',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'textareaformfield',
    many: false,
  },
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: false,
      label: 'ID',
      type: 'number',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Polymorphic ctype',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'polymorphic_ctype',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/formfieldgroups/',
    read_only: true,
    templateOptions: {
      label: 'Group',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'group',
    many: false,
  },
  {
    key: 'name',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Name',
      max: 50,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'label',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Label',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'placeholder',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Placeholder',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'class_name',
    default: 'form-control',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Class name',
      max: 64,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'required',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Required',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'position',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Position',
      max: 2147483647,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    key: 'help_text',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Help text',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
];

export const formfields = {
  list,
  form,
  formadd,
};
