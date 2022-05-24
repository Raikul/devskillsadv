import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Form from "./Form";
import List from "./List";
import Footer from "./Footer";

import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [list, setList] = useState([]);
  const [errorList, setErrorList] = useState("");
  const [count, setCount] = useState(120);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (password) {
      getTable();
    }
  }, [password]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1);
      if (count <= 0) {
        getTable();
        resetTimer();
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  const resetTimer = () => {
    setCount(120);
  };

  const getToken = async () => {
    if (debugMode) {
      console.log("Getting Token");
    }

    try {
      const test = await axios.post("http://localhost:8081/auth", {
        username: "sarah",
        password: "connor",
      });
      setPassword(test.data["token"]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTable = async () => {
    const { data } = await axios.get("http://localhost:8081/api/members", {
      headers: {
        Authorization: "Bearer " + password,
      },
    });
    setList(data);
  };

  const addMember = (member) => {
    if (debugMode) {
      console.log("Adding Member" + member);
    }

    setList([...list, member]);
  };

  const renderErrorList = (errors) => {
    try {
      setErrorList("Insertion Error: " + errors.response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const alternateDebugMode = () => {
    setDebugMode(!debugMode);
  };

  return (
    <div className="ui-container">
      <Header alternateDebugMode={alternateDebugMode} />
      <main className="main-container">
        <div className={!debugMode ? "invisible" : ""}>
          <button onClick={getToken}>Login</button>
          {count} <button onClick={() => resetTimer()}>Reset Timer</button>
        </div>

        <div className="api-container">
          <Form
            password={password}
            addMember={addMember}
            renderErrorList={renderErrorList}
            resetTimer={resetTimer}
            debugMode={debugMode}
          />
          <List list={list} />
        </div>
        <div className="errors">
          {errorList}
          <button
            className={errorList ? "" : "invisible"}
            onClick={() => setErrorList("")}
          >
            Ok
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
