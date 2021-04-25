import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Variables } from '@interfaces/github'

type FormValues = Pick<Variables, 'query'>

interface Props {
  onChange: (values: FormValues) => void
}

export const Form: React.FC<Props> = ({ onChange }) => {
  const {
    formState: { errors, isSubmitted, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>()

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ query: '' })
    }

    if (isSubmitted) {
      reset(
        { query: '' },
        {
          keepDirty: false,
          keepErrors: true,
          keepTouched: false,
        }
      )
    }
  }, [isSubmitted, isSubmitSuccessful, reset])

  const onSubmit = handleSubmit(values => onChange(values))

  return (
    <form
      className="flex flex-col items-center justify-center space-y-4 w-full md:flex-row md:space-x-4 md:space-y-0"
      onSubmit={onSubmit}
    >
      <input
        className={`h-12 px-6 py-2 rounded-3xl text-lg w-80 ${
          !!errors.query
            ? 'border-2 border-red-500 placeholder-red-500'
            : 'border border-indigo-800 placeholder-current'
        }`}
        placeholder={
          !!errors.query ? errors.query.message : 'Search developers on GitHub'
        }
        type="text"
        {...register('query', {
          minLength: {
            message: 'Must be at least 3 characters.',
            value: 3,
          },
          required: 'You must submit a query value.',
        })}
      />
      <div className="flex">
        <button
          className={`bg-white border border-indigo-800 font-semibold px-10 py-2 rounded-bl-3xl rounded-tl-3xl shadow-md text-lg uppercase ${
            !!errors.query ? 'cursor-not-allowed opacity-75' : ''
          }`}
          disabled={!!errors.query}
          type="submit"
        >
          Query
        </button>
        <button
          className="bg-white border border-l-0 border-indigo-800 font-semibold px-10 py-2 rounded-br-3xl rounded-tr-3xl shadow-md text-lg uppercase"
          onClick={() => reset()}
          type="reset"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
