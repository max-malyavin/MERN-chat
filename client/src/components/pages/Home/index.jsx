import React, { memo, useEffect, useRef } from "react";
import Dialogs from "../../Dialogs";
import "./Home.scss";
import ContentMain from "../../ContentMain";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Overview from "../../Overview/Overview";
import DialogsBar from "../../Dialogs/DialogsBar/DialogsBar";

const Home = memo(() => {
  return (
    <section className="home">
      <Header />
      <div className="main__inner">
        <div className="container">
          <main className="main">
            <Dialogs>
              <DialogsBar />
            </Dialogs>
            <div className="content__inner">
              <ContentMain />
            </div>
            <div className="overview">
              <Overview />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </section>
  );
});

export default Home;
