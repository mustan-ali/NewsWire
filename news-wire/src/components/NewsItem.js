import React from 'react'
import imageNotAvailable from './imageNotAvailable.jpg'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
        <div className="my-3">
            <div className="card">
                <img src={imageUrl ? imageUrl : imageNotAvailable} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
                    <a href={newsUrl} className="btn btn-smc btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem