import React from 'react'

function Logo({width = '100px'}) {
  return (
    <img src='/logo.png' alt='food fables logo' width={width} />
  )
}

export default Logo