import React from "react";
import Header from "../Header";
import Footer from "../Footer/Footer";
import "./About.css";
import {
  FaShoppingBag,
  FaUserFriends,
  FaHistory,
  FaCheckCircle,
  FaAward,
  FaHandshake,
} from "react-icons/fa";
import {
  MdSecurity,
  MdOutlineLocalShipping,
  MdSupportAgent,
} from "react-icons/md";

export default function About() {
  return (
    <div className="about-page bg-gray-50">
      <Header isLoggedIn={true} />

      <div className="hero-section bg-orange-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About ShopVerse
            </h1>
            <p className="text-xl opacity-90">
              Transforming online shopping with innovation, quality, and
              exceptional customer experience.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="about-content">
            <div className="section-tag bg-orange-100 text-orange-700 rounded-full px-4 py-1 inline-block mb-4 font-medium">
              Our Story
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              The Journey of ShopVerse
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2020, ShopVerse began with a simple mission: to create
              an online shopping experience that truly puts customers first.
              What started as a small e-commerce platform has grown into a
              global marketplace connecting shoppers with quality products from
              around the world.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our founders recognized the gap between what online shoppers
              wanted and what existing platforms offered. By focusing on user
              experience, product quality, and seamless transactions, ShopVerse
              quickly distinguished itself in the competitive e-commerce
              landscape.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we serve millions of customers worldwide, but our core
              values remain unchanged: innovation, integrity, and exceptional
              customer service guide everything we do.
            </p>
          </div>
          <div className="about-image rounded-lg overflow-hidden shadow-xl h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt="ShopVerse Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mission-values bg-white rounded-xl shadow-md p-8 mb-16">
          <div className="text-center mb-10">
            <div className="section-tag bg-orange-100 text-orange-700 rounded-full px-4 py-1 inline-block mb-4 font-medium">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-card text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-all">
              <div className="icon-circle bg-orange-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaCheckCircle className="text-orange-700 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Quality First
              </h3>
              <p className="text-gray-600">
                We rigorously vet all products to ensure they meet our high
                standards for quality and value.
              </p>
            </div>

            <div className="value-card text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-all">
              <div className="icon-circle bg-orange-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaUserFriends className="text-orange-700 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Customer Centered
              </h3>
              <p className="text-gray-600">
                Every decision we make is guided by what's best for our
                customers and their shopping experience.
              </p>
            </div>

            <div className="value-card text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-all">
              <div className="icon-circle bg-orange-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaHandshake className="text-orange-700 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Seller Partnerships
              </h3>
              <p className="text-gray-600">
                We build strong relationships with sellers to create a
                marketplace that benefits everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="why-choose-us mb-16">
          <div className="text-center mb-10">
            <div className="section-tag bg-orange-100 text-orange-700 rounded-full px-4 py-1 inline-block mb-4 font-medium">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              The ShopVerse Advantage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What makes ShopVerse different from other e-commerce platforms?
              Here's why millions of customers choose us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="advantage-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <MdOutlineLocalShipping className="text-orange-700 text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Our optimized logistics network ensures your orders arrive
                quickly and safely.
              </p>
            </div>

            <div className="advantage-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <MdSecurity className="text-orange-700 text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Secure Shopping
              </h3>
              <p className="text-gray-600">
                Shop with confidence knowing your data and transactions are
                protected.
              </p>
            </div>

            <div className="advantage-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <FaAward className="text-orange-700 text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Every product is vetted for quality, with easy returns if you're
                not satisfied.
              </p>
            </div>

            <div className="advantage-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <MdSupportAgent className="text-orange-700 text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our customer service team is always available to assist with any
                questions.
              </p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <div className="text-center mb-10">
            <div className="section-tag bg-orange-100 text-orange-700 rounded-full px-4 py-1 inline-block mb-4 font-medium">
              Our Team
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Meet the People Behind ShopVerse
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts is dedicated to creating the best
              shopping experience for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Alex Johnson
                </h3>
                <p className="text-orange-700 font-medium">
                  Chief Executive Officer
                </p>
              </div>
            </div>

            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
                  alt="CTO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sarah Chen
                </h3>
                <p className="text-orange-700 font-medium">
                  Chief Technology Officer
                </p>
              </div>
            </div>

            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="CMO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Michael Rodriguez
                </h3>
                <p className="text-orange-700 font-medium">
                  Chief Marketing Officer
                </p>
              </div>
            </div>

            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80"
                  alt="COO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Emma Williams
                </h3>
                <p className="text-orange-700 font-medium">
                  Chief Operating Officer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section bg-orange-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience ShopVerse?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers and discover a better way to
            shop online.
          </p>
          <button className="bg-white text-orange-700 px-8 py-3 rounded-md font-semibold hover:bg-orange-50 transition-all shadow-lg">
            Start Shopping Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
