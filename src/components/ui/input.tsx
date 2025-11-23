interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Input = ({ id, label, type = 'text', value, onChange, error }: InputProps) => (
  <div className='_form_input _mar_b14'>
    <label htmlFor={id} className='_form_label _mar_b8'>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className='form-control _form_input_field'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <small className='text-danger'>{error}</small>}
  </div>
);

export default Input;
