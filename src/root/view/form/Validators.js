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

export const INR = Yup.number()
    .nullable()
    .min(0.1, 'مقدار در بازه صحیح قرار ندارد.')
    .max(5.0, 'مقدار در بازه صحیح قرار ندارد.')

export const YEAR = Yup.number()
    .nullable()
    .min(98, '۹۸-۹۹')
    .max(99, '۹۸-۹۹')

export const MONTH = Yup.number()
    .nullable()
    .min(1, '۱-۱۲')
    .max(12, '۱-۱۲')

export const DAY = Yup.number()
    .nullable()
    .min(1, '۱-۳۱')
    .max(31, '۱-۳۱')


export const SHORT_TEXT = Yup.string()
    .nullable()
    .max(64, 'مقدار نباید از ۶۴ کاراکتر بیشتر باشد.')

export const NATIONAL_CODE = null;
export const PASSWORD_REPEAT = null;
