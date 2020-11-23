import * as Yup from "yup";


export const NAME = null;

export const USERNAME = {
    EN: Yup.string()
        .nullable()
        .min(3, "Username length cannot be less than 3 characters.")
        .max(32, 'Username length cannot exceed 32 characters')
        .required('This field cannot be left empty.'),

    FA: Yup.string()
        .nullable()
        .min(3, "نام کاربری باید شامل ۳ کاراکتر یا بیشتر باشد.")
        .max(32, 'نام کاربری نمی‌تواند شامل بیش از ۳۲ کاراکتر باشد.')
        .required('این فیلد نمی‌تواند خالی باشد.'),
}

export const PASSWORD = {
    EN: Yup.string()
        .nullable()
        .min(8, 'Password length cannot be less than 8 characters.')
        .max(64, 'Password length cannot exceed 64 characters')
        .required('This field cannot be left empty.'),

    FA: Yup.string()
        .nullable()
        .min(8, 'رمز عبور باید شامل حداقل ۸ کاراکتر باشد.')
        .max(64, 'رمز عبور نمی‌تواند شامل بیش از ۶۴ کاراکتر باشد.')
        .required('این فیلد نمی‌تواند خالی باشد.'),
}

export const NATIONAL_CODE = null;
export const PASSWORD_REPEAT = null;
