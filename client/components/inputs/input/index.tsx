import type { FunctionComponent } from 'react';
import { useState, RefObject } from 'react';

import styles from './styles.module.scss';

interface Props {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  reference: RefObject<HTMLInputElement>;
  hasSubmitted: boolean;
  error?: boolean;
  errorMessage?: string;
  onInput?: () => boolean;
  onChange?: () => Promise<boolean | undefined>;
}

const Input: FunctionComponent<Props> = props => {
  const {
    id,
    type,
    label,
    placeholder,
    reference,
    hasSubmitted,
    error,
    errorMessage,
    onInput,
    onChange,
  } = props;
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const classNames = [styles.input, isEmpty || !isValid ? styles['invalid-input'] : ''];

  const checkIsValid = async () => {
    if (!reference.current?.value) setIsEmpty(true);
    else setIsEmpty(false);
    if (onChange) (await onChange()) ? setIsValid(true) : setIsValid(false);
    if (onInput) (onInput()) ? setIsValid(true) : setIsValid(false);
  };

  const blurHandler = async () => {
    if (!isTouched) setIsTouched(true);
    await checkIsValid();
  };

  const changeHandler = async () => {
    if (!isTouched) return;
    await checkIsValid();
  };

  const checkIsEmpty = () => {
    if (!isEmpty && !reference.current?.value) {
      setIsEmpty(true);
      setIsTouched(true);
    }
  };

  if (hasSubmitted) checkIsEmpty();
  if ((error || errorMessage) && isValid) setIsValid(false);
  console.log(errorMessage)

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={classNames.join(' ')}
        placeholder={placeholder}
        ref={reference}
        onBlur={blurHandler}
        onChange={changeHandler}
        onInput={onInput}
        autoComplete="off"
      />
      {isEmpty && <p className={styles['error-message']}>This field cannot be empty.</p>}
      {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
    </>
  );
};

export default Input;
