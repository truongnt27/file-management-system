import React from 'react'
import PropTypes from 'prop-types'
import { FilesTable } from './components'

function FilesManagement(props) {
  const files = [];
  return (
    <div>
      <FilesTable
        files={files}
      />
    </div>
  )
}

FilesManagement.propTypes = {

}

export default FilesManagement

