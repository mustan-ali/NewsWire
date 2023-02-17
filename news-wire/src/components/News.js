import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    useEffect(() => {
        updateNews();
        document.title = `NewsWire - ${props.category[0].toUpperCase() + props.category.slice(1)}`;
        // eslint-disable-next-line
    }, [])

    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    }

    const handlePreviousClick = async () => {
        setPage(page - 1);
        updateNews();
    }

    return (
        <div className="container my-3">
            <h3 className="text-center" id="mainHeading" style={{ fontSize: "35px", fontWeight: 'bold', marginTop: "70px" }}>Top Headlines in {props.category[0].toUpperCase() + props.category.slice(1)}</h3>
            {loading && <Spinner />}
            <div className="row">
                {!loading && articles.map((element) => {
                    return <div className="col-md-3" key={element.url}>
                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                    </div>
                }
                )}
            </div>

            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next</button>
            </div>
        </div >
    )
}

News.defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News