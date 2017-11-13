import React, { Component } from 'react';

export default class AddOptions extends Component {
    state = {
        error : undefined
    }
    handleAddOption = (e) => {
       e.preventDefault();
       const option = e.target.elements.option.value.trim();
       const error = this.props.handleAddOption(option);

       this.setState(() => ({ error }));

       if(!error) {
           e.target.elements.option.value = '';
       }
   };
    render() {
        return(
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption.bind(this)}>
                    <input className="add-option-input" type="text" name="option" />
                    <button className="button">Add option</button>
                </form>
            </div>
        );
    }
}
