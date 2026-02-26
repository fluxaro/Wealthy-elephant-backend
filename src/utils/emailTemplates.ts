const LOGO_URL = 'https://res.cloudinary.com/dbehg8jsv/image/upload/v1771604825/DP_2.jpg-removebg-preview_gajxwa.png';

const getSocialLinks = (venture?: string) => {
  if (venture === 'Klin Konnect') {
    return `
      <a href="https://www.instagram.com/klinkonnect?igsh=MTJqZms1dGRzNjRtdg==" class="social-link">Instagram</a>
      <a href="https://www.tiktok.com/@klinkonnect1?_r=1&_t=ZS-945GGrhQUkv" class="social-link">TikTok</a>
    `;
  } else if (venture === 'Kaizen Kora') {
    return `
      <a href="https://www.instagram.com/kaizenkora?igsh=ZTlqdDFwMjVwZXZp" class="social-link">Instagram</a>
    `;
  } else {
    return `
      <a href="https://www.linkedin.com/company/wealthy-elephant/" class="social-link">LinkedIn</a>
      <a href="https://www.instagram.com/wealthy.elephant?igsh=MXJ0ZzF3NmtrY2o2dg==" class="social-link">Instagram</a>
      <a href="https://www.tiktok.com/@wealthy.elephant?_r=1&_t=ZS-945GEaMrjNMh" class="social-link">TikTok</a>
    `;
  }
};

const getAllSocialLinks = () => {
  return `
    <div class="social-section">
      <div class="social-group">
        <div class="social-group-title">Wealthy Elephant</div>
        <div class="social-group-links">
          <a href="https://www.linkedin.com/company/wealthy-elephant/" class="social-link">LinkedIn</a>
          <a href="https://www.instagram.com/wealthy.elephant?igsh=MXJ0ZzF3NmtrY2o2dg==" class="social-link">Instagram</a>
          <a href="https://www.tiktok.com/@wealthy.elephant?_r=1&_t=ZS-945GEaMrjNMh" class="social-link">TikTok</a>
        </div>
      </div>
      
      <div class="social-group">
        <div class="social-group-title">Klin Konnect</div>
        <div class="social-group-links">
          <a href="https://www.instagram.com/klinkonnect?igsh=MTJqZms1dGRzNjRtdg==" class="social-link">Instagram</a>
          <a href="https://www.tiktok.com/@klinkonnect1?_r=1&_t=ZS-945GGrhQUkv" class="social-link">TikTok</a>
        </div>
      </div>
      
      <div class="social-group">
        <div class="social-group-title">Kaizen Kora</div>
        <div class="social-group-links">
          <a href="https://www.instagram.com/kaizenkora?igsh=ZTlqdDFwMjVwZXZp" class="social-link">Instagram</a>
        </div>
      </div>
    </div>
  `;
};

const getEmailHTML = (title: string, subtitle: string, content: string, brandName: string = 'Wealthy Elephant', venture?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; line-height: 1.6; }
    .email-wrapper { max-width: 700px; margin: 0 auto; background: #ffffff; }
    
    /* Header */
    .header { padding: 50px 60px; background: linear-gradient(135deg, #0a4d3c 0%, #0d6b4f 100%); position: relative; }
    .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>'); }
    .header-content { display: flex; align-items: center; gap: 35px; position: relative; z-index: 1; }
    .logo { width: 180px; height: 180px; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2)); }
    .brand-info { flex: 1; }
    .brand-name { color: #ffffff; font-size: 36px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 10px; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }
    .venture-name { color: rgba(255,255,255,0.9); font-size: 20px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
    
    /* Hero Section */
    .hero { padding: 80px 60px; background: #ffffff; border-bottom: 3px solid #10b981; }
    .hero-title { font-size: 38px; font-weight: 700; color: #1a202c; margin-bottom: 25px; line-height: 1.2; }
    .hero-subtitle { font-size: 19px; color: #64748b; line-height: 1.8; font-weight: 400; }
    
    /* Content */
    .content { padding: 70px 60px; background: #ffffff; }
    .message { font-size: 16px; line-height: 2; color: #475569; margin-bottom: 35px; }
    .card { background: #f8fafb; border-left: 4px solid #10b981; padding: 45px; margin: 50px 0; }
    .card-title { font-size: 14px; font-weight: 700; color: #0a4d3c; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 35px; }
    .info-row { padding: 22px 0; border-bottom: 1px solid #e2e8f0; display: flex; gap: 25px; }
    .info-row:last-child { border-bottom: none; }
    .info-icon { width: 30px; height: 30px; background: linear-gradient(135deg, #0a4d3c 0%, #10b981 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 3px; }
    .info-icon::after { content: '✓'; color: #fff; font-size: 17px; font-weight: 700; }
    .info-content { flex: 1; }
    .info-label { font-size: 13px; font-weight: 600; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px; }
    .info-value { font-size: 16px; color: #1e293b; font-weight: 500; line-height: 1.7; }
    .divider { height: 2px; background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%); margin: 60px 0; }
    .cta { text-align: center; padding: 60px 0; }
    .cta-button { display: inline-block; padding: 20px 50px; background: linear-gradient(135deg, #0a4d3c 0%, #10b981 100%); color: #fff !important; text-decoration: none; font-weight: 600; font-size: 17px; letter-spacing: 0.5px; box-shadow: 0 6px 20px rgba(10,77,60,0.3); transition: all 0.3s; }
    .cta-button:hover { box-shadow: 0 8px 25px rgba(10,77,60,0.4); }
    
    /* Footer */
    .footer { padding: 70px 60px; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); color: #cbd5e0; text-align: center; position: relative; }
    .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.04)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>'); }
    .footer-content { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
    .footer-brand { font-size: 28px; font-weight: 800; color: #fff; margin: 0 0 18px 0; letter-spacing: -0.5px; }
    .footer-tagline { font-size: 16px; color: #a0aec0; margin: 0 0 50px 0; font-weight: 400; }
    .footer-divider { height: 1px; background: rgba(255,255,255,0.15); margin: 0 0 50px 0; }
    
    .social-section { margin: 0 0 50px 0; }
    .social-group { margin-bottom: 35px; }
    .social-group:last-child { margin-bottom: 0; }
    .social-group-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 15px; letter-spacing: 0.5px; }
    .social-group-links { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
    .social-link { display: inline-block; color: #10b981; text-decoration: none; font-size: 14px; font-weight: 600; padding: 10px 22px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); }
    
    .contact-info { font-size: 15px; color: #cbd5e0; line-height: 2.3; margin: 0 0 40px 0; }
    .contact-info strong { display: block; color: #fff; font-size: 17px; margin-bottom: 12px; font-weight: 700; }
    .contact-info a { color: #10b981; text-decoration: none; font-weight: 500; }
    .copyright { font-size: 13px; color: #94a3b8; margin: 0; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.08); }
    
    @media only screen and (max-width: 600px) {
      .header, .hero, .content, .footer { padding: 40px 30px; }
      .header-content { flex-direction: column; text-align: center; gap: 20px; }
      .logo { width: 130px; height: 130px; }
      .brand-name { font-size: 28px; }
      .venture-name { font-size: 17px; }
      .hero-title { font-size: 30px; }
      .hero-subtitle { font-size: 17px; }
      .card { padding: 30px 25px; }
      .social-links { flex-direction: column; align-items: center; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="header-content">
        <img src="${LOGO_URL}" alt="${brandName}" class="logo" />
        <div class="brand-info">
          <div class="brand-name">${brandName}</div>
          ${venture ? `<div class="venture-name">${venture}</div>` : ''}
        </div>
      </div>
    </div>
    
    <div class="hero">
      <h1 class="hero-title">${title}</h1>
      <p class="hero-subtitle">${subtitle}</p>
    </div>
    
    <div class="content">${content}</div>
    
    <div class="footer">
      <div class="footer-content">
        <div class="footer-brand">${brandName}</div>
        <div class="footer-tagline">Building Tomorrow's Solutions Today</div>
        
        <div class="footer-divider"></div>
        
        ${getAllSocialLinks()}
        
        <div class="contact-info">
          <strong>Contact Us</strong>
          Email: <a href="mailto:wealthyelephant@gmail.com">wealthyelephant@gmail.com</a><br>
          Website: <a href="https://www.wealthyelephant.com">www.wealthyelephant.com</a>
        </div>
        
        <div class="copyright">© ${new Date().getFullYear()} Wealthy Elephant. All rights reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>
`;


export const emailTemplates = {
  contactInquiry: {
    user: (name: string) => ({
      subject: 'We\'ve Received Your Inquiry – Wealthy Elephant',
      html: getEmailHTML(
        `Thank you, ${name}`,
        'Your inquiry has been received and is being reviewed by our team.',
        `
          <p class="message">We appreciate you taking the time to reach out to Wealthy Elephant. Your inquiry is important to us, and we're committed to providing you with the highest level of service.</p>
          <p class="message">A dedicated member of our team will carefully review your request and reach out to you within 24-48 business hours.</p>
          <div class="card">
            <h3 class="card-title">What Happens Next</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Step 1</div>
                <div class="info-value">Our team reviews your inquiry and assesses your requirements</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Step 2</div>
                <div class="info-value">We prepare a tailored response addressing your needs</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Step 3</div>
                <div class="info-value">A specialist contacts you to discuss solutions</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <p class="message" style="text-align: center;">Explore our ventures and discover how we're shaping the future.</p>
          <div class="cta"><a href="https://www.wealthyelephant.com" class="cta-button">Explore Our Ventures</a></div>
        `,
        'Wealthy Elephant'
      ),
    }),
  },

  klinRequest: {
    user: (name: string) => ({
      subject: 'Your Rental Request Has Been Received – Klin Konnect',
      html: getEmailHTML(
        `Welcome, ${name}`,
        'Your rental request is being processed by our housing specialists.',
        `
          <p class="message">Thank you for choosing Klin Konnect as your trusted housing partner. We've successfully received your rental request and our team is working to match you with properties that meet your criteria.</p>
          <p class="message">Finding the right home is more than a transaction—it's about finding a place where you can thrive.</p>
          <div class="card">
            <h3 class="card-title">Your Journey With Us</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Requirements Analysis</div>
                <div class="info-value">We review your preferences, budget, and location requirements</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Property Matching</div>
                <div class="info-value">We curate properties that align with your needs</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Personalized Viewing</div>
                <div class="info-value">Schedule convenient property tours with our agents</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <p class="message" style="text-align: center;">A Klin Konnect specialist will contact you within 24 hours.</p>
          <div class="cta"><a href="https://www.wealthyelephant.com/klin" class="cta-button">View Available Properties</a></div>
        `,
        'Wealthy Elephant',
        'Klin Konnect'
      ),
    }),
  },

  klinIntelligence: {
    user: (name: string) => ({
      subject: 'Intelligence Check Request Received – Klin Konnect',
      html: getEmailHTML(
        `Hello, ${name}`,
        'Your housing intelligence check is being processed by our verification team.',
        `
          <p class="message">Thank you for requesting Klin Intelligence services. We've received your request and our specialized verification team has begun processing your inquiry.</p>
          <p class="message">Klin Intelligence provides thorough verification services to ensure safe and informed housing decisions.</p>
          <div class="card">
            <h3 class="card-title">Our Intelligence Services</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Background Verification</div>
                <div class="info-value">Comprehensive identity and background checks</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Credit History Analysis</div>
                <div class="info-value">Detailed credit assessment and financial evaluation</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Rental History Review</div>
                <div class="info-value">Previous tenancy verification and reference checks</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <p class="message" style="text-align: center; font-weight: 600;">A specialist will contact you within 24-48 hours with your results.</p>
        `,
        'Wealthy Elephant',
        'Klin Konnect'
      ),
    }),
  },

  klinPartnership: {
    user: (contactPerson: string) => ({
      subject: 'Partnership Inquiry Received – Wealthy Elephant',
      html: getEmailHTML(
        `Hello, ${contactPerson}`,
        'Thank you for your interest in partnering with Wealthy Elephant.',
        `
          <p class="message">We're excited about the possibility of collaborating with you. Your partnership proposal has been received and is under review by our business development team.</p>
          <p class="message">We believe in building strategic partnerships that create mutual value and drive innovation.</p>
          <div class="card">
            <h3 class="card-title">Partnership Evaluation Process</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Days 1-2</div>
                <div class="info-value">Initial review and assessment of your proposal</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Days 3-5</div>
                <div class="info-value">Strategic evaluation and team discussion</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Days 5-7</div>
                <div class="info-value">Response and exploration of opportunities</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <p class="message" style="text-align: center;">Our team will contact you within 3-5 business days.</p>
          <div class="cta"><a href="https://www.wealthyelephant.com/partnerships" class="cta-button">Learn About Partnerships</a></div>
        `,
        'Wealthy Elephant'
      ),
    }),
  },

  kaizenProject: {
    user: (name: string) => ({
      subject: 'Project Request Received – Kaizen Kora',
      html: getEmailHTML(
        `Welcome, ${name}`,
        'Your project is in the hands of our expert construction team.',
        `
          <p class="message">Thank you for entrusting Kaizen Kora with your construction project. We've received your request and our team is reviewing your requirements.</p>
          <p class="message">We combine traditional craftsmanship with modern innovation to deliver exceptional results.</p>
          <div class="card">
            <h3 class="card-title">Our Construction Process</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Discovery</div>
                <div class="info-value">In-depth discussion of your vision and objectives</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Planning</div>
                <div class="info-value">Detailed architectural plans and project timeline</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Execution</div>
                <div class="info-value">Professional construction with quality assurance</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <p class="message" style="text-align: center;">A consultant will contact you within 2-3 business days.</p>
          <div class="cta"><a href="https://www.wealthyelephant.com/kaizen" class="cta-button">Explore Our Projects</a></div>
        `,
        'Wealthy Elephant',
        'Kaizen Kora'
      ),
    }),
  },

  buildPlanner: {
    user: (name: string, data: any) => ({
      subject: 'Build Planner Submission Received – Kaizen Kora',
      html: getEmailHTML(
        `Hello, ${name}`,
        'Your build plan is being prepared by our planning specialists.',
        `
          <p class="message">Thank you for using the Kaizen Kora Build Planner. Our specialized planning team is conducting a comprehensive analysis of your requirements.</p>
          <div class="card">
            <h3 class="card-title">Your Project Summary</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Project Type</div>
                <div class="info-value">${data.projectType}</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Property Size</div>
                <div class="info-value">${data.propertySize}</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Budget Range</div>
                <div class="info-value">${data.budget}</div>
              </div>
            </div>
            ${data.startDate ? `
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Target Start</div>
                <div class="info-value">${data.startDate}</div>
              </div>
            </div>
            ` : ''}
          </div>
          <p class="message">Within 3-5 business days, you'll receive a comprehensive build plan including timeline, cost breakdown, and material recommendations.</p>
          <div class="divider"></div>
          <div class="cta"><a href="https://www.wealthyelephant.com/kaizen/consultation" class="cta-button">Schedule Consultation</a></div>
        `,
        'Wealthy Elephant',
        'Kaizen Kora'
      ),
    }),
  },

  newsletter: {
    user: (email: string, name?: string) => ({
      subject: 'Welcome to the Wealthy Elephant Community',
      html: getEmailHTML(
        `Welcome${name ? `, ${name}` : ''}`,
        'You\'re now part of an exclusive network of forward-thinking individuals.',
        `
          <p class="message">Thank you for subscribing to the Wealthy Elephant newsletter. You've joined a community of innovators and visionaries shaping the future.</p>
          <p class="message">As a valued subscriber, you'll receive exclusive insights, market intelligence, and early access to opportunities.</p>
          <div class="card">
            <h3 class="card-title">What You'll Receive</h3>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Market Intelligence</div>
                <div class="info-value">Weekly insights on real estate trends and opportunities</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Exclusive Listings</div>
                <div class="info-value">Early access to premium properties</div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="info-label">Expert Knowledge</div>
                <div class="info-value">Industry insights and professional advice</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <p class="message" style="text-align: center;">Stay connected and discover how we're building tomorrow's solutions.</p>
          <div class="cta"><a href="https://www.wealthyelephant.com" class="cta-button">Explore Our Ventures</a></div>
        `,
        'Wealthy Elephant'
      ),
    }),
  },
};
