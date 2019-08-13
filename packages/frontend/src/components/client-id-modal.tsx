import * as React from "react";
import { Modal, Input } from "semantic-ui-react";
import { consoleBox, input } from "./client-id-modal.css";

export interface ClientIdModalProps {
  repositoryName: string;
  clientId: string;
  trigger?: any;
  open?: boolean;
}

export class ClientIdModal extends React.Component<ClientIdModalProps> {

  inputRef: React.RefObject<Input>;

  constructor(props: ClientIdModalProps) {
    super(props);
    this.inputRef = React.createRef();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    if (!this.inputRef.current) return;
    const rawInput = (this.inputRef.current as any).inputRef as React.RefObject<HTMLInputElement>;
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
      <Modal className="client-id-modal" trigger={trigger} open={open}>
        <Modal.Header>Client ID for "{repositoryName}"</Modal.Header>
        <Modal.Content>
          <Input
            className={input}
            ref={this.inputRef}
            fluid={true}
            value={clientId}
            action={{ color: "teal", labelPosition: "right", icon: "copy", content: "Copy to clipboard", onClick: this.handleOnClick }}
          />
          Then open regconfig.json in your editor and append the following:
          <pre className={consoleBox}>{conf}</pre>
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

