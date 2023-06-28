username = async validation

firstName = sync validation
lastName = sync validation

mobileNo = normalize

# dependant field

country = India
state = West Bengal

[React Hook Form pratical examples]: https://github.com/react-hook-form/react-hook-form/tree/master/examples [`look at here when stuck on any topic on React hook form`]

# React hook form by default ues Uncontrollere components (via ref)
When doing <input {...register} /> or using custom fields like <Input />: it uses `ref` within

[ React hook form controlled ]: https://react-hook-form.com/docs/usecontroller/controller
# How to use controlled components with React Hook Form like React DatePicker? 
Refer to InputMasking.tsx, so once again the controller components will be only needed when using third-party UI library like MUI or something React DatePicker. Otherwise uncontrolled do just fine

# [ Reference ]: https://www.react-hook-form.com/ts/ ( search "export type" for all type usages )

