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
        .min(4, 'Password length cannot be less than 4 characters.')
        .max(64, 'Password length cannot exceed 64 characters')
        .required('This field cannot be left empty.'),

    FA: Yup.string()
        .nullable()
        .min(4, 'رمز عبور باید شامل حداقل ۴ کاراکتر باشد.')
        .max(64, 'رمز عبور نمی‌تواند شامل بیش از ۶۴ کاراکتر باشد.')
        .required('این فیلد نمی‌تواند خالی باشد.'),
}

export const INR = Yup.number()
    .nullable()
    .min(0.01, 'Not in the valid range')
    .max(30.0, 'Not in the valid range')


export const SHORT_TEXT = Yup.string()
    .nullable()
    .max(64, 'Input must not contain more than 64 characters.')

export const BLOOD_PRESSURE = Yup.string()
    .nullable()
    .min(1, 'Invalid value')
    .max(64, 'Too many characters')

export const HEARTBEAT = Yup.number()
    .nullable()
    .min(30, 'Invalid Value')
    .max(400, 'Invalid Value')

export const RESPIRATORY_RATE = Yup.number()
    .nullable()
    .min(1, 'Invalid Value')
    .max(200, 'Invalid Value')

export const PERCENTAGE = Yup.number()
    .nullable()
    .min(0, 'Must be a valid percentage')
    .max(100, 'Must be a valid percentage')

export const USUAL_NUMBER = Yup.number()
    .nullable()
    .max(-100, 'Must be a valid number')
    .max(100000000, 'Must be a valid number')

export const NOTHING = Yup.string()
    .nullable()
    .notRequired();

export const NATIONAL_CODE = null;
export const PASSWORD_REPEAT = null;
