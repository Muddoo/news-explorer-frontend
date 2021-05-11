import './NotFound.css'

function NotFound({ err }) {
    return (
        <div className="notfound">
            <div className="notfound__container">
                <div className="notfound__image" />
                <p className="notfound__title">Nothing found</p>
                <p className="notfound__text">
                    {err ? 
                        'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.' :
                        'Sorry, but nothing matched your search terms.'}
                </p>
            </div>
        </div>
    )
}

export default NotFound