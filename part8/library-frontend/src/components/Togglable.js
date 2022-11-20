

const Togglable = ({ token, setPage, logout}) => {

    if(token){
        return(
            <p>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={logout}>logout</button>
            </p>
        )
    }

 return(
    <p>
        
        <button onClick={() => setPage('login')}>login</button>
        
    </p>
 )
}

export default Togglable