import React from 'react';
import { INITIAL_STATE } from '../../context/directory/directory';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = () => {
  const { sections } = INITIAL_STATE;
  return (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
)};


export default Directory;
