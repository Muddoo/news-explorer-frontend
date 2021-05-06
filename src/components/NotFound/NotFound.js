import './NotFound.css'

function NotFound() {
    return (
        <div className="notfound">
            <div className="notfound__container">
                <div className="notfound__image" />
                <p className="notfound__title">Nothing found</p>
                <p className="notfound__text">Sorry, but nothing matched your search terms.</p>
            </div>
        </div>
    )
}

export default NotFound