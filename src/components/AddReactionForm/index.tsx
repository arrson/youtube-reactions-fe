import * as React from 'react';
import { useState } from 'react';
import { FormValue } from './types';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

import { createReaction } from 'services/api';

const pages = [Page1, Page2];

interface FormProps {
  onSubmit: (formValue: FormValue) => void;
}

const AddReactionForm = ({ onSubmit }: FormProps) => {
  const [formValue, setFormValue] = useState({});
  const [page, setPage] = useState(0);

  const handleSubmit = async (val: FormValue) => {
    const res = await createReaction(val.original.id, val.reaction.id);
    onSubmit(res);
  };

  const Page = pages[page];
  return (
    <Page
      formValue={formValue}
      onSubmit={(newValue: FormValue) => {
        const newPage = page + 1;

        if (newPage >= pages.length) {
          handleSubmit(newValue);
        } else {
          setFormValue(newValue);
          setPage(newPage);
        }
      }}
    />
  );
};

export default AddReactionForm;
