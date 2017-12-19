import PropTypes from 'prop-types';
import React from 'react';

// origin
// https://raw.githubusercontent.com/artursgirons/node-react-pdfmake/master/component/index.js
class CreatePdf extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    definition: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
  }

  state = {
    loaded: false,
    executing: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loaded && this.props.definition !== nextProps.definition) {
      const context = this.refsIframe.contentWindow.createpdf;
      context.initialize(JSON.stringify(nextProps.definition), this.props.name);
    }
  }

  onLoadHandler = () => {
    this.setState({ loaded: true }, () => {
      const context = this.refsIframe.contentWindow.createpdf;
      context.initialize(JSON.stringify(this.props.definition), this.props.name);
    });
  }

  getDataUrl = cb => {
    this.executeCommands('getDataUrl', cb);
  }

  getBlob = cb => {
    this.executeCommands('getBlob', cb);
  }

  executeCommands(cmdName, cb) {
    if (this.state.loaded && !this.state.executing) {
      const context = this.refsIframe.contentWindow.createpdf;

      if (typeof context[cmdName] === 'function') {
        this.setState({ executing: true }, () => {
          context[cmdName](cb);
          this.setState({ executing: false });
        });
      }
    }
  }

  open = () => {
    this.executeCommands('open');
  }

  print() {
    this.executeCommands('print');
  }

  save = () => {
    this.executeCommands('save');
  }

  render() {
    return (
      <div style={{ border: 'none', height: 1 }}>
        <iframe
          ref={r => {
            this.refsIframe = r;
          }}
          title="create-pdf"
          src={this.props.path}
          onLoad={this.onLoadHandler}
          style={{ border: 'none', height: 1 }}
        />
      </div>
    );
  }
}

export default CreatePdf;
