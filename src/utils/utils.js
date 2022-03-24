import { notification } from "antd";

export const openNotification = (type, status, text) => {
  notification[type]({
    message: status,
    description: text,
  });
};
