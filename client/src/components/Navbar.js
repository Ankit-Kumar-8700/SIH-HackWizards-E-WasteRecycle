import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import logo from "../img/logo.png";


//Category must be equal then only will get matche name can be anything

// Make user object in store make it global now instead of using use effect in many places just use the user from store so if it is null then no problem will be there


const Navbarr = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  // const [showmodal, setShowModal] = useState(false);
  const { totalQty,isAuthenticated } = useSelector((state) => state.user);


  // const [focused, setFocused] = useState(false)
  const [user,setUser] = useState(null);

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
    console.log('called');
 },[isAuthenticated]);

  useEffect(() => {
    const scroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  const openCart = (e,elem) => {
    e.preventDefault();
    const el = document.querySelector(elem);
    el?.classList.add("showCart");
    el?.classList.remove("hidecart");
  };


  return (
    <Navbar className={scrolled ? "scrolled" : "blurNav"} expand="lg">
      <Container>
        <Navbar.Brand href="/" className="flex gap-2" >
        <img src={logo} alt="" height={36} width={36}/>
            <p className="text-white my-auto">Hack Wizards</p> 
        </Navbar.Brand>
        <Navbar.Toggle className="hamburger" aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon text-white"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => setActiveLink("Home")}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={
                activeLink === "about" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => setActiveLink("about")}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={
                activeLink === "contact" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => setActiveLink("contact")}
            >
              Contact
            </Link>
          </Nav>
        </Navbar.Collapse>
        <div className="navbar-text lg:w-auto relative">
          <div className="social-icons justify-between text-black">

            {user ? (
              user.imageUrl ? <Avatar  sx={{ backgroundColor: "#6c7ae0", cursor:"pointer" }}  onClick={(e) => openCart(e,'.user')} src={user.imageUrl} />  :
              <Avatar  sx={{ backgroundColor: "#6c7ae0", cursor:"pointer" }}  onClick={(e) => openCart(e,'.user')} > {user?.name.slice(0,1)} </Avatar>
              )
    
             : (
              <PersonIcon
                className="cursor-pointer"
                style={{ fontSize: 28 , color:'white'}}
                onClick={(e) => openCart(e,'.user')}
              />
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
