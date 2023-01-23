import React from 'react'
import PropTypes from 'prop-types'

const Errors = props => {
  return (
      <ul>
          {
              props?.map(e => (
                  <li>{e}</li>
              ))
          }
      </ul>
  )
}

Errors.propTypes = {}

export default Errors