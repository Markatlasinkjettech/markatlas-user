import React from 'react';
import { Target, Laptop, Users, AlertCircle } from 'lucide-react'; // Import available icons
import './About.css';

const Feature = ({ title, description, icon: Icon, color, style }) => (
  <div className={`feature ${color}`} style={style}>
    <div className="content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    {Icon && <div className="icon"><Icon size={40} /></div>}
  </div>
);

const Features = () => (
  <div className="features-container">
    <h2 className="about-title"></h2>
    <div className="features-grid">
      <Feature
        title="Our Mission"
        description="At Markatlas Inkjet, our mission is to help businesses grow by providing innovative IT solutions. We strive to deliver the highest quality products and services that exceed our clients' expectations."
        icon={Target}
        color="yellow"
        style={{ gridArea: 'mission' }}
      />
      <Feature
        title="Our Expertise"
        description="We specialize in web development, software development, and mobile app development. Our team of experts has extensive experience in working with various technologies such as PHP, Python, JavaScript, HTML, CSS, and more."
        icon={Laptop}
        color="blue"
        style={{ gridArea: 'expertise' }}
      />
      <Feature
        title="Our Clients"
        description="We have worked with a diverse range of clients from startups to large corporations. Our clients come from various industries including healthcare, finance, education, and more."
        icon={Users}
        color="purple"
        style={{ gridArea: 'clients' }}
      />
      <Feature
        title="More"
        description="Discover additional information about our services, team, and success stories."
        icon={AlertCircle}
        color="green"
        style={{ gridArea: 'more' }}
      />
    </div>
  </div>
);

export default Features;
