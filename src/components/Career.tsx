import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Engineer</h4>
                <h5>NineStars Information Technologies Pvt. Ltd.</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built responsive and reusable UI components using React.js and
              Vue.js. Integrated REST APIs, managed state with Redux Toolkit and
              Pinia, and deployed applications using NGINX.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;