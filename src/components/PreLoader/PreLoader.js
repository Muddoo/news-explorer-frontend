import './PreLoader.css'

function PreLoader() {
    return (
        <div className="preloader">
            <i className="preloader__circle" />
            <p className="preloader__text">Searching for news...</p>
        </div>
    )
}

export default PreLoader