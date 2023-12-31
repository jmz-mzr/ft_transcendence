import BasicInput from '@/components/app/inputs/BasicInput';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string().required('You must submit a password'),
});

export type ChannelPasswordValues = {
  password: string;
};

interface ChannelPasswordProps {
  initialValues: ChannelPasswordValues;
  onSubmit: (values: ChannelPasswordValues) => void;
}

function ChannelPassword({
  initialValues,
  onSubmit,
}: ChannelPasswordProps): React.ReactElement {
  const { handleSubmit, values, handleChange, isValid, errors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: schema,
  });

  const onClick = (): void => {
    if (isValid) {
      handleSubmit();
    } else {
      toast.error(errors?.password ?? 'Password error');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') onClick();
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-between w-full p-4">
      <BasicInput
        type="password"
        name="channel password"
        className="text-black rounded-full w-1/2 py-2 px-4 outline-0 placeholder:text-center placeholder:antialiased antialiased"
        placeholder="Password"
        value={values.password}
        onChange={handleChange('password')}
        onKeyPress={handleKeyDown}
      />
      <button
        type="submit"
        onClick={onClick}
        className="bg-purple ring-1 ring-white hover:ring-2 hover:ring-offset-1 active:opacity-75 rounded-full text-white font-medium text-sm transition ease-in-out duration-200 px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}

export default ChannelPassword;
