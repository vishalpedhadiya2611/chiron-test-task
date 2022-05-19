import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/sidebar.css";

interface IProps {}
const SideBar: React.FunctionComponent<IProps> = (props) => {
  return (
    <div
      id="sidebar-main"
      className="sidebar sidebar-default sidebar-separate sidebar-fixed"
    >
      <div className="sidebar-content">
        <div className="sidebar-category sidebar-default">
          <div className="category-content">
            <ul id="fruits-nav" className="nav flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  <i className="fa fa-home" aria-hidden="true"></i>
                  Overview
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-sitemap" aria-hidden="true"></i>
                  Organizations
                </a>
              </li>
              <li className="nav-item">
                <Accordion flush>
                  <Accordion.Item eventKey="0" className="bg-theme">
                    <Accordion.Header>
                    <i className="fa fa-group mr-3" aria-hidden="true"></i>Group</Accordion.Header>
                    <Accordion.Body className="group-wrap">
                      <a href="#" className="nav-link">
                        <i className="fa fa-flask" aria-hidden="true"></i>
                        Group 1
                      </a>
                      <a href="#" className="nav-link">
                        <i className="fa fa-flask" aria-hidden="true"></i>
                        Group 2
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-flask" aria-hidden="true"></i>
                  Labs
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  Tests
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor">
                  <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  Doctor
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  User
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                  Exports
                </a>
              </li>
            </ul>
          </div>
          <div className="category-content">
            <ul id="fruits-nav" className="nav flex-column logout-wrap">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                  Support
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
