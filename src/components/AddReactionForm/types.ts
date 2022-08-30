interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

export interface FormValue {
  url?: string;
  original?: Video;
  reaction?: Video;
}

export interface PageProps {
  formValue: FormValue;
  onSubmit: (formValue: FormValue) => void;
}
