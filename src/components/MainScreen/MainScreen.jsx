import { Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import ContactList from "../Contacts/ContactList";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import classes from "./MainScreen.module.scss";

const MainScreen = (props) => {
  const { contacts, setContacts } = props;
  const { Content, Sider } = Layout;
  const [title, setTitle] = useState("Profile");
  const [btnText, setBtnText] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={["profile"]} mode="inline">
          <Menu.Item key="profile" onClick={() => setTitle("Profile")}>
            Profile
            <Link to="/profile" />
          </Menu.Item>
          <Menu.Item
            disabled={!btnText}
            key="contacts"
            onClick={() => setTitle("Contacts")}
          >
            Contacts
            <Link to="/contacts" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className={classes.header}
          title={title}
          btnText={btnText}
          setBtnText={setBtnText}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/contacts"
              element={
                <ContactList contacts={contacts} setContacts={setContacts} />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainScreen;
