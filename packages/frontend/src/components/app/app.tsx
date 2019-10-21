import * as React from "react";
import { Message, Segment, Dimmer, Loader } from "semantic-ui-react";
import { SearchForm } from "../search-form";
import { store } from "../../store";
import { AppState } from "../../types";
import * as styles from "./app.css";
import { RepositoryList } from "../repository-list";
import { GotoInstall } from "../goto-install";
import { Logout } from "../logout";

export type AppProps = AppState;

function renderContents({ isLoading, installations, searchText, repositories }: AppProps) {
  if (isLoading) return null;
  if (installations.length) {
    return (
      <div>
        <h2 className={styles.heading2}>Repositories integrated with reg-suit GitHub app</h2>
        <SearchForm searchText={searchText} style={{ marginTop: 30 }} />
        <RepositoryList className="repo-list" repositories={repositories} style={{ marginTop: 30 }} />
      </div>
    );
  } else {
    return (
      <GotoInstall />
    );
  }
}

export function AppComponent(props: AppProps) {
  const { isLoading } = props;
    return (
      <>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <img src="assets/logo.png" alt="reg-suit" />
          </div>
        </header>
        <div className={styles.wrapper}>
          <Dimmer active={isLoading}>
            <Loader />
          </Dimmer>
          {renderContents(props)}
          <Logout />
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p className={styles.footerBody}>&copy; 2017 reg-viz</p>
          </div>
        </footer>
      </>
    );
}

export class AppContainer extends React.Component<{}, AppState> {

  componentDidMount() {
    if (!store.state$) return;
    store.state$.subscribe(state => {
      this.setState(state);
    });
  }

  render() {
    if (this.state) {
      return <AppComponent {...this.state } />;
    } else {
      return null;
    }
  }
}
