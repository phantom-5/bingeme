import '../App.css'
const Loading = () => {
    return (
        <div className="loading">
            <span className='badge-pill badge-dark' style={{'font-size':'1rem'}}>Fetching at {window.navigator.connection.downlink}&nbsp;Mbps...</span>
        </div>
    )
}

export default Loading