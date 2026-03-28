export type FormComponentProps = {
  editId?: string | null;
};

type FormComponentEmits = ['close'];

export type FormComponent = Component<
  FormComponentProps,
  any,
  any,
  any,
  any,
  FormComponentEmits
>;
