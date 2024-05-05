import React from 'react';

function EducationalResources() {
  return (
    <div>
      <header style={headerStyle}>
        <h1>Educational Tax Resources and Guidance</h1>
        <p>Learn about estate duty tax, gift tax, and inheritance tax in Sri Lanka</p>
      </header>
      <nav style={navStyle}>
        <a href="#estate-duty-tax">Estate Duty Tax </a><br/>
        <a href="#gift-tax">Gift Tax </a><br/>
        <a href="#inheritance-tax">Inheritance Tax</a><br/>
      </nav>
      <main style={mainStyle}>
        <section id="estate-duty-tax" style={sectionStyle}>
          <h2>Estate Duty Tax</h2>
          <p>Information about estate duty tax goes here...</p>
        </section>
        <section id="gift-tax" style={sectionStyle}>
          <h2>Gift Tax</h2>
          <p>Information about gift tax goes here...</p>
        </section>
        <section id="inheritance-tax" style={sectionStyle}>
          <h2>Inheritance Tax</h2>
          <p>Information about inheritance tax goes here...</p>
        </section>
      </main>
      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} Sri Lankan Tax Information</p>
      </footer>
    </div>
  );
}

// Inline styles
const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
};

const navStyle = {
  backgroundColor: '#f4f4f4',
  padding: '10px 0',
  textAlign: 'center',
};

const mainStyle = {
  padding: '20px',
};

const sectionStyle = {
  marginBottom: '20px',
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '20px 0',
};

export default EducationalResources;
