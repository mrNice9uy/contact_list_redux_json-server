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
