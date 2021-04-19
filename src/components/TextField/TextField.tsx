import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { TextInput } from 'UI';

type Props = FieldRenderProps<string, HTMLInputElement>;

function TextField({ input, meta, ...rest }: Props) {
  const error = meta.touched && meta.error;

  return <TextInput {...{ ...input, ...rest }} error={error} />;
}

export default TextField;
