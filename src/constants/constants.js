export const REGISTER_FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 44 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

export const TAIL_FORM_ITEM_LAYOUT = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

export const BUTTON_ITEM_LAYOUT = {
  wrapperCol: {
    span: 14,
    offset: 4,
  },
};

export const CONTACT_MODAL_RULES = {
  name: [
    {
      required: true,
      message: "Please input name!",
      whitespace: true,
    },
  ],
  email: [
    {
      type: "email",
      message: "The input is not valid E-mail!",
    },
    {
      required: true,
      message: "Please input E-mail!",
    },
  ],
};
