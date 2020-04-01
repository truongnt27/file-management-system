import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import theme from 'theme/palette';

export default function AppLoading() {
  return (
    <HashLoader
      color={theme.primary.main}
    />
  )
}
