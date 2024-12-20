import React from "react";
import { Link } from "react-router-dom";

const Authors = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto max-w-4xl bg-white p-6 shadow-md rounded-lg">
        <p className="mb-6">
          Welcome to <strong>The Lottery of Life</strong>! We are a team of senior students at Minerva
          University, passionate about tackling complex global challenges through data-driven
          insights. This webapp was created as part of a class on Quantitative Analysis of Income,
          Inequality, and Intergenerational Mobility.
        </p>
        <p className="mb-6">
          Our diverse backgrounds and shared commitment to innovation brought us together to develop
          tools that empower users to explore, understand, and act on pressing societal issues.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-green-600">Meet the Team</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src="/images/Tawonga_pic.jpeg" 
                alt="Tawongaishe Nhawu" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-600">Tawongaishe Nhawu</h3>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src="/images/Maju.jpeg" 
                alt="Maria Julia" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-600">Maria Julia Castro</h3>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src="/images/Emma.jpeg" 
                alt="Emma Stoks" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-600">Emma Stoks</h3>
          </div>
        </div>

        <div className="team-member mb-6">
          <h3 className="text-xl font-semibold text-green-600">Tawongaishe Nhawu</h3>
          <p>
            Tawongaishe, from South Africa, is a Computer Science student specializing in product
            management. As an incoming Associate Product Manager (APM) at LinkedIn, she is already
            making waves in the tech world. Beyond her tech skills, she's a talented poet who brings
            creativity to everything she does.
          </p>
          <a
            href="https://www.linkedin.com/in/tawongaishe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            LinkedIn Profile
          </a>
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <h4 className="font-bold mb-2 text-green-700">Technical Lead & Full-Stack Developer</h4>
            <p className="text-gray-700">
              Spearheaded the technical architecture of the Lottery of Life application, transforming complex data into an interactive web experience. Drove the project's technical implementation from conception to deployment, ensuring robust performance and user-friendly design.
            </p>
          </div>
        </div>

        <div className="team-member mb-6">
          <h3 className="text-xl font-semibold text-green-600">Maria Julia</h3>
          <p>
            Maria Julia, from Brazil, is a Political Economics student focusing on policymaking and
            social impact consulting. She works at BCC, an economic mobility consulting firm based
            in DC. At Minerva University, Maria Julia is the President of the Minerva Consulting
            Club and leads the 180 Degrees student-led Consulting branch. She is deeply passionate
            about meaningful consulting projects that drive real-world impact.
          </p>
          <a
            href="https://www.linkedin.com/in/mariajuliacastro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            LinkedIn Profile
          </a>
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <h4 className="font-bold mb-2 text-green-700">Data Strategy & Income Analytics Specialist</h4>
            <p className="text-gray-700">
              Pioneered the comprehensive income data research, meticulously mapping global income variations across demographics. Her deep analytical approach transformed raw statistical data into meaningful insights that power the Lottery of Life's core narrative.
            </p>
          </div>
        </div>

        <div className="team-member">
          <h3 className="text-xl font-semibold text-green-600">Emma Stoks</h3>
          <p>
            Emma, from the Netherlands, is a Political Science student specializing in high-impact
            philanthropy. She works at Ambitious Impact, an incubator for cost-effective charities,
            and consults individuals and organizations on learning strategies. Passionate about
            self-directed learning, Emma helps others unlock their potential and create lasting
            impact through intentional education.
          </p>
          <a
            href="https://www.linkedin.com/in/emmastoks/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            LinkedIn Profile
          </a>
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <h4 className="font-bold mb-2 text-green-700">Product, User Experience & Research Director</h4>
            <p className="text-gray-700">
              Crafted the narrative and user experience that transforms complex economic data into an engaging, accessible story. Her expertise in design and communication ensured that the Lottery of Life not only informs but deeply resonates with users.
            </p>
          </div>
        </div>

        <p className="mt-6">
          With this page, we aim to inspire change by helping you better understand global (income)
          inequality.
        </p>

        <footer className="text-center mt-8 text-gray-600">
          <p>&copy; 2024 [Webapp Name] - All Rights Reserved</p>
          <Link
            to="/"
            className="inline-block mt-4 text-green-500 underline hover:text-green-600"
          >
            Back to Income Explorer
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Authors;