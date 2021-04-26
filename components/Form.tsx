import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Variables } from '@interfaces/github'

export type FormValues = Pick<Variables, 'query'> & { limit: 12 | 24 | 48 }

interface Props {
  onChange: (values: FormValues) => void
}

export const Form: React.FC<Props> = ({ onChange }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    trigger,
  } = useForm<FormValues>({
    defaultValues: { limit: 12, query: '' },
  })

  const onSubmit = handleSubmit(values => onChange(values))

  return (
    <form
      className="flex flex-col flex-initial items-center justify-center space-y-4 w-full md:flex-row md:space-x-6 md:space-y-0 lg:space-x-10"
      onSubmit={onSubmit}
    >
      <div className="flex">
        <input
          className={`bg-secondary h-12 px-6 py-2 rounded-bl-3xl rounded-tl-3xl shadow-md text-lg w-64 focus:outline-none ${
            !!errors.query
              ? 'border-2 border-red-500 placeholder-red-500'
              : 'border border-primary placeholder-current'
          }`}
          placeholder="Query devs on GitHub"
          type="text"
          {...register('query', {
            minLength: {
              message: '3 character minimum.',
              value: 3,
            },
            required: 'You must submit a query value.',
          })}
        />
        <select
          className="appearance-none bg-secondary border border-l-0 border-primary h-12 px-6 py-2 rounded-br-3xl rounded-tr-3xl shadow-md text-lg focus:outline-none"
          {...register('limit', { valueAsNumber: true })}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
        </select>
      </div>
      <div className="flex">
        <button
          className="bg-secondary border border-primary px-10 py-2 rounded-bl-3xl rounded-tl-3xl shadow-md text-lg uppercase disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          disabled={!!errors.query}
          onClick={async () => {
            // Not a big fan of this API for triggering field-level validation
            const result = await trigger('query')
            // Basically we need to inspect if the validation passed or not
            // and then not only fire the toast but clear but trigger a reset as well.
            if (!result) {
              toast.error(errors.query!.message!)
              reset()
              return
            }
          }}
          type="submit"
        >
          Query
        </button>
        <button
          className="bg-secondary border border-l-0 border-primary px-10 py-2 rounded-br-3xl rounded-tr-3xl shadow-md text-lg uppercase focus:outline-none"
          onClick={() => reset()}
          type="reset"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
