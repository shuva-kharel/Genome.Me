import React, { useState, useEffect } from "react";
import { UserData } from "../types/UserData";
import { Dna, Sparkles, Globe, Users } from "lucide-react";

interface LandingPageProps {
  onAnalyze: (data: UserData) => void;
}

const countries = [
  // North America
  "United States",
  "Canada",
  "Mexico",
  "Guatemala",
  "Belize",
  "El Salvador",
  "Honduras",
  "Nicaragua",
  "Costa Rica",
  "Panama",

  // South America
  "Argentina",
  "Bolivia",
  "Brazil",
  "Chile",
  "Colombia",
  "Ecuador",
  "French Guiana",
  "Guyana",
  "Paraguay",
  "Peru",
  "Suriname",
  "Uruguay",
  "Venezuela",

  // Europe
  "Albania",
  "Andorra",
  "Austria",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Ukraine",
  "United Kingdom",
  "Vatican City",

  // Asia
  "Afghanistan",
  "Armenia",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Bhutan",
  "Brunei",
  "Cambodia",
  "China",
  "Georgia",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Israel",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Lebanon",
  "Malaysia",
  "Maldives",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "North Korea",
  "Oman",
  "Pakistan",
  "Palestine",
  "Philippines",
  "Qatar",
  "Saudi Arabia",
  "Singapore",
  "South Korea",
  "Sri Lanka",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Turkey",
  "Turkmenistan",
  "United Arab Emirates",
  "Uzbekistan",
  "Vietnam",
  "Yemen",

  // Africa
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cameroon",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "São Tomé and Príncipe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",

  // Oceania
  "Australia",
  "Fiji",
  "Kiribati",
  "Marshall Islands",
  "Micronesia",
  "Nauru",
  "New Zealand",
  "Palau",
  "Papua New Guinea",
  "Samoa",
  "Solomon Islands",
  "Tonga",
  "Tuvalu",
  "Vanuatu",
];

const LandingPage: React.FC<LandingPageProps> = ({ onAnalyze }) => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    fullName: "",
    country: "",
    yearOfBirth: 1990,
    gender: "male",
    lifestyle: "active",
    diet: "mixed",
    caffeine: "medium",
    sleepType: "night-owl",
    personality: "logical",
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.country) {
      onAnalyze(formData as UserData);
    }
  };

  const handleInputChange = (field: keyof UserData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="landing-page">
      <div className="dna-background">
        <div className="dna-helix"></div>
        <div className="dna-helix dna-helix-2"></div>
        <div className="dna-helix dna-helix-3"></div>
      </div>

      <div className="landing-content">
        <div className={`hero-section ${isAnimating ? "animate-in" : ""}`}>
          <div className="logo-container">
            <Dna className="logo-icon" size={48} />
            <h1 className="main-title">
              <span className="gradient-text">Genome.Me</span>
            </h1>
          </div>

          <p className="subtitle">
            Explore your genes. Decode your destiny. All without sending your
            spit.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <Users size={20} />
              <span>100+ Analyzed</span>
            </div>
            <div className="stat-item">
              <Globe size={20} />
              <span>195 Countries</span>
            </div>
            <div className="stat-item">
              <Sparkles size={20} />
              <span>99.9% Accuracy*</span>
            </div>
          </div>
        </div>

        <div
          className={`form-container ${
            isAnimating ? "animate-in-delayed" : ""
          }`}
        >
          <div className="glass-card">
            <div className="card-header">
              <h2>Decode the Code Within</h2>
            </div>

            <form onSubmit={handleSubmit} className="genome-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    required
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Year of Birth</label>
                  <input
                    type="number"
                    min="1920"
                    max="2010"
                    value={formData.yearOfBirth}
                    onChange={(e) =>
                      handleInputChange("yearOfBirth", parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Lifestyle</label>
                  <select
                    value={formData.lifestyle}
                    onChange={(e) =>
                      handleInputChange("lifestyle", e.target.value)
                    }
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="active">Active</option>
                    <option value="athletic">Athletic</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Diet Preference</label>
                  <select
                    value={formData.diet}
                    onChange={(e) => handleInputChange("diet", e.target.value)}
                  >
                    <option value="mixed">Mixed</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Caffeine Consumption</label>
                  <select
                    value={formData.caffeine}
                    onChange={(e) =>
                      handleInputChange("caffeine", e.target.value)
                    }
                  >
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Sleep Type</label>
                  <select
                    value={formData.sleepType}
                    onChange={(e) =>
                      handleInputChange("sleepType", e.target.value)
                    }
                  >
                    <option value="morning-bird">Morning Bird</option>
                    <option value="night-owl">Night Owl</option>
                    <option value="biphasic">Biphasic</option>
                  </select>
                </div>

                <div className="form-group span-2">
                  <label>Personality Type</label>
                  <select
                    value={formData.personality}
                    onChange={(e) =>
                      handleInputChange("personality", e.target.value)
                    }
                  >
                    <option value="logical">Logical</option>
                    <option value="creative">Creative</option>
                    <option value="emotional">Emotional</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="analyze-button">
                <Dna size={20} />
                Analyze My Genome
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
