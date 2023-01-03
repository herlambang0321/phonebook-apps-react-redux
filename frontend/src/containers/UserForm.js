import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCircleCheck, faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { addUser } from "../actions/api";
import { connect } from 'react-redux'

class UserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.add(this.state.name, this.state.phone )
        this.setState({ name: '', phone: '' })
    }

    handleSearch = (event) => {
        event.preventDefault()
        this.props.search({ name: this.state.name, phone: this.state.phone })
    }

    handleCancel = () => {
        if (!this.props.fontlabel) {
            this.props.cancel()
        }
        this.setState({ name: '', phone: '' })
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h6>{this.props.fontlabel || 'Adding Form'}</h6>
                    </div>
                    <form className="m-3" onSubmit={this.props.fontlabel ? this.handleSearch : this.handleSubmit}>
                        <div className="d-flex justify-content me-5">
                            <div className="d-flex align-items-center">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="d-flex col-sm-2">
                                <input type="text" className="form-control" id="name" name="name" placeholder="name"
                                    onChange={this.handleInputChange} value={this.state.name} />
                            </div>
                            <div className="d-flex align-items-center">
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="d-flex col-sm-2">
                                <input type="text" className="form-control" id="phone" name="phone" placeholder="phone"
                                    onChange={this.handleInputChange} value={this.state.phone} />
                            </div>
                            {this.props.submitLabel ?
                                <button type="submit" className="btn btn-info text-white"><FontAwesomeIcon icon={faMagnifyingGlass} />{this.props.submitLabel || ' save'}</button>
                                :
                                <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faCircleCheck} />{this.props.submitLabel || ' save'}</button>
                            }
                            <button className="btn btn-warning text-white" onClick={this.handleCancel}><FontAwesomeIcon icon={this.props.submitLabel ? faRotateLeft : faBan} style={{ transform: 'rotate(90deg' }} />{this.props.submitLabel ? ' reset' : ' cancel'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => ({
    add: (name, phone) => dispatch(addUser(name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(UserForm)