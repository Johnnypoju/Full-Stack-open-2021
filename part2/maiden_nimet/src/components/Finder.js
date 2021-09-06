import React from 'react'


const Finder = ({finder, handleFinder}) => {
    
    return (
        <div>
            find countries <input 
          value={finder} 
          onChange={handleFinder}
          />
        </div>
    )

}

export default Finder