import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl } from 'reactstrap';
import { connect } from 'react-redux';

import { mutCreator } from 'components/state-helpers';
import FileChooser from 'components/file-chooser';

const placeholder = `{
  "alias": "some alias",
  "publickey": "fakeNaClpublickey",
  "uid": "AUniqueIdentifier"
}`;

class ImportModal extends Component {
  static propTypes = {
    importIdentity: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { showModal: false, identity: null };
    this.mut = mutCreator(this);

    this.close = this.didClose.bind(this);
    this.open = this.didOpen.bind(this);
    this.didClickImport = this.didClickImport.bind(this);
    this.didSelectFile = this.didSelectFile.bind(this);
  }

  didClose() {
    this.setState({ showModal: false });
  }

  didOpen() {
    this.setState({ showModal: true });
  }

  didClickImport() {
    this.props.importIdentity(this.state.identity);
    this.close();
  }

  didSelectFile(fileString) {
    const object = JSON.parse(fileString);
    const prettyJson = JSON.stringify(object, null, 2);

    this.setState({ identity: prettyJson });
  }

  // TODO: add validation
  render() {
    const { showModal, identity } = this.state;
    const { close, open, didClickImport, didSelectFile } = this;

    const mut = this.mut;

    return (
      <li>
        <a
          role='button'
          onClick={open}>
          Import Identity
        </a>

        <Modal show={showModal} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Import Identity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Paste Identity File Here</h4>

            <FormGroup controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                rows={5}
                onChange={mut('identity')}
                value={identity || ''}
                placeholder={placeholder} />
            </FormGroup>

            <p>
              This should contain the keys&nbsp;
              <em><strong>alias</strong></em>,&nbsp;
              <em><strong>publickey</strong></em>, and&nbsp;
              <em><strong>uid</strong></em>
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
            <FileChooser
              onChange={didSelectFile}
              buttonClasses={'btn btn-default'}
              buttonText={'Select Identity File'} />
            <Button
              className='btn-success'
              onClick={didClickImport}>Import</Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  importIdentity(){}
});


export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);
