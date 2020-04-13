import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import theme from 'theme/palette';
import { useSelector } from 'react-redux';
import { loadingSelector } from 'state/modules/notification';

export default function AppLoading() {
  const loading = useSelector(loadingSelector);

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
      <HashLoader
        color={theme.primary.main}
        loading={loading.open}
        size={50}
      />
    </div>
  )
}
