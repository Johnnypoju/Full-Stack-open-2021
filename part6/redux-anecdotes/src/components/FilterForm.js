import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"


const FilterForm = (props) => {
    
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      props.setFilter(event.target.value)

    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {
    setFilter
  }

  const ConnectedFilters = connect(
    null,
    mapDispatchToProps
    )(FilterForm)
  
  export default ConnectedFilters