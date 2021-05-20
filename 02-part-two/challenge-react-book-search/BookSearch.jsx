import React from "react";

class BookSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      author: "",
      title: "",
      country: "",
      language: "",
      year: "",
    };
  }

  matches = (book) => {
    const inputs = this.state;
    const bookEntries = Object.entries(book);

    const matchedBooks = bookEntries.every(([key, value]) => {
      const inputIsEmpty = !inputs[key];
      if (inputIsEmpty) return true;
      else {
        const valueLowercased = value.toString().toLowerCase();
        const inputLowercased = inputs[key].trim().toLowerCase();
        return valueLowercased.includes(inputLowercased);
      }
    });

    return matchedBooks;
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState((state) => ({ [e.target.name]: value }));
  };

  render() {
    return (
      <div className="book-search-container">
        <div className="search-box">
          <label>
            Author
            <input
              autoComplete="off"
              value={this.state["author"]}
              className="author"
              name="author"
              onChange={(e) => this.handleChange(e, "author")}
            />
          </label>

          <label>
            Title
            <input
              autoComplete="off"
              value={this.state["title"]}
              className="title"
              name="title"
              onChange={(e) => this.handleChange(e, "title")}
            />
          </label>

          <label>
            Country
            <input
              autoComplete="off"
              value={this.state["country"]}
              className="country"
              name="country"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Language
            <input
              autoComplete="off"
              value={this.state["language"]}
              className="language"
              name="language"
              onChange={(e) => this.handleChange(e, "language")}
            />
          </label>

          <label>
            Year
            <input
              autoComplete="off"
              value={this.state["year"]}
              className="year"
              name="year"
              onChange={(e) => this.handleChange(e, "year")}
            />
          </label>
        </div>
        <div className="books">
          {this.props.books
            .filter((book) => this.matches(book))
            .map((book, i) => (
              <div key={book.title + i} className="book">
                {Object.entries(book).map(([key, v]) => (
                  <div key={key} className="book-detail-row">
                    <span className="book-detail-key">{key}</span>
                    <span className="book-detail-val">{v}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default BookSearch;
