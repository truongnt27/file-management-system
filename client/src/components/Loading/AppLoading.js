import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import theme from 'theme/palette';
import { Dialog } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { loadingSelector } from 'state/modules/notification';

export default function AppLoading() {
  const loading = useSelector(loadingSelector);
  console.log('loading.open', loading.open);

  return (
    <div style={{ position: "fixed", top: "50%", left: "50%" }}>
      <HashLoader
        loading={true}
        color={theme.primary.main}
        size={50}
      />
    </div>
  )
}
