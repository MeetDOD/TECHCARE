import React from "react";
import logo from "../assets/Hero/logo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    id: "github",
    url: "https://github.com/MeetDOD/code_o_festa_2024",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/in/meetdodiya",
    icon: FaLinkedin,
  },
];

const quickLinks = [
  { id: "aboutus", label: "Home", hash: "/" },
  { id: "domains", label: "Doctors", hash: "/doctors" },
  { id: "guidelines", label: "About", hash: "/about" },
  { id: "timelines", label: "Contact", hash: "/contact" },
];

const Footer = () => {
  return (
    <footer className="px-8 pt-10 pb-5 w-full font-montserrat mt-20 text-white bg-gray-950">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center md:items-start p-4">
          <img src={logo} alt="Logo" className="w-40 mb-4" />
          <h2 className="font-bold text-xl mb-4 ">For Source Code</h2>
          <ul className="flex list-none p-0 gap-2">
            {socialLinks.map((link) => (
              <li
                key={link.id}
                className="hover:-translate-y-1 transition-transform duration-300 hover:text-primary"
              >
                <a href={link.url} target="_blank" className="text-2xl">
                  <link.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h2 className="font-bold text-primary text-3xl mb-4">Quick Links</h2>
          <ul className="list-none p-0">
            {quickLinks.map((link) => (
              <li key={link.id} className="mb-2.5">
                <Link
                  to={link.hash}
                  smooth
                  className="text-[1rem] font-normal relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-0 before:h-[2px] before:bg-primary hover:before:w-full before:transition-all before:duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h2 className="text-primary font-bold text-3xl mb-4">
            About TECHCARE
          </h2>
          <p className="text-[1rem] font-normal">
            Say Hello to India’s top doctors via video consultation, get digital
            prescriptions, order medicines, book doctor appointments & lab
            tests, find doctors near you, get health packages, ask a free health
            question to doctors{" "}
          </p>
        </div>
      </div>

      <div className="text-center text-sm font-semibold mt-7 pt-4 mb-2.5">
        Made with 💓 by <span className="font-bold">Brainstromers</span>,
        Copyright © 2024 All rights reserved by Meet, Kashish and Ramesh
      </div>
    </footer>
  );
};

export default Footer;
