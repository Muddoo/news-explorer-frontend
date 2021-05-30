import './PreLoader.css'

function PreLoader({ spinnerText }) {
    return (
        <div className="preloader">
            <i className="preloader__circle" />
            <p className="preloader__text">{ spinnerText || 'Searching for news...' }</p>
        </div>
    )
}

export default PreLoader