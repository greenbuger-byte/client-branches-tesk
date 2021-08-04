import React from 'react';
import {AddForm, Button, FormControl, FormError, Input} from "../styles/Global";
import {Formik, FormikValues} from "formik";
import {validateRules} from "../hooks/validateRules";
import {useActions} from "../hooks/useActions";
import {CompanyStreet} from "../types/company";

const AddClient: React.FC<{apartment: CompanyStreet, archive: CompanyStreet[]}> = ({apartment, archive}) => {
   const {createClientActionCreator} = useActions();
   return <Formik
       initialValues={{name: "", email: "", phone: ""}}
       validate={validateRules}
       onSubmit={async (values: FormikValues, {setSubmitting}) => {
           await createClientActionCreator(values, apartment, archive);
           values.name="";
           values.email="";
           values.phone="";
           setSubmitting(false);
       }}>
       {
           ({
                values,
                errors,
                handleChange,
                handleSubmit,
                touched,
                isSubmitting
            }) => (
               <AddForm onSubmit={handleSubmit}>
                   <FormControl>
                       <Input error={errors.email!== undefined}
                              name={"email"}
                              type={'email'}
                              onChange={handleChange}
                              value={values.email}
                              placeholder={"Емаил"}/>
                      <FormError>{errors.email}</FormError>
                   </FormControl>
                   <FormControl>
                       <Input error={errors.name!== undefined}
                              name={"name"}
                              type={'text'}
                              onChange={handleChange}
                              value={values.name}
                              placeholder={"Имя Клиента"}/>
                       <FormError>{errors.name}</FormError>
                   </FormControl>
                   <FormControl>
                       <Input error={errors.phone!== undefined}
                              name={"phone"}
                              type={'phone'}
                              onChange={handleChange}
                              value={values.phone}
                              placeholder={"Телефон"}/>
                      <FormError>{errors.phone}</FormError>
                   </FormControl>
                   <FormControl>
                       <Button type={"submit"} onSubmit={()=>handleSubmit()} disabled={isSubmitting}>Добавить клиента</Button>
                   </FormControl>
               </AddForm>
           )
       }
   </Formik>
}

export default AddClient;