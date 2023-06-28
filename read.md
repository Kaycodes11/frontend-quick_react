username = async validation

firstName = sync validation
lastName = sync validation

mobileNo = normalize

# dependant field

country = India
state = West Bengal

[React Hook Form Resource]: https://react-hook-form.com/docs/usecontroller/controller
# React hook form by default ues Uncontrollere components (via ref)
When doing <input {...register} /> or using custom fields like <Input />: it uses `ref` within

# How to use controlled components with React Hook Form like React DatePicker? 
Refer to InputMasking.tsx, so once again the controller components will be only needed when using third-party UI library like MUI or something React DatePicker. Otherwise uncontrolled do just fine

# [ Reference ]: https://www.react-hook-form.com/ts/ ( search "export type" for all type usages )

