import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';

class App extends React.Component {
  state = initialData;

  render() {
    return this.state.operations.map(operation => {
      const opTitle = operation.title;
      const opDetails = operation.details;

      return (
        <>
        <h3>{opTitle}</h3>
        <p>{opDetails}</p>
        </>
      )
    })
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
