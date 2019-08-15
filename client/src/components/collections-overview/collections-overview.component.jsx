import React from 'react';

import SHOP_DATA from '../../context/shop/shop.data'

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = () => {
  return (
    <div className='collections-overview'>
      {SHOP_DATA.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
)};


export default CollectionsOverview;
