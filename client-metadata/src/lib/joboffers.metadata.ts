import { Time } from '@webui/time';

const list = {
  list: {
    list: 'joboffer',
    label: 'Job Offer',
    columns: [
      {
        sort_field: 'shift.date.shift_date',
        sorted: 'desc',
        sort: true,
        content: [{ field: 'shift.date.shift_date', type: 'datepicker' }],
        name: 'shift.date.shift_date',
        label: 'Shift date',
      },
      {
        content: [
          {
            values: {
              0: 'minus-circle',
              1: 'check-circle',
              2: 'times-circle',
              null: 'minus-circle',
            },
            color: {
              1: 'danger',
              2: 'success',
            },
            type: 'icon',
            field: 'status',
          },
          {
            values: { 0: 'Undefined', 1: 'Accepted', 2: 'Cancelled' },
            field: 'status',
            type: 'select',
          },
        ],
        delim: ' ',
        name: 'status',
        sort_field: 'status',
        label: 'Status',
        sort: true,
      },
    ],
    pagination_label: 'Job Offer',
    search_enabled: false,
    editDisable: false,
    filters: [
      {
        key: 'candidate_contact',
        label: 'Candidate contact',
        type: 'related',
        data: {
          value: '__str__',
          endpoint: '/candidate/candidatecontacts/',
          key: 'id',
        },
        query: 'candidate_contact',
      },
    ],
  },
  fields: [
    {
      key: 'shift.date.shift_date',
      type: 'datepicker',
      templateOptions: { required: true, label: 'Shift date', type: 'date' },
      read_only: true,
    },
    {
      key: 'status',
      default: 0,
      type: 'select',
      templateOptions: {
        required: false,
        label: 'Status',
        options: [
          { value: 0, label: 'Undefined' },
          { value: 1, label: 'Accepted' },
          { value: 2, label: 'Cancelled' },
        ],
        type: 'select',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'offer_sent_by_sms.id',
      templateOptions: {
        action: 'editModal',
        label: '',
        type: 'button',
        text: 'Offer',
      },
      type: 'button',
    },
    {
      key: 'candidate_rate',
      read_only: true,
      templateOptions: {
        required: false,
        display: '{currency}{field}/h',
        label: 'Candidate rate',
        type: 'static',
      },
      type: 'static',
    },
    {
      many: false,
      key: 'candidate_contact',
      endpoint: '/candidate/candidatecontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Candidate contact',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      key: 'shift.time',
      read_only: false,
      templateOptions: { required: true, label: 'Time', type: 'time' },
      type: 'datepicker',
    },
    {
      key: 'reply_received_by_sms.id',
      templateOptions: {
        action: 'editModal',
        label: '',
        type: 'button',
        text: 'Reply',
      },
      type: 'button',
    },
    {
      key: 'shift.date.shift_date',
      read_only: false,
      templateOptions: { required: true, label: 'Shift date', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'has_accept_action',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      showIf: ['scheduled_sms_datetime'],
      key: 'scheduled_sms_datetime',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Will send',
        type: 'datetime',
        listLabel: 'will_send',
      },
      type: 'datepicker',
    },
    {
      key: 'credit_approved',
      type: 'datepicker',
      templateOptions: {
        listLabel: 'was_sent',
        type: 'datetime',
      },
    },
    {
      key: 'has_send_action',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      key: 'timesheets',
      templateOptions: {
        link: null,
        label: 'Timesheets',
        type: 'link',
        text: 'Link to TimeSheet',
      },
      type: 'link',
    },
    {
      key: 'client_rate',
      read_only: true,
      templateOptions: {
        required: false,
        display: '{currency}{field}/h',
        label: 'Client rate',
        type: 'static',
      },
      type: 'static',
    },
    {
      key: 'has_cancel_action',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      default: 0,
      key: 'status',
      read_only: false,
      templateOptions: {
        required: false,
        options: [
          { value: 0, label: 'Undefined' },
          { value: 1, label: 'Accepted' },
          { value: 2, label: 'Cancelled' },
        ],
        values: {
          0: 'minus-circle',
          1: 'check-circle',
          2: 'times-circle',
          null: 'minus-circle',
        },
        label: 'Status',
        type: 'select',
      },
      type: 'select',
    },
    {
      key: 'has_resend_action',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'delete',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
  ],
  list: {
    columns: [
      {
        name: 'candidate_contact',
        sort: true,
        sort_field: 'candidate_contact',
        content: [
          {
            endpoint: '/candidate/candidatecontacts/',
            type: 'related',
            field: 'candidate_contact',
          },
          {
            field: 'candidate_contact.contact.phone_mobile',
            type: 'link',
            link: 'tel:{candidate_contact.contact.phone_mobile}',
          },
        ],
        label: 'Candidate contact',
      },
      {
        name: 'client/candidate_rate',
        content: [
          {
            display: '{currency}{field}/h',
            type: 'static',
            field: 'candidate_rate',
            help: 'candidate',
          },
          {
            display: '{currency}{field}/h',
            type: 'static',
            field: 'client_rate',
            help: 'client',
          },
        ],
        label: 'Rate',
        title: null,
        delim: null,
      },
      {
        name: 'shift.date.shift_date',
        sort_field: 'shift.date.shift_date',
        sorted: 'desc',
        sort: true,
        content: [
          {
            type: 'datepicker',
            field: 'shift.date.shift_date',
          },
          {
            type: 'datepicker',
            field: 'shift.time',
          },
        ],
        label: 'Shift info',
      },
      {
        name: 'sms_history',
        content: [
          {
            showIf: ['scheduled_sms_datetime'],
            label: 'Will send',
            type: 'datepicker',
            field: 'scheduled_sms_datetime',
          },
          {
            action: 'emptyPost',
            text: 'send',
            endpoint: '/hr/joboffers/{id}/send',
            type: 'button',
            field: 'has_send_action',
          },

          {
            type: 'static',
            hideValue: true,
            field: 'credit_approved',
            showIf: ['offer_sent_by_sms'],
          },

          {
            type: 'buttonGroup',
            field: 'offer_smses',
            groupLabel: 'Was sent',
            content: [
              {
                action: 'showMessage',
                messageType: 'sent',
                endpoint: '/sms-interface/smsmessages/{offer_sent_by_sms.id}',
                noDelim: true,
                placement: 'left',
                text: 'Offer',
                postfix: '|',
                type: 'button',
                color: 'link',
                field: 'offer_sent_by_sms',
              },

              {
                action: 'showMessage',
                messageType: 'reply',
                endpoint:
                  '/sms-interface/smsmessages/{reply_received_by_sms.id}',
                text: 'Reply',
                placement: 'right',
                emptyValue: '-',
                type: 'button',
                color: 'link',
                field: 'reply_received_by_sms',
              },
            ],
          },

          {
            action: 'emptyPost',
            text: 'Resend new',
            endpoint: '/hr/joboffers/{id}/resend',
            type: 'button',
            field: 'has_resend_action',
          },
        ],
        label: 'SMS History',
        title: null,
      },
      {
        name: 'status',
        content: [
          {
            values: {
              0: 'Undefined',
              1: 'Accepted',
              2: 'Cancelled',
            },
            color: {
              0: 'muted',
              1: 'success',
              2: 'danger',
            },
            content: [
              {
                action: 'emptyPost',
                endpoint: '/hr/joboffers/{id}/accept/',
                icon: 'fa-check',
                title: 'Accept',
                text_color: '#5cb85c',
                type: 'button',
                list: true,
                field: 'has_accept_action',
                templateOptions: {
                  icon: 'check',
                },
              },
              {
                action: 'emptyPost',
                endpoint: '/hr/joboffers/{id}/cancel/',
                icon: 'fa-times',
                title: 'Cancel',
                text_color: '#f32700',
                type: 'button',
                list: true,
                field: 'has_cancel_action',
                templateOptions: {
                  icon: 'times',
                },
              },
            ],
            type: 'select',
            field: 'status',
          },
        ],
        label: 'Status',
        title: null,
      },
      {
        name: 'actions',
        content: [
          {
            action: 'delete',
            icon: 'fa-trash',
            title: 'Delete',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: null,
      },
    ],
    list: 'joboffer',
    editDisable: false,
    label: 'Job Offer',
    pagination_label: 'Job Offer',
    search_enabled: false,
  },
};

const form = [
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Updated at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Created at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'shift.id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    key: 'shift.time',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Time', type: 'time' },
    read_only: false,
  },
  {
    key: 'shift.date.shift_date',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Shift date', type: 'date' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/hr/shiftdates/',
    read_only: false,
    templateOptions: {
      label: 'Date',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'shift.date',
    many: false,
  },
  {
    list: false,
    endpoint: '/hr/shifts/',
    read_only: false,
    templateOptions: {
      label: 'Shift',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'shift',
    many: false,
  },
  {
    list: false,
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    templateOptions: {
      label: 'Candidate contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'candidate_contact',
    many: false,
  },
  {
    key: 'offer_sent_by_sms.id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: false,
    templateOptions: {
      label: 'Offer sent by sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'offer_sent_by_sms',
    many: false,
  },
  {
    key: 'reply_received_by_sms.id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: false,
    templateOptions: {
      label: 'Reply received by sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'reply_received_by_sms',
    many: false,
  },
  {
    key: 'status',
    default: 0,
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Status',
      type: 'select',
      options: [
        { value: 0, label: 'Undefined' },
        { value: 1, label: 'Accepted' },
        { value: 2, label: 'Cancelled' },
      ],
    },
    read_only: false,
  },
  {
    key: 'scheduled_sms_datetime',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Scheduled date',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'offer_sent_by_sms.id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: false,
    templateOptions: {
      label: 'Offer sent by sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'offer_sent_by_sms',
    many: false,
  },
  {
    key: 'reply_received_by_sms.id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: false,
    templateOptions: {
      label: 'Reply received by sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'reply_received_by_sms',
    many: false,
  },
  {
    key: 'shift.id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    key: 'shift.time',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Time', type: 'time' },
    read_only: false,
  },
  {
    key: 'shift.date.shift_date',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Shift date', type: 'date' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/hr/shiftdates/',
    read_only: false,
    templateOptions: {
      label: 'Date',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'shift.date',
    many: false,
  },
  {
    list: false,
    endpoint: '/hr/shifts/',
    read_only: false,
    templateOptions: {
      label: 'Shift',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'shift',
    many: false,
  },
  {
    key: 'candidate_rate',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Candidate rate',
      type: 'static',
    },
    read_only: true,
  },
  {
    key: 'client_rate',
    type: 'static',
    templateOptions: { required: false, label: 'Client rate', type: 'static' },
    read_only: true,
  },
  {
    key: 'timesheets',
    type: 'static',
    templateOptions: { required: false, label: 'Timesheets', type: 'static' },
    read_only: true,
  },
  {
    key: 'has_accept_action',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Has accept action',
      type: 'static',
    },
    read_only: true,
  },
  {
    key: 'has_cancel_action',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Has cancel action',
      type: 'static',
    },
    read_only: true,
  },
  {
    key: 'has_resend_action',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Has resend action',
      type: 'static',
    },
    read_only: true,
  },
  {
    key: 'has_send_action',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Has send action',
      type: 'static',
    },
    read_only: true,
  },
];

const formadd = [
  {
    key: 'job',
    endpoint: '/hr/jobs/',
    send: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__'],
      label: 'Job',
      type: 'related',
    },
    read_only: true,
    type: 'related',
  },
  {
    endpoint: '/hr/shifts/',
    templateOptions: {
      label: 'Shift',
      values: ['__str__', 'time', 'date', 'workers'],
      type: 'related',
    },
    query: {
      job: '{job.id}',
      ordering: '-date.shift_date,-time',
    },
    type: 'related',
    key: 'shift',
  },
  {
    key: 'workers',
    type: 'input',
    send: false,
    read_only: true,
    showIf: ['shift.id'],
    default: '{shift.workers}',
    templateOptions: {
      label: 'Workers',
      type: 'number',
    },
  },
  {
    type: 'related',
    endpoint: `/hr/jobs/{job.id}/extend_fillin/`,
    key: 'candidate_contact',
    templateOptions: {
      label: 'Select worker',
      info: {
        score: '{candidate_scores.average_score}',
        distance: '{distance}',
      },
      values: ['__str__'],
    },
    showIf: ['shift.id'],
    query: {
      shift: `{shift.date.shift_date}T{shift.time}%2B${Time.now()
        .format('Z')
        .slice(1)}`,
    },
  },
];

const extend = {
  fields: [
    {
      many: false,
      key: 'candidate_contact',
      endpoint: '/candidate/candidatecontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Candidate',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      key: 'shift.time',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Shift start time',
        type: 'time',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'shift_start_time',
        content: [
          {
            label: 'Shift start time',
            type: 'datepicker',
            field: 'shift.time',
          },
        ],
        label: 'Shift start time',
        title: null,
        delim: null,
      },
      {
        name: 'candidate',
        content: [
          {
            endpoint: '/candidate/candidatecontacts/',
            label: 'Candidate',
            type: 'related',
            field: 'candidate_contact',
          },
        ],
        label: 'Candidate',
        title: null,
        delim: null,
      },
    ],
    list: 'joboffer',
    editDisable: false,
    label: 'Job Offer',
    pagination_label: 'Job Offer',
    search_enabled: false,
  },
};

export const joboffers = {
  list,
  form,
  formset,
  formadd,
  extend,
};
