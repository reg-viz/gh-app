import React, { useState, useEffect } from "react";
import { Message, Segment, Dimmer, Loader } from "semantic-ui-react";

import { store } from "../../store";
import { AppState } from "../../types";

import { Header } from "../header";
import { RepositoryList } from "../repository-list";
import { GotoInstall } from "../goto-install";
import { SearchForm } from "../search-form";

import * as styles from "./app.css";
import { LINKS } from "../../consts";

type AppProps = AppState;

const Content = ({ isLoading, installations, searchText, repositories }: AppProps) => {
  if (isLoading) return null;
  if (installations.length) {
    return (
      <div>
        <h2 className={styles.heading2}>REPOSITORIES INTEGRATED WITH REG-SUIT GITHUB APP</h2>
        <SearchForm searchText={searchText} className={styles.form} />
        <RepositoryList className="repo-list" repositories={repositories} />
        <div className={styles.guide}>
          <p>Can't find your repository?</p>
          <a href={LINKS.configureInstallations}>Configure GitHub app</a>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <GotoInstall />
        <div className={styles.guide}>
          <a href={LINKS.configureInstallations}>Configure</a>
        </div>
      </>
    );
  }
};

export const AppComponent: React.FC<AppProps> = props => {
  const { isLoading } = props;
  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.wrapper}>
        <Dimmer active={isLoading}>
          <Loader />
        </Dimmer>
        <Content {...props} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerBody}>&copy; 2019 reg-viz</p>
        </div>
      </footer>
    </>
  );
};

export const AppContainer: React.FC<{}> = () => {
  const [state, update] = useState<AppState | null>(null);
  useEffect(() => store.state$.subscribe(update).unsubscribe, []);
  if (!state) return null;
  return <AppComponent {...state} />;
};
