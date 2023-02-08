import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [];

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=6c69bfc707a8485e943e32941a2541ec&pageSize=12";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=6c69bfc707a8485e943e32941a2541ec&page=${this.state.page + 1}&pageSize=12`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=6c69bfc707a8485e943e32941a2541ec&page=${this.state.page - 1}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h3>Top Headlines</h3>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    }
                    )}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div>
            </div>
        )
    }
}

export default News