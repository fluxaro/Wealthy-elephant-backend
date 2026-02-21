export const emailTemplates = {
  contactInquiry: {
    user: (name: string) => ({
      subject: 'Thank you for contacting Wealthy Elephant',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to Wealthy Elephant. We have received your inquiry and our team will get back to you within 24-48 hours.</p>
        <p>We appreciate your interest in our services.</p>
        <br>
        <p>Best regards,<br>The Wealthy Elephant Team</p>
      `,
    }),
    admin: (data: any) => ({
      subject: `New Contact Inquiry from ${data.name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    }),
  },

  klinRequest: {
    user: (name: string) => ({
      subject: 'Your Klin Rental Request - Wealthy Elephant',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for submitting your rental request through Klin. We have received your information and our team is reviewing your requirements.</p>
        <p>We will contact you shortly with available options that match your criteria.</p>
        <br>
        <p>Best regards,<br>The Klin Team</p>
      `,
    }),
    admin: (data: any) => ({
      subject: `New Klin Rental Request from ${data.name}`,
      html: `
        <h2>New Klin Rental Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Property Type:</strong> ${data.propertyType}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Move-in Date:</strong> ${data.moveInDate || 'Not specified'}</p>
        ${data.additionalNotes ? `<p><strong>Additional Notes:</strong> ${data.additionalNotes}</p>` : ''}
      `,
    }),
  },

  klinIntelligence: {
    user: (name: string) => ({
      subject: 'Your Klin Intelligence Check Request',
      html: `
        <h2>Hello ${name},</h2>
        <p>We have received your request for a housing intelligence check. Our team is processing your request and will provide you with detailed information soon.</p>
        <p>Thank you for choosing Klin Intelligence services.</p>
        <br>
        <p>Best regards,<br>The Klin Intelligence Team</p>
      `,
    }),
    admin: (data: any) => ({
      subject: `New Klin Intelligence Check Request - ${data.checkType}`,
      html: `
        <h2>New Intelligence Check Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Property Address:</strong> ${data.propertyAddress}</p>
        <p><strong>Check Type:</strong> ${data.checkType}</p>
        <p><strong>Urgency:</strong> ${data.urgency}</p>
        ${data.additionalInfo ? `<p><strong>Additional Info:</strong> ${data.additionalInfo}</p>` : ''}
      `,
    }),
  },

  klinPartnership: {
    user: (contactPerson: string) => ({
      subject: 'Partnership Inquiry - Wealthy Elephant',
      html: `
        <h2>Hello ${contactPerson},</h2>
        <p>Thank you for your interest in partnering with Wealthy Elephant. We have received your partnership proposal and our business development team will review it carefully.</p>
        <p>We will reach out to you within 3-5 business days to discuss potential collaboration opportunities.</p>
        <br>
        <p>Best regards,<br>The Wealthy Elephant Partnership Team</p>
      `,
    }),
    admin: (data: any) => ({
      subject: `New Partnership Inquiry from ${data.companyName}`,
      html: `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Company Name:</strong> ${data.companyName}</p>
        <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
        ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
        <p><strong>Description:</strong></p>
        <p>${data.description}</p>
      `,
    }),
  },

  kaizenProject: {
    user: (name: string) => ({
      subject: 'Your Kaizen Project Request',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for submitting your project request to Kaizen. We have received your information and our project team is reviewing your requirements.</p>
        <p>A project consultant will contact you within 2-3 business days to discuss your project in detail.</p>
        <br>
        <p>Best regards,<br>The Kaizen Team</p>
      `,
    }),
    admin: (data: any) => ({
      subject: `New Kaizen Project Request - ${data.projectType}`,
      html: `
        <h2>New Kaizen Project Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Project Scope:</strong> ${data.projectScope}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ''}
        <p><strong>Description:</strong></p>
        <p>${data.description}</p>
      `,
    }),
  },

  buildPlanner: {
    user: (name: string) => ({
      subject: 'Your Build Planner Submission',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for using our Build Planner tool. We have received your project details and our planning team is analyzing your requirements.</p>
        <p>We will prepare a comprehensive build plan and contact you within 3-5 business days.</p>
        <br>
        <p>Best regards,<br>The Kaizen Build Planning Team</p>
      `,
    }),
    admin: (data: any) => ({
      subject: `New Build Planner Submission - ${data.projectType}`,
      html: `
        <h2>New Build Planner Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Property Size:</strong> ${data.propertySize}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        ${data.startDate ? `<p><strong>Start Date:</strong> ${data.startDate}</p>` : ''}
        <p><strong>Features:</strong></p>
        <p>${data.features}</p>
        ${data.additionalNotes ? `<p><strong>Additional Notes:</strong> ${data.additionalNotes}</p>` : ''}
      `,
    }),
  },

  newsletter: {
    user: (email: string, name?: string) => ({
      subject: 'Welcome to Wealthy Elephant Newsletter',
      html: `
        <h2>Hello${name ? ` ${name}` : ''},</h2>
        <p>Thank you for subscribing to the Wealthy Elephant newsletter!</p>
        <p>You'll now receive updates about our latest properties, market insights, and exclusive opportunities.</p>
        <p>Stay tuned for valuable content delivered straight to your inbox.</p>
        <br>
        <p>Best regards,<br>The Wealthy Elephant Team</p>
      `,
    }),
  },
};
