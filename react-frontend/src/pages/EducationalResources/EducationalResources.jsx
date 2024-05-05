import React from "react";

function EducationalResources() {
  return (
    <div>
      <header style={headerStyle}>
        <h1>Educational Tax Resources and Guidance</h1>
        <p>
          Learn about estate duty tax, gift tax, and inheritance tax in Sri
          Lanka
        </p>
      </header>
      <nav style={navStyle}>
        <a href="#estate-duty-tax">Estate Duty Tax </a>
        <br />
        <a href="#gift-tax">Gift Tax </a>
        <br />
        <a href="#inheritance-tax">Inheritance Tax</a>
        <br />
      </nav>
      <main style={mainStyle}>
        <section id="estate-duty-tax" style={sectionStyle}>
          <h2>Estate Duty Tax</h2>
          <h3>Overview</h3>
          <p>
            You must pay Estate Duty Tax (EDT) if you buy a property or
            land over a certain price in Sri Lanka.
          </p>
          
          <p>
            <strong>Thresholds:</strong>
          </p>
          <ol>
            <li>Rs.250,000 for residential properties</li>
            <li>
              Rs.425,000 for first-time buyers buying a residential property worth
              Rs.625,000 or less
            </li>
            <li>Rs.150,000 for non-residential land and properties</li>
          </ol>
          <p>
            <strong>How much you pay:</strong>
          </p>
          <p>
            How much you pay depends on various factors, such as whether the
            property will be used as a residential or non-residential property,
            and whether you are eligible for relief or exemption. Different
            rates of EDT apply for different circumstances, such as being a
            first-time buyer or owning multiple properties.
          </p>
          <p>
            <strong>The value you pay EDT on (the ‘consideration’):</strong>
          </p>
          <p>
            The total value you pay EDT on (sometimes called the
            ‘consideration’) is usually the price you pay for the property or
            land. Sometimes it might include another type of payment like goods,
            works or services, release from a debt, or transfer of a debt.
          </p>
          <p>
            <strong>How and when to pay:</strong>
          </p>
          <p>
            Send an EDT return to HMRC and pay the tax within 14 days of
            completion. If you have a solicitor, agent, or conveyancer, they’ll
            usually file your return and pay the tax on your behalf on the day
            of completion. You may be charged penalties and interest if you do
            not file your return and make your payment within 14 days of
            completion.
          </p>
          <p>
            You can find more information on the{" "}
            <a href="https://www.gov.uk/stamp-duty-land-tax">
              official HMRC website
            </a>
            .
          </p>
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
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
};

const navStyle = {
  backgroundColor: "#f4f4f4",
  padding: "10px 0",
  textAlign: "center",
};

const mainStyle = {
  padding: "20px",
};

const sectionStyle = {
  marginBottom: "20px",
};

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "20px 0",
};

export default EducationalResources;
