import {FormikValues} from "formik";
export interface FormErrors{
    email?: string;
    name?: string;
    phone?:string;
}
export const validateRules = (values:FormikValues):FormErrors => {
    const errors: FormErrors={};
    if (!values.email) {
        errors.email = "Не заполнено";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        .test(values.email)) {
        errors.email = "Некорректный емеил"
    }
    if (!values.name) {
        errors.name = "Имя не заполнено"
    }
    if (!(/^\d+$/i).test(values.phone)) {
        errors.phone = "Некорректный номер"
    }else if (values.phone.length!==11){
        errors.phone = "Номер должен быть 11 знаков"
    }
    return errors;
}