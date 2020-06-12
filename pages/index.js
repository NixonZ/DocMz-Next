import React from "react";
 import { Container, Col, Row } from "react-bootstrap";
import withBasicLayout from '../components/layouts/basic-layout/withBasicLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import  Search  from "../components/assets/search";
import  Checkup  from "../components/assets/checkup_svg";
import  CheckupSm  from "../components/assets/checkupSm";
import  Cross  from "../components/assets/redCross";
import  Home  from "../components/assets/home";
import  Settings  from "../components/assets/settings";
import  Question  from "../components/assets/question";
import  Heart1  from "../components/assets/heart2";
import  Mail  from "../components/assets/mail";
import { useMediaQuery }   from "react-responsive";
import  Farrow  from "../components/assets/filledArrow";
import Buttons from "../components/Button/Buttons";
import Cards from "../components/Card/Cards";
import Link from "next/link"

const LandingPage = () => {
  const isMobile = useMediaQuery({
    query: "(max-device-width: 700px)"
  });
  return (
    <>
     
        <div className="maincontent-wrapper">
          <div className="fixed-div">
            <section className="searchbar-wrapper">
              <div className="searchbar-container">
                <Search />

                <div className="searchbar-input ml-sm-3">
                  <input type="text" placeholder="Search for symptoms.." />
                </div>
              </div>
              <div className="brand-sm-wrapper">
                <div className="brand-sm-icon">
                  <Cross />
                </div>
                <div className="brand-sm-info">Medi</div>
              </div>
              <div className="user-icon">
                <Link href="/login">
                  <FontAwesomeIcon icon={faUser} size="1x" />
                </Link>
               
              </div>
            </section>
            <section className="info-section-container">
              <div className="info-section-info">
                <div className="Primary-info">
                  What Specialist are you looking for ?
                </div>
                <div className="secondary-info">
                  Now its so easy to make an appoinment with doctors
                </div>
                <div className="secondary-info">
                  Just use your peronal account to visit
                </div>
              
                <Buttons name="Find A Doctor" href="/search"/>
              
                
                <div className="cards-wrapper">
                  <Cards procedure={"Cardio"} />
                  <Cards procedure={"Dentistry"} />
                  <Cards procedure={"Pulmonology"} />
                </div>
              </div>
              <div className="info-section-svg">
                {isMobile ? <CheckupSm /> : <Checkup />}
                <div className="seeAll-btn ml-lg-5">
                  <div className="seeAll-info mr-lg-2">See All</div>
                  <div className="seeAll-icon">
                    <Farrow />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="sidenav-sm-container">
          <div style={{ width: "30px", height: "30px" }}>
            <Home />
          </div>
          <div style={{ width: "30px", height: "30px" }}>
            <Settings />
          </div>
          <div style={{ width: "30px", height: "30px" }}>
            <Question />
          </div>
          <div style={{ width: "30px", height: "30px" }}>
            <Heart1 />
          </div>
          <div style={{ width: "30px", height: "30px" }}>
            <Mail />
          </div>
        </div>
     
    </>
  );
};

export default withBasicLayout(LandingPage);
