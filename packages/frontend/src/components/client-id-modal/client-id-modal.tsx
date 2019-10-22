import React, { createRef} from "react";
import { Modal, Icon } from "semantic-ui-react";
import * as styles from "./client-id-modal.css";

type Props = {
  repositoryName: string;
  clientId: string;
  trigger?: (props: { open: () => any }) => React.ComponentElement<any, any>;
  open?: boolean;
};

type State = {
  isOpen: boolean;
}

export class ClientIdModal extends React.Component<Props, State> {

  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { isOpen: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  trigger() {
    if (!this.props.trigger) return null;
    return this.props.trigger({ open: this.handleOpen });
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false} );
  }

  handleCopy() {
    if (!this.inputRef.current) return;
    const rawInput = this.inputRef;
    if (!rawInput.current) return;
    rawInput.current.focus();
    rawInput.current.selectionStart = 0;
    rawInput.current.selectionEnd = this.props.clientId.length;
    document.execCommand("copy");
    rawInput.current.blur();
  }

  render() {
    const { repositoryName, clientId, trigger, open } = this.props;
    const conf = JSON.stringify({
      "plugins": {
        "reg-notify-github-plugin": {
          "clientId": clientId
        }
      }
    }, null, 2);
    return (
      <Modal className={styles.clientIdModal} trigger={this.trigger()} onClose={this.handleClose} open={this.state.isOpen || !!open}>
        <Modal.Header className={styles.modalHeader}>
          <h3>
            Client ID for "{repositoryName}"
          </h3>
          <button className={styles.closeButton} onClick={this.handleClose}>
            <Icon name="remove" size="large" />
          </button>
          <div className={styles.clientId}>
            <input
              ref={this.inputRef}
              defaultValue={clientId}
            />
            <button onClick={this.handleCopy}>Copy to clipboard</button>
          </div>
        </Modal.Header>
        <Modal.Content className={styles.modalContent}>
          Then open regconfig.json in your editor and append the following:
          <pre className={styles.consoleBox}>{conf}</pre>
          Learn more? Read <a
            className="text-link"
            target="_blank"
            href="https://github.com/reg-viz/reg-suit/tree/master/packages/reg-notify-github-plugin"
          >reg-notify-github-plugin doc</a>.
        </Modal.Content>
      </Modal>
    );
  }
}

