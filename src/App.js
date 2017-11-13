import React, { Component } from 'react';
import 'normalize.css/normalize.css';
import './App.css';
import AddOptions from './components/AddOption';
import Header from './components/Header';
import Action from './components/Action';
import Options from './components/Options';
import OptionModal from './components/OptionModal';


class App extends Component {
    state = {
        options : [],
        selectedOption : undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => ({options : []}));
    };
    handleClearSelectedOption = () => {
      this.setState(() => ({ selectedOption: undefined }));
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options : prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum]
        this.setState(() => ({
            selectedOption: option
        }));
    };
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({options : prevState.options.concat([option])}));
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({ options  }));
            }
        } catch(e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div className="App">
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                    <div className="widget">
                    <Options
                    handleDeleteOptions={this.handleDeleteOptions}
                    options={this.state.options}
                    handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOptions handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption}  handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        );
    }
}


export default App;
