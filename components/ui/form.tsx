'use client'

import * as React from 'react'
import * as Slot from '@radix-ui/react-slot'
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

const Form = FormProvider

type FormFieldContextValue<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  error?: { message: string }
  isRequired?: boolean
}

const FormFieldContext = React.createContext<FormFieldContextValue<any>>({} as FormFieldContextValue<any>)

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  ...props
}: ControllerProps<TFieldValues>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const { error, isRequired } = React.useContext(FormFieldContext)
    return (
      <label
        ref={ref}
        className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
        {...props}
      >
        {props.children}
        {isRequired && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
        {error && <span className="text-destructive ml-1" aria-hidden="true">(error)</span>}
      </label>
    )
  }
)
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error } = React.useContext(FormFieldContext)
    const message = error ? String(error.message) : children
    if (!message) return null
    return (
      <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props}>
        {message}
      </p>
    )
  }
)
FormMessage.displayName = 'FormMessage'

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = useFormContext()
  const { getFieldState, formState } = itemContext
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const fieldId = `field-${fieldContext.name}`.replace(/\./g, '-')

  return {
    id: fieldId,
    name: fieldContext.name,
    formItemId: `${fieldId}-form-item`,
    formDescriptionId: `${fieldId}-form-item-description`,
    formMessageId: `${fieldId}-form-item-message`,
    ...fieldState,
  }
}

type FormFieldProps<TFieldValues extends FieldValues = FieldValues> = ControllerProps<TFieldValues>

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
export type { FormFieldProps }