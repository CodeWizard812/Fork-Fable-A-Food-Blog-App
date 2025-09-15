import React from 'react'

function Container({children}) {
  //will work without () if return and div are on same line only, else use ().
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
}

export default Container