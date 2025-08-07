'use client'

import React, { useState } from 'react'
import { Button } from '@/app/(shared)/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/(shared)/components/ui/dialog'
import { Input } from '@/app/(shared)/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/(shared)/components/ui/select'
import { Label } from '@/app/(shared)/components/ui/label'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader, Plus } from 'lucide-react'
import { aOrAn } from '@/app/(shared)/utils'
import * as z from 'zod'
import userService from '@/app/(shared)/services/admin/userService'
import useAlertStore from '@/app/(shared)/components/alert/useAlertStore'

const FormSchema = z.object({
  user_type: z.string().min(1, 'Required.'),
  email: z
    .string()
    .min(1, 'Please enter an email address.')
    .email('Invalid email address')
})

export type FormType = z.infer<typeof FormSchema>

function AddUserModal({
  setOpen
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showAlert } = useAlertStore()

  const { handleSubmit, register, control, reset } = useForm<FormType>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    setIsSubmitting(true)
    try {
      await userService.sendRegistrationLink(formData)

      reset()
      setIsModalOpen(false)
      showAlert({
        message: (
          <p>
            <strong>{formData.email}</strong> has been invited as{' '}
            {aOrAn(formData.user_type)} {formData.user_type}
          </p>
        ),
        variant: 'success'
      })
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'An error occurred.')
    } finally {
      setIsSubmitting(false)
      if (setOpen) setOpen(false)
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className='hidden lg:flex' asChild>
        <Button variant='default' className='bg-brandcolora gap-[10px]'>
          <Plus className='w-5 h-5' />
          Add User
        </Button>
      </DialogTrigger>
      <DialogTrigger className='lg:hidden' asChild>
        <button className='w-full flex items-center gap-2 p-3 text-foreground-800 hover:bg-muted'>
          <Plus size={20} />
          <span>Add user</span>
        </button>
      </DialogTrigger>

      <DialogContent className='rounded-[8px] w-[90%] max-w-[600px] gap-6 p-6'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold lg:text-2xl'>
            Add User
          </DialogTitle>
        </DialogHeader>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name' className='text-left'>
              Role
            </Label>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className='w-full text-muted-foreground'>
                    <SelectValue placeholder='Choose Role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value='Learner'
                      className='focus:bg-[#102935] focus:text-white'
                    >
                      Learner
                    </SelectItem>
                    <SelectItem
                      value='Admin'
                      className='focus:bg-[#102935] focus:text-white'
                    >
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
              name='user_type'
              control={control}
            />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
            <Label htmlFor='name' className='text-left'>
              Email
            </Label>
            <Input placeholder='Enter Email' {...register('email')} />
          </div>

          <Button
            className='mt-6 self-end h-fit !px-8 py-3'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className='w-4 h-4 mr-2 animate-spin' /> Sending
              </>
            ) : (
              'Send Invite'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserModal
