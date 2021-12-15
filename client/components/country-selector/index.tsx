import type { FunctionComponent, RefObject, ChangeEvent } from 'react';
import { useState } from 'react';

import Country from '../../common/interfaces/country';
import styles from './styles.module.scss';

interface Props {
  options: Country[];
  hasSubmitted: boolean;
  reference: RefObject<HTMLSelectElement>;
}

const CountrySelector: FunctionComponent<Props> = ({ options, hasSubmitted, reference }) => {
  const [color, setColor] = useState<string>('');
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const classNames = [styles.select, hasSubmitted && !isChosen ? styles.invalid : ''];
  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'DEFAULT') setIsChosen(true);
    if (color) return;
    else setColor('#000000');
  };
  return (
    <>
      <label htmlFor="country" className={styles.label}>
        Country
      </label>
      <select
        className={classNames.join(' ')}
        id="country"
        defaultValue={'DEFAULT'}
        ref={reference}
        style={{ color }}
        onChange={changeHandler}
      >
        <option className={styles.default} value="DEFAULT" disabled>
          Select country
        </option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {hasSubmitted && !isChosen && (
        <p className={styles['error-message']}>This field cannot be empty.</p>
      )}
    </>
  );
};

export default CountrySelector;
