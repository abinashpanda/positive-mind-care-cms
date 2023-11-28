type EmailTemplateProps = {
  name: string
}

export default function EmailTemplate({ name }: EmailTemplateProps) {
  return (
    <div>
      <p>Dear {name},</p>

      <p>
        I hope this message finds you in good spirits. We at Positive Mind Care are excited to journey with you towards
        a healthier and more positive state of mind.
      </p>

      <p>
        To ensure you receive the dedicated support and time you deserve, we invite you to schedule your next
        appointment at your earliest convenience. Our easy-to-use online scheduling system through Calendly will allow
        you to select a time that best fits your routine.
      </p>

      <p>
        Please follow this link to access our Calendly:{' '}
        <a href="https://calendly.com/positivemindcare/doctors-appointment">Click Here</a>
      </p>

      <p>Here is a quick guide on how to schedule your appointment:</p>

      <ol>
        <li>Click on the link provided.</li>
        <li>Choose the service you wish to schedule.</li>
        <li>Select an available date and time that suits you..</li>
        <li>Fill in your details and confirm the appointment.</li>
        <li>You will receive a confirmation email with all the details of your appointment.</li>
      </ol>

      <p>
        Should you encounter any difficulties or have any questions, please don&apos;t hesitate to reach out to us
        directly. We are here to assist you every step of the way.
      </p>

      <p>We look forward to meeting with you and aiding in your journey to a Positive Mind.</p>
      <p>Warm regards,</p>
      <a href="https://samvedan-pmc.myinstamojo.com/">Positive Mind Care</a>
      <p>
        P.S. Your wellbeing is our priority. If you require a more immediate response or assistance, please contact us
        directly at contact@positivemindcare.com. We are here to help.
      </p>
    </div>
  )
}
