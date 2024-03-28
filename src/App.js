import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorsList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorsList[Math.floor(Math.random() * 5)]

    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      className: classValue,
    }

    this.setState(previousState => ({
      passwordsList: [...previousState.passwordsList, newValue],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordsList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      isShow,
      searchInput,
    } = this.state

    console.log(passwordsList)

    let {isTrue} = this.state
    const newList = passwordsList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="adding-password-container">
          <form className="password-container" onSubmit={this.onAddPassword}>
            <h1 className="heading">Add New Password</h1>

            <div className="each-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>

            <div className="each-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>

            <div className="each-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>

            <div className="btn-container">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img1"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img2"
          />
        </div>

        <div className="saved-passwords-container">
          <div className="header-container">
            <div className="count-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{newList.length}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />

          <div className="cb-cont">
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="check-box"
                onChange={this.showPassword}
                id="check"
              />
              <label htmlFor="check" className="show-password">
                Show Passwords
              </label>
            </div>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="list-item" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.className}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}

                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
