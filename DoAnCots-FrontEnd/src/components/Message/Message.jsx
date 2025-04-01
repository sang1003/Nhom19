import { message } from "antd";

const success = (mes = "Thành Công") => {
    message.success(mes);
};

const error = (mes = "Thất Bại") => {
    message.error(mes);
};

const warning = (mes = 'Warning') => {
    message.warning(mes);
};

export { success, error, warning }