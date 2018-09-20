import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Search extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.searchUser = this.searchUser.bind(this);
        this.hideResults = this.hideResults.bind(this);
        this.showResults = this.showResults.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.hideResults);
        this.results.classList.add('no-before');
        this.results.style.display = "none";
    }

    hideResults(e) {
        if (e.target != this.search) {
            this.results.style.display = "none";
        }
    }

    showResults () {
        this.results.style.display = "block";
    }

    searchUser() {

        if (!this.search.value) {
            this.setState({
                results: []
            });
            this.results.classList.add('no-before');
        }

        if (this.search.value) {
            axios.get("/userSearch/" + this.search.value)
                .then(response => {
                    console.log('data:', response.data);
                    this.setState({
                        results: response.data
                    });
                });
            this.results.classList.remove('no-before');

        }

    }

    selectUser(e) {
        if (e.keyCode == 13 || e.button == 0) {
            this.search.value = '';
            this.setState({ results: null });
        }
    }


    render() {
        return (
            <div
                id="search-wrap"
                onClick={this.hideFriends}
            >
                <div
                    id="search-bar"
                >
                    <input
                        id="search-input"
                        type="text"
                        onKeyDown={this.selectUser}
                        ref={search => (this.search = search)}
                        onChange={this.searchUser}
                        onFocus={this.showResults}
                        placeholder="Search BeerBuddy"
                    />

                    <button id="search-btn">
                        <i className="fas fa-search"></i>
                    </button>

                </div>

                <div
                    id="results-wrap"
                    ref={results => (this.results = results)}>
                    {this.state.results &&
                        this.state.results.map(user => (
                            <Link
                                to={"/user/" + user.id}
                                ref={select => (this.select = select)}
                                onClick={this.selectUser}
                                key={user.id}
                            >
                                <div
                                    className="search-result"
                                >

                                    {!!user.image_url && <img src={user.image_url} className="search-avatar"/>}
                                    {!user.image_url && <img src="/img/default-user.png"
                                        className="search-avatar"/>}
                                    <p>{user.first} {user.last}</p>


                                </div>
                            </Link>
                        ))}
                </div>
            </div>

        );
    }

}
