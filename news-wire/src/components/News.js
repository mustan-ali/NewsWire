import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 6,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    articles = [];

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `NewsWire - ${this.props.category[0].toUpperCase() + this.props.category.slice(1)}`;
       
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c69bfc707a8485e943e32941a2541ec&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({ loading: true })
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false
        })

    }

    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3">
                <h3 className="text-center" id="mainHeading" style={{ fontSize: "35px", fontWeight: 'bold' }}>Top Headlines in {this.props.category[0].toUpperCase() + this.props.category.slice(1)}</h3>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    }
                    )}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div>
            </div >
        )
    }
}

export default News