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
      books: [],
      filteredBooks: []
    };
  }
    
    
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState((state) => ({ [e.target.name]: value }), () => {
        this.filterBooks();
    });
    
  };
    
  filterBooks = () => {
    const filteredBooks = this.state.books.filter((eachBook) => {
        const bookEntries = Object.entries(eachBook);
        
        const isMatch = bookEntries.every((element) => {
            const [key, value] = element;
            const input = this.state[key];
            const inputIsEmpty = input === "" || input === undefined;
            
            if (inputIsEmpty) return true;
            else {
                const valueStr = value.toString().toLowerCase();
                const inputStr = input.trim().toLowerCase();
                return valueStr.includes(inputStr);
            }
            
        })
        
        return isMatch;
    })
    
    this.setState({ filteredBooks });
  }
    
    
  componentDidMount() {
    const { books } = this.props;
    this.setState({  books: books , filteredBooks: books })
  }
    
    
  render() {
    const { author, title, country, language, year, filteredBooks } = this.state;
    return (
      <>
        <div>
          <label> Author
            <input
              value={author}
              className="author"
              name="author"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Title
            <input
              value={title}
              className="title"
              name="title"
              onChange={this.handleChange}
            />
          </label>

          <label> Country
            <input
              value={country}
              className="country"
              name="country"
              onChange={this.handleChange}
            />
          </label>

          <label> Language
            <input
              value={language}
              className="language"
              name="language"
              onChange={this.handleChange}
            />
          </label>

          <label> Year
            <input
              value={year}
              className="year"
              name="year"
              onChange={this.handleChange}
            />
          </label>
        </div>
            
        {filteredBooks.map((book) => (
           <div className="book">
              <p>author: {book.author}</p>
              <p>country: {book.country}</p>
              <p>language: {book.language}</p>
              <p>pages: {book.pages}</p>
              <p>title: {book.title}</p>  
              <p>year: {book.year}</p>                    
           </div>
        ))}
            
      </>
    );
  }
}

export default BookSearch;
